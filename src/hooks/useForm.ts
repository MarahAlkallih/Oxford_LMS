
import { useState } from "react"

type Validator = (value: string) => string | undefined

type FormConfig<T> = {
  initialValues: T
  validations: {
    [K in keyof T]?: Validator[]
  }
}

export const useForm = <T extends Record<string, string>>({
  initialValues,
  validations,
}: FormConfig<T>) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = (field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))

    // clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = () => {
    const newErrors: Partial<Record<keyof T, string>> = {}

    Object.keys(validations).forEach((key) => {
      const field = key as keyof T
      const validators = validations[field]

      if (!validators) return

      for (const validator of validators) {
        const error = validator(values[field])
        if (error) {
          newErrors[field] = error
          break
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return {
    values,
    errors,
    handleChange,
    validate,
  }
}