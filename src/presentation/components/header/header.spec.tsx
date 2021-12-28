import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/context'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

type SutType = {
  setCurrentAccountMock: (account: AccountModel) => void
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutType => {
  const setCurrentAccountMock = jest.fn()
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router location={history.location} navigator={history}>
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}>
        <Header />
      </ApiContext.Provider>
    </Router>
  )

  return {
    setCurrentAccountMock,
    history
  }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const { setCurrentAccountMock, history } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)

    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
