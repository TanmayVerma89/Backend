import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { AuthContextProvider } from './features/auth/auth.context'

const App = () => {


  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App