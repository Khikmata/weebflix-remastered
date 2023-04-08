import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import AnimePage from '../pages/AnimePage/AnimePage'
import HomePage from '../pages/HomePage/HomePage'

const AppRouter = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/anime/:id" element={<AnimePage />} />
			</Routes >
		</Layout>
	)
}

export default AppRouter