import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import InputField from "../components/InputField";
import { Loading, ErrorMessage } from "../components/StateComponents";

const TYPES = ["Apartment", "House", "Studio"];

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form,     setForm]     = useState({ title:"", description:"", price:"", city:"", country:"", propertyType:"Apartment", images:"" });
  const [errors,   setErrors]   = useState({});
  const [apiErr,   setApiErr]   = useState("");
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [fetchErr, setFetchErr] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    api.get(`/properties/${id}`, { signal: controller.signal })
      .then(({ data }) => {
        setForm({
          title:        data.title,
          description:  data.description,
          price:        data.price,
          city:         data.city,
          country:      data.country,
          propertyType: data.propertyType,
          images:       data.images?.join(", ") || "",
        });
      })
      .catch((err) => { if (err.name !== "CanceledError") setFetchErr("Could not load property."); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [id]);

  const validate = () => {
    const e = {};
    if (!form.title.trim())       e.title       = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.price)              e.price       = "Price is required";
    else if (Number(form.price) <= 0) e.price   = "Price must be greater than 0";
    if (!form.city.trim())        e.city        = "City is required";
    if (!form.country.trim())     e.country     = "Country is required";
    if (!form.images.trim())      e.images      = "At least one image URL is required";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setSaving(true);
    setApiErr("");
    try {
      await api.put(`/properties/${id}`, {
        ...form,
        price:  Number(form.price),
        images: form.images.split(",").map((u) => u.trim()).filter(Boolean),
      });
      navigate("/my-listings");
    } catch (err) {
      setApiErr(err.response?.data?.message || "Failed to update listing.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)  return <Loading text="Loading property..." />;
  if (fetchErr) return <ErrorMessage message={fetchErr} />;

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <h2 style={s.heading}>Edit Listing</h2>
        {apiErr && <div style={s.alert}>{apiErr}</div>}
        <InputField label="Title"   name="title"   value={form.title}   onChange={handleChange} error={errors.title} />
        <div style={s.field}>
          <label style={s.label}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} style={{ ...s.textarea, ...(errors.description ? s.errBorder : {}) }} />
          {errors.description && <span style={s.errText}>{errors.description}</span>}
        </div>
        <InputField label="Price ($)" name="price" type="number" value={form.price} onChange={handleChange} error={errors.price} />
        <InputField label="City"      name="city"  value={form.city}    onChange={handleChange} error={errors.city} />
        <InputField label="Country"   name="country" value={form.country} onChange={handleChange} error={errors.country} />
        <div style={s.field}>
          <label style={s.label}>Property Type</label>
          <select name="propertyType" value={form.propertyType} onChange={handleChange} style={s.select}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <InputField label="Image URLs (comma-separated)" name="images" value={form.images} onChange={handleChange} error={errors.images} />
        <button onClick={handleSubmit} disabled={saving} style={s.btn}>
          {saving ? "Saving..." : "Update Listing"}
        </button>
      </div>
    </div>
  );
};

const s = {
  wrapper:   { display:"flex", justifyContent:"center", padding:"32px 24px" },
  card:      { background:"#fff", padding:"36px", borderRadius:"10px", width:"100%", maxWidth:"560px", boxShadow:"0 4px 20px rgba(0,0,0,0.09)" },
  heading:   { color:"#1a1a2e", marginBottom:"24px" },
  alert:     { background:"#fff0f0", border:"1px solid #e94560", color:"#e94560", padding:"10px 14px", borderRadius:"5px", marginBottom:"16px", fontSize:"0.875rem" },
  field:     { marginBottom:"14px" },
  label:     { display:"block", fontSize:"0.85rem", color:"#555", marginBottom:"5px", fontWeight:"500" },
  textarea:  { width:"100%", padding:"10px 12px", border:"1px solid #ddd", borderRadius:"5px", fontSize:"0.95rem", resize:"vertical", fontFamily:"inherit" },
  errBorder: { borderColor:"#e94560" },
  errText:   { color:"#e94560", fontSize:"0.78rem", marginTop:"4px", display:"block" },
  select:    { width:"100%", padding:"10px 12px", border:"1px solid #ddd", borderRadius:"5px", fontSize:"0.95rem", background:"#fff" },
  btn:       { width:"100%", padding:"13px", background:"#e94560", color:"#fff", border:"none", borderRadius:"5px", cursor:"pointer", fontWeight:"700", fontSize:"1rem", marginTop:"8px" },
};

export default EditProperty;
