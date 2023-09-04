import { BaseHTMLAttributes, FC, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

const SectionWrapper: FC<
  PropsWithChildren & BaseHTMLAttributes<HTMLDivElement>
> = ({ children, className }) => {
  const wrapperClassName = twMerge(
    "px-10 py-5 w-[95%] max-w-[1240px]",
    className,
  )
  return <div className={wrapperClassName}>{children}</div>
}

export default SectionWrapper
