import { SurveryModel } from '@/domain/models'

export interface LoadSurveryList {
  loadAll: () => Promise<SurveryModel[]>
}
