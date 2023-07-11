import { useAppSelector } from 'hooks/redux'
import { useAuth } from 'hooks/useAuth'
import { useMobile } from 'hooks/useMobile'
import { Layout } from 'layout'
import React, { memo } from 'react'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom'

const Home = React.lazy(() => import('@pages/HomePage/HomePage'))
const Anime = React.lazy(() => import('@pages/AnimePage/AnimePage'))
const Search = React.lazy(() => import('@pages/SearchPage/SearchPage'))
const Profile = React.lazy(() => import('@pages/ProfilePage/ProfilePage'))

const AppRouter = memo(() => {
  const user = useAppSelector((state) => state.auth.user)
  useAuth()
  useMobile()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/profile"
          element={<Profile />}
          loader={async () => {
            if (!user) {
              return redirect('/')
            }
            return null
          }}
        />
        <Route path="*" element={<Home />} />,
      </Route>,
    ),
  )

  return <RouterProvider router={router} />
})

export default AppRouter
