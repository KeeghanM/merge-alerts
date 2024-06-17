'use client'

import { PopAlertsContext } from '@/app/providers'
import { useContext } from 'react'

export type PopAlert = {
  id: string
  text: string
  type: 'error' | 'info' | 'success'
}

export function PopAlerts() {
  const alerts = useContext(PopAlertsContext)

  return (
    <div className="flex flex-col absolute bottom-0 max-w-screen p-2 md:p-4 gap-2">
      {alerts.list.map((alert) => (
        <div
          key={alert.id}
          role="alert"
          className={'alert alert-' + alert.type}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{alert.text}</span>
          <button
            className="btn btn-ghost"
            onClick={() => alerts.removeAlert(alert.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 15"
              className="text-red-500 w-4 h-4 stroke-current"
            >
              <path
                fill="currentColor"
                d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
              ></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
