import * as React from 'react'

export type AlertEmailTemplateProps = {
  project: string
  branchName: string
  title: string
  description: string
  author: string
  url: string
  date: string
}

export const AlertEmailTemplate: React.FC<
  Readonly<AlertEmailTemplateProps>
> = ({ branchName, title, description, author, url, date }) => (
  <div>
    <h1>New commit on {branchName}</h1>
    <h2>{title}</h2>
    <p>{description}</p>
    <p>Author: {author}</p>
    <a href={url}>View commit</a>
    <p>{date}</p>
  </div>
)
