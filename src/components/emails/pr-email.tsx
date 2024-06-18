import * as React from 'react'

type PrEmailProps = {
  project: string
  branchName: string
  title: string
  description: string
  author: string
  url: string
  date: string
}

export const PrEmailTemplate: React.FC<Readonly<PrEmailProps>> = ({
  project,
  branchName,
  title,
  description,
  author,
  url,
  date,
}) => (
  <div>
    <h1>
      {project} has a new PR on {branchName}
    </h1>
    <p>Author: {author}</p>
    <p>Date: {date}</p>
    <a href={url}>View Commit</a>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
)
