# Merge Alerts

This is a simple tool to create endpoints for use with GitHub & GitLab webhooks.

It will send a notification to your email when a merge is made to a specified branch.

There is no logging, so this is safe to use for corporate projects or private repositories.

## Usage

1. Go to https://merge-alerts.vercel.app
2. Login with your email address (verified by Magic Links)
3. Select whether the source is GitHub or GitLab
4. Select the branch you want to monitor
5. Click "Create Webhook"
6. Copy the URL provided
7. Go to your repository settings and add a new webhook
8. Paste the URL you copied into the new webhook URL field
9. Select the events you want to monitor (usually just "push" or "merge")
10. Done! You will now receive an email notification when a merge is made to the specified branch.

Note: The alert doesn't know about the repository, so you can use the same URL for multiple repositories. Provided the branch name is the same!

## Limitations

- Currently only supports GitHub & GitLab
- Only supports merge requests to the specified branch
  - Future support for other events is possible

