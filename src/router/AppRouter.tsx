import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import AnimePage from '../pages/AnimePage/AnimePage'
import HomePage from '../pages/HomePage/HomePage'
import { SearchPage } from '../pages/SearchPage'

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </Layout>
  )
}

export default AppRouter
