import { auth } from '@/auth'
import { AlertList } from '@/components/alertList/alert-list'
import { Creator } from '@/components/creator/creator'
import { SignIn } from '@/components/signIn/sign-in'

export default async function Home() {
  const session = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
        Merge Alerts
      </h1>
      <div>
        {session?.user ? (
          <div className="flex flex-col gap-4 w-[80vw] items-center">
            <Creator />
            <AlertList />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </main>
  )
}

