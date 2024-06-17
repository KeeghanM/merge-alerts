'use client'

import { PopAlertsContext } from '@/app/providers'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'

type Alert = {
  id: string
  type: string
  mainBranch: string
}

export function AlertList() {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null)
  const popAlerts = useContext(PopAlertsContext)
  const queryClient = useQueryClient()

  const { error, data, isFetching } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const response = await fetch('/api/alerts')
      if (!response.ok) throw new Error(response.statusText)
      return response.json() as Promise<Alert[]>
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch('/api/alerts', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
      if (!response.ok) throw new Error(response.statusText)
    },
    onSuccess: () => {
      popAlerts.addAlert('Alert deleted', 'success')
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
    },
    onError: (error) => {
      popAlerts.addAlert(error.message, 'error')
    },
  })
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
            {isFetching ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : (
              data?.map((alert) => (
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
                  <td>
                    <button
                      className="btn btn-ghost"
                      onClick={() => {
                        setSelectedAlertId(alert.id)
                        const modal = document.getElementById(
                          'delete-modal',
                        ) as HTMLDialogElement
                        modal.showModal()
                      }}
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <dialog
        id="delete-modal"
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">Delete Webhook?</h3>
          <p className="py-4">
            This action cannot be undone. Are you sure you want to delete this?
          </p>
          <p className="p4-4">Click close or press ESC to cancel.</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  if (!selectedAlertId) return
                  deleteMutation.mutate(selectedAlertId)
                }}
                className="btn btn-error mr-4"
              >
                Delete
              </button>
              <button className="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
