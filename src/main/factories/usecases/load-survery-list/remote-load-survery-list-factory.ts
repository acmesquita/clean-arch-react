import { LoadSurveryList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases'
import { makeAxiosHttpClient, makeApiUrlFactory } from '@/main/factories/http'

export const makeRemoveLoadSurveryList = (): LoadSurveryList => {
  return new RemoteLoadSurveyList(makeApiUrlFactory('/surveys'), makeAxiosHttpClient())
}
