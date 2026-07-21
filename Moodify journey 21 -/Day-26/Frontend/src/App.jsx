import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { AuthContextProvider } from './features/auth/auth.context'
import { SongContextProvider } from './features/Home/song.context'

const App = () => {


  return (
    <AuthContextProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthContextProvider>
  )
}

export default App