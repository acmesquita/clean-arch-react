export interface Validation {
  validate: (fieldName: string, fieldValeu: string) => string | null
}
