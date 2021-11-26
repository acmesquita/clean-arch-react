import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/context'

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const setCurrentAccountMock = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
       <Router history={history}>
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
          <Header />
        </ApiContext.Provider>
       </Router>
    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)

    expect(history.location.pathname).toBe('/login')
  })
})
