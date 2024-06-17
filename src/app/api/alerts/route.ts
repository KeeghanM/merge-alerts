import { auth } from '@/auth'
import { db } from '@/db/db'
import { alerts } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

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
    return Response.json(
      { error },
      {
        status: 500,
      },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')
    const { id } = (await request.json()) as { id: string }
    await db
      .delete(alerts)
      .where(and(eq(alerts.userId, session.user.id), eq(alerts.id, id)))
    return Response.json('Deleted', { status: 200 })
  } catch (error) {
    return Response.json(
      { error },
      {
        status: 500,
      },
    )
  }
}
