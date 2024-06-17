'use client'
import { useFormStatus } from 'react-dom'
import { Spinner } from '../spinner'

export function CreateSubmit() {
  const status = useFormStatus()
  return (
    <button
      disabled={status.pending}
      className="btn btn-primary w-full"
    >
      {status.pending ? <Spinner /> : 'Create'}
    </button>
  )
}
