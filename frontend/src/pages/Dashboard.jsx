import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosInstance";
import { Loading, ErrorMessage } from "../components/StateComponents";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/properties/my-listings", { signal: controller.signal });
        setStats({ count: data.length, listings: data.slice(0, 3) });
      } catch (err) {
        if (err.name !== "CanceledError") setError("Could not load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    return () => controller.abort();
  }, []);

  if (loading) return <Loading text="Loading dashboard..." />;
  if (error)   return <ErrorMessage message={error} />;

  return (
    <div style={s.page}>
      <h1 style={s.heading}>Welcome, {user?.username} 👋</h1>
      <div style={s.cards}>
        <div style={s.statCard}>
          <span style={s.statNum}>{stats?.count ?? 0}</span>
          <span style={s.statLabel}>Total Listings</span>
        </div>
        <Link to="/my-listings"     style={s.actionCard}>📋 My Listings</Link>
        <Link to="/properties/new"  style={s.actionCard}>➕ Create Listing</Link>
        <Link to="/profile"         style={s.actionCard}>👤 Profile Settings</Link>
        <Link to="/change-password" style={s.actionCard}>🔒 Change Password</Link>
      </div>
    </div>
  );
};

const s = {
  page:       { maxWidth:"900px", margin:"0 auto", padding:"32px 24px" },
  heading:    { color:"#1a1a2e", marginBottom:"28px", fontSize:"1.6rem" },
  cards:      { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"16px" },
  statCard:   { background:"#1a1a2e", color:"#fff", padding:"24px", borderRadius:"10px", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" },
  statNum:    { fontSize:"2.5rem", fontWeight:"700", color:"#e94560" },
  statLabel:  { fontSize:"0.85rem", color:"#aaa" },
  actionCard: { background:"#fff", color:"#1a1a2e", padding:"20px", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.07)", fontWeight:"600", textAlign:"center", transition:"transform .2s" },
};

export default Dashboard;
