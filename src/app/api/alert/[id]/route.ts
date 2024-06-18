// Handles the actual webhook alerting, needs to check the ID coming from the path
// and then notify the correct user

import { GenerateEmail } from '@/app/util/generate-email'
import { GenerateSubject } from '@/app/util/generate-subject'
import { validateGitHub } from '@/app/util/validate-github'
import { validateGitLab } from '@/app/util/validate-gitlab'
import { db } from '@/db/db'
import { alerts, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    // Get the alert ID from the path & the webHook data
    const { id } = params as { id: string }
    const body = await request.json()

    console.log(JSON.stringify(body))

    // Check if the alert exists
    const selectedAlerts = await db
      .select()
      .from(alerts)
      .where(eq(alerts.id, id))
      .limit(1)
    if (selectedAlerts.length === 0)
      return Response.json('Alert not found', { status: 404 })

    // Get the alert
    const alert = selectedAlerts[0]

    // Check if the webhook data matches the alert
    const match =
      alert.source === 'GitHub'
        ? validateGitHub(body, alert)
        : validateGitLab(body, alert)
    if (!match) return Response.json('Webhook data does not need alerting')

    // Get the user to notify from the alert
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, alert.userId))
      .limit(1)
    if (user.length === 0)
      return Response.json('User not found', { status: 404 })

    // Send the email
    const { error } = await resend.emails.send({
      from: 'MergeAlerts <alerts@keeghan.io>',
      to: user[0].email,
      subject: GenerateSubject({
        body,
        source: alert.source as 'GitHub' | 'GitLab',
      }),
      react: GenerateEmail({
        body,
        source: alert.source as 'GitHub' | 'GitLab',
        trigger: alert.trigger as 'push' | 'pr',
      }),
    })

    // Handle any errors
    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    // Return a success message
    return Response.json('Email sent')
  } catch (error) {
    console.error(error)
    return Response.json({ error }, { status: 500 })
  }
}
