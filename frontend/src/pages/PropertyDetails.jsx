import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { Loading, ErrorMessage } from "../components/StateComponents";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  useEffect(() => {
    const controller = new AbortController();
    api.get(`/properties/${id}`, { signal: controller.signal })
      .then(({ data }) => setProperty(data))
      .catch((err) => { if (err.name !== "CanceledError") setError("Property not found or has been removed."); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [id]);

  if (loading) return <Loading text="Loading property details..." />;
  if (error)   return <ErrorMessage message={error} />;

  const { title, description, price, city, country, propertyType, images, owner, createdAt } = property;

  return (
    <div style={s.page}>
      <button onClick={() => navigate(-1)} style={s.back}>← Back</button>
      <img
        src={images?.[0] || "https://placehold.co/900x400?text=No+Image"}
        alt={title}
        style={s.hero}
        onError={(e) => { e.target.src = "https://placehold.co/900x400?text=No+Image"; }}
      />
      <div style={s.layout}>
        <div style={s.main}>
          <span style={s.badge}>{propertyType}</span>
          <h1 style={s.title}>{title}</h1>
          <p style={s.location}>📍 {city}, {country}</p>
          <p style={s.price}>${Number(price).toLocaleString()}</p>
          <h3 style={s.subheading}>About this property</h3>
          <p style={s.desc}>{description}</p>
          {images?.length > 1 && (
            <div style={s.gallery}>
              {images.slice(1).map((url, i) => (
                <img key={i} src={url} alt={`view-${i}`} style={s.thumb}
                  onError={(e) => { e.target.style.display = "none"; }} />
              ))}
            </div>
          )}
        </div>
        <div style={s.sidebar}>
          <h3 style={s.sideTitle}>Listed By</h3>
          {owner?.avatar && <img src={owner.avatar} alt="avatar" style={s.avatar} />}
          <p style={{ fontWeight:"600", margin:"8px 0 4px" }}>{owner?.username}</p>
          <p style={{ color:"#777", fontSize:"0.85rem" }}>{owner?.email}</p>
          <hr style={{ margin:"16px 0", border:"none", borderTop:"1px solid #eee" }} />
          <p style={{ color:"#aaa", fontSize:"0.78rem" }}>Listed: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

const s = {
  page:       { maxWidth:"1000px", margin:"0 auto", padding:"24px" },
  back:       { background:"none", border:"1px solid #ddd", padding:"8px 16px", borderRadius:"5px", cursor:"pointer", marginBottom:"16px", color:"#555" },
  hero:       { width:"100%", height:"380px", objectFit:"cover", borderRadius:"10px", marginBottom:"24px" },
  layout:     { display:"flex", gap:"24px", alignItems:"flex-start" },
  main:       { flex:1 },
  sidebar:    { width:"220px", background:"#fff", padding:"20px", borderRadius:"10px", boxShadow:"0 2px 8px rgba(0,0,0,0.07)", flexShrink:0 },
  badge:      { background:"#1a1a2e", color:"#fff", padding:"4px 12px", borderRadius:"20px", fontSize:"0.75rem" },
  title:      { color:"#1a1a2e", margin:"12px 0 8px", fontSize:"1.6rem" },
  location:   { color:"#777", marginBottom:"8px" },
  price:      { color:"#e94560", fontSize:"1.6rem", fontWeight:"700", marginBottom:"16px" },
  subheading: { color:"#1a1a2e", marginBottom:"8px" },
  desc:       { color:"#555", lineHeight:1.7 },
  gallery:    { display:"flex", gap:"10px", flexWrap:"wrap", marginTop:"20px" },
  thumb:      { width:"130px", height:"85px", objectFit:"cover", borderRadius:"6px" },
  sideTitle:  { color:"#1a1a2e", marginTop:0 },
  avatar:     { width:"64px", height:"64px", borderRadius:"50%", objectFit:"cover" },
};

export default PropertyDetails;
