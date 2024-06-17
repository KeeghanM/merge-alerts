import type { AlertEmailTemplateProps } from '@/components/emails/alert-email'
type Alert = {
  id: string
  userId: string
  type: string
  mainBranch: string
}
export function validateGitHub(body: any, alert: Alert) {
  return true
}

export function generateDataGitHub(body: any): AlertEmailTemplateProps {
  return {
    project: 'project',
    branchName: 'branchName',
    title: 'title',
    description: 'description',
    author: 'author',
    url: 'url',
    date: 'date',
  }
}
