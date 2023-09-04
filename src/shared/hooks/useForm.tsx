import { useState } from "react"

const useForm = (initialValue: any) => {
  const [formValue, setFormValue] = useState(initialValue)

  const handleInputChange = (event: any, fieldName: string) => {
    setFormValue((currentFormValue: any) => ({
      ...currentFormValue,
      [fieldName]:
        event.target.type !== "checkbox"
          ? event.target.value
          : event.target.checked,
    }))
  }

  return { formValue, handleInputChange, setFormValue }
}

export default useForm
