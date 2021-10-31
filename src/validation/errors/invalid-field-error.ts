export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`O campo '${fieldName}' está com valor inválido`)
    this.name = 'InvalidFieldError'
  }
}
