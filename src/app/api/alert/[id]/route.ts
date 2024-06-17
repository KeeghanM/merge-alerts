// Handles the actual webhook alerting, needs to check the ID coming from the path
// and then notify the correct user

import { AlertEmailTemplate } from '@/components/emails/alert-email'
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
    const { id } = params as { id: string }
    console.log(id)
    const alert = await db
      .select()
      .from(alerts)
      .where(eq(alerts.id, id))
      .limit(1)
    if (alert.length === 0)
      return Response.json('Alert not found', { status: 404 })

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, alert[0].userId))
      .limit(1)

    if (user.length === 0)
      return Response.json('User not found', { status: 404 })

    const subject = `Merge Alert for ${alert[0].mainBranch} on ${alert[0].type}`

    // Notify the user
    const { data, error } = await resend.emails.send({
      from: 'MergeAlerts <alerts@keeghan.io>',
      to: user[0].email,
      subject: subject,
      react: AlertEmailTemplate({
        branchName: alert[0].mainBranch,
        title: 'DUMMY TITLE',
        description: 'DUMMY DESCRIPTION',
        author: 'DUMMY AUTHOR',
        url: 'DUMMY URL',
        date: new Date().toISOString(),
      }) as React.ReactElement,
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json('Email sent')
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
