// Needed for Vertu security bollocks
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/db/db'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'auth@keeghan.io',
    }),
  ],
})
