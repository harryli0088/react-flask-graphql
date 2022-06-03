import { ReactNode } from "react"

type Props = {
  children: ReactNode,
  href: string
}

export default function Blanchor(props: Props) {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>
  )
}