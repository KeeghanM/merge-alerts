'use client'
import { useState } from 'react'
import { CreatorForm } from './form'
import { useQueryClient } from '@tanstack/react-query'

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
