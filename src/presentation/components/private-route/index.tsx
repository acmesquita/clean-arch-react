import React, { useContext } from 'react'
import { RouteProps, Navigate, Outlet } from 'react-router-dom'
import { ApiContext } from '@/presentation/context'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext)

  if (getCurrentAccount()?.accessToken) {
    return <Outlet />
  }

  return <Navigate to="/login" />
}

export default PrivateRoute
