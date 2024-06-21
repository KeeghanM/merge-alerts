# Merge Alerts

This is a simple tool to create endpoints for use with GitHub & GitLab webhooks.

It will send a notification to your email when a merge is made to a specified branch.

There is no logging, so this is safe to use for corporate projects or private repositories.

## Usage

1. Go to https://merge-alerts.vercel.app
2. Login with your email address (verified by Magic Links)
3. Select whether the source is GitHub or GitLab
4. Select "Push" or "Pull Request"
5. Select the branch you want to monitor
6. Click "Create Webhook"
7. Copy the URL provided
8. Go to your repository settings and add a new webhook
9. Paste the URL you copied into the new webhook URL field
10. Select application/json as the content type & the same event type as you selected in creation
11. Done! You will now receive an email notification when a merge is made to the specified branch.

Note: The alert doesn't know about the repository, so you can use the same URL for multiple repositories. Provided the branch name is the same!
