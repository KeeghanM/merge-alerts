import { auth } from '@/auth'
import { SignIn } from '@/components/sign-in'

export default async function Home() {
  const session = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
        Merge Alerts
      </h1>
      <div>
        {session?.user ? (
          <></>
        ) : (
          <>
            <SignIn />
          </>
        )}
      </div>
    </main>
  )
}

