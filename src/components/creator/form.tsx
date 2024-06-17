'use client'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { CreateAction } from './action'
import { CreateSubmit } from './submit'

export function CreatorForm({
  reset,
  invalidate,
}: {
  reset: () => void
  invalidate: () => void
}) {
  const [state, formAction] = useFormState(CreateAction, {
    success: true,
    message: '',
    id: null,
  })
  const [provider, setProvider] = useState('GitHub')

  useEffect(() => {
    if (!state) return
    if (state.success === true && state.id !== null) {
      invalidate()
    }
  }, [state?.id])

  return (
    <div className="bg-gray-100 bg-opacity-10 py-4 px-12 rounded-lg border border-gray-700 shadow-md w-fit">
      {state?.id === null ? (
        <form action={formAction}>
          <h2 className="text-2xl font-bold mb-4">Create new Alert</h2>
          <div className="form-control w-52">
            <h3 className="font-bold">Provider</h3>
            <label className="cursor-pointer label w-full">
              <span className={provider === 'GitHub' ? '' : 'label-text'}>
                GitHub
              </span>
              <input
                type="checkbox"
                className="toggle [--tglbg:black] bg-primary hover:bg-primary border-primary"
                defaultChecked={false}
                onChange={(e) =>
                  setProvider(e.target.checked ? 'GitLab' : 'GitHub')
                }
              />
              <span className={provider === 'GitLab' ? '' : 'label-text'}>
                GitLab
              </span>
            </label>
            <input
              type="hidden"
              name="service"
              value={provider}
              required
              className="hidden"
            />
          </div>
          <div className="form-control w-52 mb-4">
            <label className="label flex flex-col items-start">
              <h3 className="font-bold">Main Branch Name</h3>
              <input
                type="text"
                name="mainBranch"
                placeholder="main"
                required
                className="input input-bordered w-full"
                defaultValue="main"
              />
            </label>
          </div>
          <CreateSubmit />
          {state?.success === false && (
            <p className="text-red-500 italic">{state.message}</p>
          )}
        </form>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-2xl font-bold">Alert created</h2>
          <p>
            Use the below webhook in your repository to receive alerts for new
            merges.
          </p>
          <p className="text-green-500">
            {`${process.env.NEXT_PUBLIC_HOOK_BASE}${state.id}`}
          </p>
          <button
            onClick={() => {
              reset()
            }}
            className="btn btn-primary"
          >
            Create another alert
          </button>
        </div>
      )}
    </div>
  )
}
