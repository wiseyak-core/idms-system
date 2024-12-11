// import { UserPage } from './pages/UserPage'
import { DashboardPage } from './pages/DashboardPage'
import CategoryPage from './pages/CategoryPage'
import { DashboardLayout } from './components/dashboard/DashboardLayout'
import { DatasetPage } from './pages/DatasetPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserPage } from './pages/UserPage'

export const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UserPage />} />
                    <Route element={<DashboardLayout />}>
                        <Route path="/home" element={<DashboardPage />} />
                        <Route path="/category" element={<CategoryPage />} />
                        <Route path="/dataset" element={<DatasetPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
