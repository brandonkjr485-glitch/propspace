import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <nav style={s.nav}>
      <Link to="/" style={s.brand}>🏠 PropSpace</Link>
      <div style={s.links}>
        {user ? (
          <>
            <Link to="/dashboard"    style={s.link}>Dashboard</Link>
            <Link to="/my-listings"  style={s.link}>My Listings</Link>
            <Link to="/profile"      style={s.link}>Profile</Link>
            <button onClick={handleLogout} style={s.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    style={s.link}>Login</Link>
            <Link to="/register" style={s.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const s = {
  nav:       { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 28px", background:"#1a1a2e", position:"sticky", top:0, zIndex:100 },
  brand:     { color:"#e94560", fontWeight:"bold", fontSize:"1.3rem" },
  links:     { display:"flex", gap:"20px", alignItems:"center" },
  link:      { color:"#ccc", fontSize:"0.9rem", transition:"color .2s" },
  logoutBtn: { background:"#e94560", color:"#fff", border:"none", padding:"7px 16px", borderRadius:"4px", cursor:"pointer", fontSize:"0.9rem" },
};

export default Navbar;
