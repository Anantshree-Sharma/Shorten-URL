import "./App.css";
import { AllUrls, Start, Login, Signup, UrlShortening } from "./Pages";
import { Header, Footer, ScrollToHash, SpinnerLoading } from "./Components";
import { Route, Routes } from "react-router-dom";
import { Protected } from "./Components";
import { useUrl } from "./Context/urlContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";

function App() {
  const { setUser, isAuth, setIsAuth } = useUrl();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  //Fetching Logged in User Info
  useEffect(() => {
    const fullPath = location.pathname + location.hash;
    setLoading(true);

    fetch(`${import.meta.env.VITE_BASE_URL}/url/auth/user`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setIsAuth(false);
          setUser(null);
          return;
        }

        setIsAuth(true);
        setUser(result.user);

        // ✅ Only redirect if user lands on "/login" or "/signup"
        if (location.pathname === "/login" || location.pathname === "/signup") {
          navigate("/url");
        } else {
          sessionStorage.setItem("lastPath", fullPath); // store full path with hash
        }
      })
      .catch((error) => {
        console.error(error);
        setIsAuth(false);
        setUser(null);
        return null;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAuth]);

  //Storing Current Route
  useEffect(() => {
    sessionStorage.setItem("lastPath", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScrollToHash />
      <main className="flex-grow w-full bg-gray-50 px-4 mt-[4.5rem]">
        {loading ? (
          <SpinnerLoading />
        ) : (
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/url"
              element={
                <Protected>
                  <UrlShortening />
                </Protected>
              }
            />
            <Route
              path="/all-urls"
              element={
                <Protected>
                  <AllUrls />
                </Protected>
              }
            />
          </Routes>
        )}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
