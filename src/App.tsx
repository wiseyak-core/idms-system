// import { UserPage } from './pages/UserPage'
import { DashboardLayout } from './components/dashboard/DashboardLayout'
import { DatasetPage } from './pages/DatasetPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CrawlerPage from './pages/CrawlerPage'
import NotFoundPage from './pages/NotFoundPage'
import UserPage from './pages/UserPage'

export const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UserPage />} />
                    <Route element={<DashboardLayout />}>
                        <Route path="/dataset" element={<DatasetPage />} />
                        <Route path="/crawler" element={<CrawlerPage />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
