import { LoadSurveyList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases'
import { makeAxiosHttpClient, makeApiUrlFactory } from '@/main/factories/http'

export const makeRemoveLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrlFactory('/surveys'), makeAxiosHttpClient())
}
