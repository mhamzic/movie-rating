import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { MovieProvider } from "./context/movies/MovieContext";
import AuthContext from "./context/auth/AuthContext";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import "./assets/css/bootstrap.min.css";

import Login from "./components/auth/Login";
import Movies from "./pages/Movies";
import Signup from "./components/auth/Signup";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <MovieProvider>
        <Header />
        <Routes>
          {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
          {!isLoggedIn && <Route path="/login" element={<Login />} />}
          {!isLoggedIn && <Route path="/" element={<Login />} />}

          <Route element={<ProtectedRoutes />}>
            <Route path="/movies" element={<Movies />} />
          </Route>
        </Routes>
        <Footer />
      </MovieProvider>
    </BrowserRouter>
  );
}

export default App;
