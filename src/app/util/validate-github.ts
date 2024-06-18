export type ValidationAlert = {
  id: string
  userId: string
  source: string
  branch: string
  trigger: string
}
export function validateGitHub(body: any, alert: ValidationAlert) {
  // First check we're dealing with a GitHub alert
  if (alert.source !== 'GitHub') return false

  // Validate push alerts
  if (alert.trigger === 'push')
    return (
      body.pusher !== undefined && body.ref === `refs/heads/${alert.branch}`
    )

  // Validate PR alerts
  if (alert.trigger === 'pr')
    return (
      body.pull_request !== undefined &&
      body.pull_request.head.ref === alert.branch &&
      body.action === 'closed' &&
      body.pull_request.merged === true
    )
}
