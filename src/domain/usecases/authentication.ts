import { AccountModel } from '../models/account-mode'

type AuthenticationParams = {
  email: string
  password: string
}
export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
