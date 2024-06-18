import type { AlertEmailTemplateProps } from '@/components/emails/alert-email'
type Alert = {
  id: string
  userId: string
  source: string
  branch: string
}
export function validateGitHub(body: any, alert: Alert) {
  // We are only interested in pushes to the designated branch
  // and then while we're here let's ensure it has all the required data
  return body.ref === `refs/heads/${alert.branch}` && body.pusher !== undefined
}

export function generateDataGitHub(body: any): AlertEmailTemplateProps {
  return {
    project: body.repository.full_name,
    branchName: body.ref.split('/').pop(),
    author: body.pusher.name,
    url: body.compare,
    date: new Date().toISOString(),
  }
}
