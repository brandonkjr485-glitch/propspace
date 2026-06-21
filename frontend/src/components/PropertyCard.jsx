import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const { _id, title, city, country, price, propertyType, images } = property;
  return (
    <div style={s.card}>
      <img
        src={images?.[0] || "https://placehold.co/300x180?text=No+Image"}
        alt={title}
        style={s.img}
        onError={(e) => { e.target.src = "https://placehold.co/300x180?text=No+Image"; }}
      />
      <div style={s.body}>
        <span style={s.badge}>{propertyType}</span>
        <h3 style={s.title}>{title}</h3>
        <p style={s.location}>📍 {city}, {country}</p>
        <p style={s.price}>${Number(price).toLocaleString()}</p>
        <Link to={`/properties/${_id}`} style={s.btn}>View Details →</Link>
      </div>
    </div>
  );
};

const s = {
  card:     { background:"#fff", borderRadius:"10px", boxShadow:"0 2px 10px rgba(0,0,0,0.08)", overflow:"hidden", display:"flex", flexDirection:"column", transition:"transform .2s", cursor:"pointer" },
  img:      { width:"100%", height:"180px", objectFit:"cover" },
  body:     { padding:"16px", display:"flex", flexDirection:"column", gap:"6px", flex:1 },
  badge:    { background:"#1a1a2e", color:"#fff", padding:"3px 10px", borderRadius:"20px", fontSize:"0.72rem", width:"fit-content", letterSpacing:".5px" },
  title:    { fontSize:"1rem", fontWeight:"600", color:"#1a1a2e", margin:0 },
  location: { color:"#777", fontSize:"0.85rem", margin:0 },
  price:    { color:"#e94560", fontWeight:"700", fontSize:"1.1rem", margin:"4px 0 0" },
  btn:      { display:"block", background:"#e94560", color:"#fff", padding:"9px 0", borderRadius:"5px", textAlign:"center", marginTop:"auto", fontSize:"0.88rem", fontWeight:"500" },
};

export default PropertyCard;
