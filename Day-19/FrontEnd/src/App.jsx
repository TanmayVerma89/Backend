import React from 'react'
import "./features/shared/global.scss"
import { AppRoutes } from './App.routes'
import { AuthProvider } from './features/auth/auth.context'

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App