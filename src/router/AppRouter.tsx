import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'

import { AnimePage } from '../pages/AnimePage'
import { HomePage } from '../pages/HomePage'
import { SearchPage } from '../pages/SearchPage'

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
    </Layout>
  )
}

export default AppRouter
