import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) return <Navigate to="/register" />;
  return children;
}

// Layout wrappers for consistent header/footer
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
      <Footer />
    </div>
  );
}

function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
    <ScrollToTop />
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <>
              <SignedIn>
                <Navigate to={window.location.pathname} replace />
              </SignedIn>
              <SignedOut>
                <Login />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <SignedIn>
                <Navigate to={window.location.pathname} replace />
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
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Resume Builder */}
        <Route
          path="/app/builder/:resumeId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ResumeBuilder />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
