'use client'
import { useState, createContext } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PopAlert } from '@/components/popAlerts/pop-alerts'

export const PopAlertsContext = createContext<{
  list: PopAlert[]
  addAlert: (text: string, type: 'error' | 'info' | 'success') => void
  removeAlert: (id: string) => void
}>({ list: [], addAlert: () => {}, removeAlert: () => {} })

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(() => new QueryClient())
  const [popAlerts, setPopAlerts] = useState<PopAlert[]>([])

  const addAlert = (text: string, type: 'error' | 'info' | 'success') => {
    const id = Math.round(Math.random() * 10000).toString()
    setPopAlerts([...popAlerts, { text, type, id }])
    setTimeout(() => removeAlert(id), 5000)
  }

  const removeAlert = (id: string) => {
    setPopAlerts((alerts) => alerts.filter((alert) => alert.id !== id))
  }

  return (
    <QueryClientProvider client={client}>
      <PopAlertsContext.Provider
        value={{ list: popAlerts, addAlert, removeAlert }}
      >
        {children}
      </PopAlertsContext.Provider>
    </QueryClientProvider>
  )
}
