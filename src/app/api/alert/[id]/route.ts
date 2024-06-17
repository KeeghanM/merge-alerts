// Handles the actual webhook alerting, needs to check the ID coming from the path
// and then notify the correct user

import { AlertEmailTemplate } from '@/components/emails/alert-email'
import type { AlertEmailTemplateProps } from '@/components/emails/alert-email'
import { db } from '@/db/db'
import { alerts, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'
import { generateDataGitLab, validateGitLab } from './functions/gitlab'
import { generateDataGitHub, validateGitHub } from './functions/github'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    // Get the alert ID from the path & the webHook data
    const { id } = params as { id: string }
    const body = await request.json()

    // Check if the alert exists
    const alert = await db
      .select()
      .from(alerts)
      .where(eq(alerts.id, id))
      .limit(1)
    if (alert.length === 0)
      return Response.json('Alert not found', { status: 404 })

    // Check if the webhook data matches the alert
    const match =
      alert[0].type === 'GitHub'
        ? validateGitHub(body, alert[0])
        : validateGitLab(body, alert[0])
    if (!match) return Response.json('Webhook data does not need alerting')

    // Get the user to notify from the alert
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, alert[0].userId))
      .limit(1)
    if (user.length === 0)
      return Response.json('User not found', { status: 404 })

    // Generate the email data & subject
    const emailData: AlertEmailTemplateProps =
      alert[0].type === 'GitHub'
        ? generateDataGitHub(body)
        : generateDataGitLab(body)
    const subject = `Merge Alert for ${emailData.project} on ${emailData.branchName}`

    // Notify the user
    const { error } = await resend.emails.send({
      from: 'MergeAlerts <alerts@keeghan.io>',
      to: user[0].email,
      subject: subject,
      //   react: AlertEmailTemplate(emailData) as React.ReactElement,
      text: JSON.stringify(body),
    })

    // Handle any errors
    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    // Return a success message
    return Response.json('Email sent')
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
