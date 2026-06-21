import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider }    from "./context/AuthContext";
import ProtectedRoute      from "./components/ProtectedRoute";
import Navbar              from "./components/Navbar";

import Home            from "./pages/Home";
import Login           from "./pages/Login";
import Register        from "./pages/Register";
import Dashboard       from "./pages/Dashboard";
import MyListings      from "./pages/MyListings";
import CreateProperty  from "./pages/CreateProperty";
import EditProperty    from "./pages/EditProperty";
import PropertyDetails from "./pages/PropertyDetails";
import Profile         from "./pages/Profile";
import ChangePassword  from "./pages/ChangePassword";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/"                   element={<Home />} />
          <Route path="/login"              element={<Login />} />
          <Route path="/register"           element={<Register />} />
          <Route path="/properties/:id"     element={<PropertyDetails />} />

          {/* Protected */}
          <Route path="/dashboard"          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/my-listings"        element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
          <Route path="/properties/new"     element={<ProtectedRoute><CreateProperty /></ProtectedRoute>} />
          <Route path="/properties/:id/edit" element={<ProtectedRoute><EditProperty /></ProtectedRoute>} />
          <Route path="/profile"            element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/change-password"    element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
