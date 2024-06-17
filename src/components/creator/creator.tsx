'use client'
import { useState } from 'react'
import { CreatorForm } from './form'

export function Creator() {
  // This is a simple way to reset the form
  // by changing the key of the form component
  // as the useFormState hook does not provide
  // a way to reset the form.
  const [key, setKey] = useState(0)
  return (
    <CreatorForm
      key={key}
      reset={() => setKey(key + 1)}
    />
  )
}
