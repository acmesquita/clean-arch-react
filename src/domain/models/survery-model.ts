export type SurveryModel = {
  id: string
  question: string
  answers: SurveryAnswerModel[]
  date: Date
  didAnswer: boolean
}

export type SurveryAnswerModel = {
  image?: string
  answer: string
}
