'use client'

import { PopAlertsContext } from '@/app/providers'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

type Alert = {
  id: string
  type: string
  mainBranch: string
}

export function AlertList() {
  const popAlerts = useContext(PopAlertsContext)
  const { error, data, isFetching } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const response = await fetch('/api/alerts')
      if (!response.ok) throw new Error(response.statusText)
      return response.json() as Promise<Alert[]>
    },
  })

  if (isFetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <h1>Alerts</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Webhook ID</th>
              <th>Source</th>
              <th>Main Branch Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((alert) => (
              <tr key={alert.id}>
                <td>
                  <div
                    className="tooltip"
                    data-tip="Copy to clipboard"
                  >
                    <button
                      className="btn btn-ghost primary"
                      onClick={() => {
                        navigator.clipboard.writeText(alert.id)
                        popAlerts.addAlert(
                          'Webhook ID copied to clipboard',
                          'info',
                        )
                      }}
                    >
                      {alert.id.substring(0, 8)}...
                    </button>
                  </div>
                </td>
                <td>{alert.type}</td>
                <td>{alert.mainBranch}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
