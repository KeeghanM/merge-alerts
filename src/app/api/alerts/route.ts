import { auth } from '@/auth'
import { db } from '@/db/db'
import { alerts } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')
    const alertList = await db
      .select({
        id: alerts.id,
        type: alerts.type,
        mainBranch: alerts.mainBranch,
      })
      .from(alerts)
      .where(eq(alerts.userId, session.user.id))

    return Response.json(alertList)
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : 'An unknown error occurred'
    return new Response(msg, {
      status: 500,
    })
  }
}
