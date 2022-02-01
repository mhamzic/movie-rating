import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./context/auth/AuthContext";
import { MovieProvider } from "./context/movies/MovieContext";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import "./assets/css/bootstrap.min.css";

import Login from "./components/auth/Login";
import Movies from "./pages/Movies";
// import Signup from "./components/auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <Header />
          <Routes>
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/movies" element={<Movies />} />
            </Route>
          </Routes>
          <Footer />
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
