import type { ValidationAlert } from './validate-github'

export function validateGitLab(body: any, alert: ValidationAlert) {
  if (alert.source !== 'GitLab') return false

  if (alert.trigger === 'push')
    return (
      body.object_kind === 'push' && body.ref === `refs/heads/${alert.branch}`
    )

  if (alert.trigger === 'pr')
    return (
      body.object_kind === 'merge_request' &&
      body.object_attributes?.target_branch === alert.branch &&
      body.object_attributes?.state === 'merged'
    )
}
