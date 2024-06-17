'use client'
import { useFormStatus } from 'react-dom'
import { Spinner } from '../spinner'

export function LoginSubmit() {
  const status = useFormStatus()
  return (
    <button
      disabled={status.pending}
      className="btn btn-primary"
    >
      {status.pending ? <Spinner /> : 'Log In'}
    </button>
  )
}
