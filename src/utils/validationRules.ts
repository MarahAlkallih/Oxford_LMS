export const rules = {
  required: (value: string) =>
    value.trim() ? undefined : "This field is required",

  email: (value: string) =>
    /\S+@\S+\.\S+/.test(value) ? undefined : "Invalid email",

  minLength: (length: number) => (value: string) =>
    value.length >= length
      ? undefined
      : `Must be at least ${length} characters`,
}