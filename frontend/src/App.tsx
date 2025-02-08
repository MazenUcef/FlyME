import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import { useValidateToken } from "./api/AuthApi"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"


export default function App() {
  const { isLoggedIn } = useValidateToken()
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout showHero={false}>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout showHero={false}>
              <SignIn />
            </Layout>
          }
        />
        {
          isLoggedIn &&
          <>
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:id"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
          </>
        }
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </Router>
  )
}