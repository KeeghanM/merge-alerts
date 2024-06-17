'use client'
import { useState } from 'react'
import { CreatorForm } from './form'
import { useQueryClient } from '@tanstack/react-query'

// TODO: Optionally include full commit history in email
// TODO: Set up for PR closing instead of push/merge

export function Creator() {
  const [key, setKey] = useState(0)
  const client = useQueryClient()
  return (
    <CreatorForm
      key={key}
      reset={() => {
        // Increment the key to reset the form
        setKey(key + 1)
      }}
      invalidate={() => {
        // Invalidate the alerts query to refetch the data
        client.invalidateQueries({ queryKey: ['alerts'] })
      }}
    />
  )
}
