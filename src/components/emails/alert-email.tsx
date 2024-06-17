import * as React from 'react'

export type AlertEmailTemplateProps = {
  project: string
  branchName: string
  author: string
  url: string
  date: string
}

export const AlertEmailTemplate: React.FC<
  Readonly<AlertEmailTemplateProps>
> = ({ project, branchName, author, url, date }) => (
  <div>
    <h1>
      {project} has a new push on {branchName}
    </h1>
    <p>Author: {author}</p>
    <p>Date: {date}</p>
    <a href={url}>View differences</a>
  </div>
)
