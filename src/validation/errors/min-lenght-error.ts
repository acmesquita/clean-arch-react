export class MinLenghtError extends Error {
  constructor () {
    super('Tamanho inválido')
    this.name = 'MinLenghtError'
  }
}
