import type { AlertEmailTemplateProps } from '@/components/emails/alert-email'
type Alert = {
  id: string
  userId: string
  type: string
  mainBranch: string
}
export function validateGitLab(body: any, alert: Alert) {
  return false
}

export function generateDataGitLab(body: any): AlertEmailTemplateProps {
  return {
    project: 'project',
    branchName: 'branchName',
    author: 'author',
    url: 'url',
    date: 'date',
  }
}
