



import { Layout } from 'layout'
import { AnimePage, HomePage, SearchPage } from 'pages'
import { Route, Routes } from 'react-router-dom'





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
