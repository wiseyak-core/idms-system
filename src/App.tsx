import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserPage } from "./pages/UserPage";
import { DashboardPage } from "./pages/DashboardPage";
import CategoryPage from "./pages/CategoryPage";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route element={<DashboardLayout /> }>
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/category" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
