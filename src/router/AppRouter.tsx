import { useAppSelector } from 'hooks/redux'
import { useAuth } from 'hooks/useAuth'
import { Layout } from 'layout'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('@pages/HomePage/HomePage'))
const Anime = React.lazy(() => import('@pages/AnimePage/AnimePage'))
const Search = React.lazy(() => import('@pages/SearchPage/SearchPage'))
const Profile = React.lazy(() => import('@pages/ProfilePage/ProfilePage'))

const AppRouter = () => {
  const user = useAppSelector((state) => state.auth.user)
  useAuth()

  useEffect(() => {}, [])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Home />} />
        {user && <Route path="/profile" element={<Profile />} />}
      </Routes>
    </Layout>
  )
}

export default AppRouter
