import { makeApiUrlFactory } from '@/main/factories/http'
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators'
import { LoadSurveyList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const makeRemoveLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrlFactory('/surveys'), makeAuthorizeHttpGetClientDecorator())
}
