import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"


export default function App() {
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
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </Router>
  )
}