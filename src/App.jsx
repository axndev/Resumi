import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";


// Protected route wrapper
function ProtectedRoute({ children }) {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) return <Navigate to="/register" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Analytics />
      <Routes>
      {/* Public Route */}
      
      <Route
        path="/"
        element={
          <>
            <Home />
            <Footer />
          </>
        }
      />

      {/* Login Route */}
      <Route
        path="/login"
        element={
          <>
            <SignedIn>
              <Navigate to="/app" replace />
            </SignedIn>
            <SignedOut>
              <Login />
            </SignedOut>
          </>
        }
      />

      {/* SignUp Route */}
      <Route
        path="/register"
        element={
          <>
            <SignedIn>
              <Navigate to="/" replace />
            </SignedIn>
            <SignedOut>
              <Register />
            </SignedOut>
          </>
        }
      />

      {/* Dashboard */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <div className="min-h-screen">
              <Header />
              <Dashboard />
            </div>
          </ProtectedRoute>
        }
      />

      {/* Builder: Dynamic route for resume */}
      <Route
        path="app/builder/:resumeId"
        element={
          <ProtectedRoute>
            <div className="min-h-screen pb-0">
              <Header />
              <ResumeBuilder />
              <Footer />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}
