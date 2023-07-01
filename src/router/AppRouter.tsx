import { Layout } from 'layout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('@pages/HomePage/HomePage'))
const Anime = React.lazy(() => import('@pages/AnimePage/AnimePage'))
const Search = React.lazy(() => import('@pages/SearchPage/SearchPage'))

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  )
}

export default AppRouter
