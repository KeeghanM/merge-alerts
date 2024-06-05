import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/db/db'
import { generate } from 'random-words'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'auth@keeghan.io',
      async generateVerificationToken() {
        return generate({
          exactly: 1,
          wordsPerString: 3,
          separator: '-',
          minLength: 4,
          maxLength: 7,
        }) as string
      },
    }),
  ],
})
