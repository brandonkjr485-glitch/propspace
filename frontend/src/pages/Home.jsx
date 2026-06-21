import { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import PropertyCard from "../components/PropertyCard";
import FilterSidebar from "../components/FilterSidebar";
import { Loading, ErrorMessage, EmptyState } from "../components/StateComponents";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [filters,    setFilters]    = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchProperties = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (filters.city)     params.append("city",     filters.city);
        if (filters.minPrice) params.append("minPrice", filters.minPrice);
        if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

        const { data } = await api.get(`/properties?${params}`, { signal: controller.signal });
        setProperties(data);
      } catch (err) {
        if (err.name !== "CanceledError") setError("Failed to load properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
    return () => controller.abort();
  }, [filters]);

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Find Your Dream Property</h1>
        <p style={s.heroSub}>Browse hundreds of listings for rent and sale across Africa and beyond.</p>
      </div>
      <div style={s.layout}>
        <FilterSidebar onFilter={setFilters} />
        <div style={s.feed}>
          {loading && <Loading text="Fetching properties..." />}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && !error && properties.length === 0 && (
            <EmptyState message="No properties match your filters. Try adjusting them." />
          )}
          {!loading && !error && properties.length > 0 && (
            <div style={s.grid}>
              {properties.map((p) => <PropertyCard key={p._id} property={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const s = {
  page:      { maxWidth:"1200px", margin:"0 auto", padding:"24px" },
  hero:      { background:"linear-gradient(135deg,#1a1a2e,#16213e)", color:"#fff", padding:"48px 32px", borderRadius:"12px", marginBottom:"32px", textAlign:"center" },
  heroTitle: { fontSize:"2rem", marginBottom:"10px" },
  heroSub:   { color:"#aaa", fontSize:"1rem" },
  layout:    { display:"flex", gap:"24px", alignItems:"flex-start" },
  feed:      { flex:1 },
  grid:      { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"20px" },
};

export default Home;
