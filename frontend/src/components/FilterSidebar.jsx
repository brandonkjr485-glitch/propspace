import { useState } from "react";
import InputField from "./InputField";

const FilterSidebar = ({ onFilter }) => {
  const [city,     setCity]     = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const apply = () => onFilter({ city, minPrice, maxPrice });
  const reset = () => { setCity(""); setMinPrice(""); setMaxPrice(""); onFilter({}); };

  return (
    <aside style={s.sidebar}>
      <h3 style={s.title}>🔍 Filter</h3>
      <InputField label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Douala" />
      <InputField label="Min Price ($)" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" />
      <InputField label="Max Price ($)" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Any" />
      <button onClick={apply} style={s.btnPrimary}>Apply Filters</button>
      <button onClick={reset} style={s.btnSecondary}>Reset</button>
    </aside>
  );
};

const s = {
  sidebar:     { background:"#fff", padding:"20px", borderRadius:"10px", boxShadow:"0 2px 8px rgba(0,0,0,0.07)", width:"230px", flexShrink:0, alignSelf:"start" },
  title:       { color:"#1a1a2e", marginBottom:"16px", fontSize:"1rem" },
  btnPrimary:  { width:"100%", padding:"10px", background:"#e94560", color:"#fff", border:"none", borderRadius:"5px", cursor:"pointer", marginBottom:"8px", fontWeight:"600" },
  btnSecondary:{ width:"100%", padding:"10px", background:"#eee", color:"#555", border:"none", borderRadius:"5px", cursor:"pointer" },
};

export default FilterSidebar;
