import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { Loading, ErrorMessage, EmptyState } from "../components/StateComponents";

const MyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [deleting,   setDeleting]   = useState(null);

  const fetchListings = () => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    api.get("/properties/my-listings", { signal: controller.signal })
      .then(({ data }) => setProperties(data))
      .catch((err) => { if (err.name !== "CanceledError") setError("Failed to load listings."); })
      .finally(() => setLoading(false));
    return controller;
  };

  useEffect(() => {
    const controller = fetchListings();
    return () => controller.abort();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this listing?")) return;
    setDeleting(id);
    try {
      await api.delete(`/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <Loading text="Loading your listings..." />;
  if (error)   return <ErrorMessage message={error} />;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.heading}>My Listings</h1>
        <Link to="/properties/new" style={s.addBtn}>+ New Listing</Link>
      </div>
      {properties.length === 0
        ? <EmptyState message="You have no listings yet. Create your first one!" />
        : (
          <div style={s.grid}>
            {properties.map((p) => (
              <div key={p._id} style={s.card}>
                <img
                  src={p.images?.[0] || "https://placehold.co/300x160?text=No+Image"}
                  alt={p.title}
                  style={s.img}
                  onError={(e) => { e.target.src = "https://placehold.co/300x160?text=No+Image"; }}
                />
                <div style={s.body}>
                  <span style={s.badge}>{p.propertyType}</span>
                  <h3 style={s.title}>{p.title}</h3>
                  <p style={s.location}>📍 {p.city}, {p.country}</p>
                  <p style={s.price}>${Number(p.price).toLocaleString()}</p>
                  <div style={s.actions}>
                    <Link to={`/properties/${p._id}/edit`} style={s.editBtn}>Edit</Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      disabled={deleting === p._id}
                      style={s.delBtn}
                    >
                      {deleting === p._id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
};

const s = {
  page:    { maxWidth:"1100px", margin:"0 auto", padding:"28px 24px" },
  header:  { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" },
  heading: { color:"#1a1a2e", fontSize:"1.5rem" },
  addBtn:  { background:"#1a1a2e", color:"#fff", padding:"10px 20px", borderRadius:"6px", fontWeight:"600", fontSize:"0.9rem" },
  grid:    { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"20px" },
  card:    { background:"#fff", borderRadius:"10px", boxShadow:"0 2px 8px rgba(0,0,0,0.08)", overflow:"hidden" },
  img:     { width:"100%", height:"160px", objectFit:"cover" },
  body:    { padding:"16px", display:"flex", flexDirection:"column", gap:"6px" },
  badge:   { background:"#1a1a2e", color:"#fff", padding:"2px 8px", borderRadius:"20px", fontSize:"0.7rem", width:"fit-content" },
  title:   { fontWeight:"600", fontSize:"1rem", color:"#1a1a2e", margin:0 },
  location:{ color:"#777", fontSize:"0.83rem", margin:0 },
  price:   { color:"#e94560", fontWeight:"700", margin:0 },
  actions: { display:"flex", gap:"8px", marginTop:"8px" },
  editBtn: { flex:1, padding:"8px", background:"#1a1a2e", color:"#fff", borderRadius:"5px", textAlign:"center", fontSize:"0.85rem", fontWeight:"600" },
  delBtn:  { flex:1, padding:"8px", background:"#e94560", color:"#fff", border:"none", borderRadius:"5px", cursor:"pointer", fontSize:"0.85rem", fontWeight:"600" },
};

export default MyListings;
