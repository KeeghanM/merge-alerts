import { PrEmailTemplate } from '@/components/emails/pr-email'
import { PushEmailTemplate } from '@/components/emails/push-email'

type GenerateEmailProps = {
  body: any
  source: 'GitHub' | 'GitLab'
  trigger: 'push' | 'pr'
}
export function GenerateEmail({
  body,
  source,
  trigger,
}: GenerateEmailProps): React.ReactElement {
  if (source === 'GitHub') {
    if (trigger === 'push') {
      return (
        <PushEmailTemplate
          project={body.repository.full_name}
          branchName={body.ref.split('/').pop()}
          author={body.pusher.name}
          url={body.compare}
          date={new Date().toISOString()}
        />
      )
    } else {
      return (
        <PrEmailTemplate
          project={body.repository.full_name}
          branchName={body.pull_request.head.ref}
          title={body.pull_request.title}
          description={JSON.stringify(body)}
          author={body.pull_request.user.login}
          date={new Date().toISOString()}
          url={body.pull_request.html_url}
        />
      )
    }
  } else {
    // GitLab
    if (trigger === 'push') {
      return (
        <PushEmailTemplate
          project=""
          branchName=""
          author=""
          url=""
          date={new Date().toISOString()}
        />
      )
    } else {
      return (
        <PrEmailTemplate
          project=""
          branchName=""
          title=""
          description={JSON.stringify(body)}
          author=""
          url=""
          date={new Date().toISOString()}
        />
      )
    }
  }
}
