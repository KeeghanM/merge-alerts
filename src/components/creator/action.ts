'use server'

import { auth } from '@/auth'
import { db } from '@/db/db'
import { alerts } from '@/db/schema'

export async function CreateAction(
  currentState: { success: boolean; message: string; id: string | null },
  formData: FormData,
) {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Unauthorized')

    const service = formData.get('service') as 'GitHub' | 'GitLab'
    const mainBranch = formData.get('mainBranch') as string
    if (service === undefined || mainBranch === undefined)
      throw new Error('Invalid form data')

    const alert = await db
      .insert(alerts)
      .values({
        userId: session.user.id,
        type: service,
        mainBranch: mainBranch,
      })
      .returning({
        id: alerts.id,
      })

    if (alert[0]?.id === undefined) throw new Error('Failed to create alert')

    return {
      success: true,
      message: 'Alert created',
      id: alert[0].id,
    }
  } catch (error) {
    let errorMessage = 'An unknown error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return {
      success: false,
      message: errorMessage,
      id: null,
    }
  }
}
