import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export const Button = ({
  onClick,
  className,
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonClasses = twMerge(
    "rounded-lg  text-white py-2 px-5 flex items-center gap-[0.5rem]",
    className,
  )
  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  )
}
