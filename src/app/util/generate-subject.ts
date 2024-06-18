type GenerateSubjectProps = {
  body: any
  source: 'GitHub' | 'GitLab'
}
export function GenerateSubject({ body, source }: GenerateSubjectProps) {
  if (source === 'GitHub') {
    if (body.pull_request) {
      return `${body.repository.full_name} has a new PR on ${body.pull_request.head.ref}`
    } else {
      return `${body.repository.full_name} has a new push on ${body.ref
        .split('/')
        .pop()}`
    }
  } else {
    return 'GitLab'
  }
}
