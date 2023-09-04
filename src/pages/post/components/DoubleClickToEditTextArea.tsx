import { TextareaHTMLAttributes, useState } from "react"
import { twMerge } from "tailwind-merge"

export const DoubleClickToEditTextArea = ({
  name,
  className,
  readOnly,
  rows = 5,
  autoFocus,
  ...others
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const [selectedInput, setSelectedInput] = useState<any>()
  const textAreaClasses = twMerge(
    "resize-none border border-grey-100 p-2",
    className,
  )
  return (
    <div className="w-full flex flex-col">
      <textarea
        readOnly={readOnly ?? selectedInput !== name}
        autoFocus={autoFocus ?? selectedInput === name}
        onBlur={() => setSelectedInput(null)}
        onDoubleClick={(e) => {
          e.currentTarget.selectionStart = e.currentTarget.selectionEnd
          setSelectedInput(name)
        }}
        className={textAreaClasses}
        rows={rows}
        {...others}
      ></textarea>
      {readOnly ||
        (readOnly === undefined && (
          <span className="rounded-sm font-bold text-green-900 text-[10px] ">
            Double click text field to start editing
          </span>
        ))}
    </div>
  )
}
