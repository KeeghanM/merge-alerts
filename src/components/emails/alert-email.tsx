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
> = ({ branchName, author, url, date }) => (
  <div>
    <h1>New commit on {branchName}</h1>
    <p>Author: {author}</p>
    <a href={url}>View differences</a>
    <p>{date}</p>
  </div>
)
