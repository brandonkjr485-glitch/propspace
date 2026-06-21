import { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import InputField from "../components/InputField";
import { Loading } from "../components/StateComponents";

const Profile = () => {
  const [form,    setForm]    = useState({ fullName:"", phone:"", avatar:"" });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [success, setSuccess] = useState("");
  const [apiErr,  setApiErr]  = useState("");

  useEffect(() => {
    const controller = new AbortController();
    api.get("/users/profile", { signal: controller.signal })
      .then(({ data }) => setForm({ fullName: data.fullName || "", phone: data.phone || "", avatar: data.avatar || "" }))
      .catch((err) => { if (err.name !== "CanceledError") setApiErr("Failed to load profile."); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const handleSave = async () => {
    setSaving(true);
    setApiErr("");
    setSuccess("");
    try {
      await api.put("/users/profile", form);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setApiErr(err.response?.data?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading text="Loading profile..." />;

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <h2 style={s.heading}>Profile Settings</h2>
        {success && <div style={s.success}>{success}</div>}
        {apiErr  && <div style={s.alert}>{apiErr}</div>}
        {form.avatar && (
          <div style={{ textAlign:"center", marginBottom:"16px" }}>
            <img src={form.avatar} alt="avatar" style={s.avatar}
              onError={(e) => { e.target.style.display = "none"; }} />
          </div>
        )}
        <InputField label="Full Name"   name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" />
        <InputField label="Phone"       name="phone"    value={form.phone}    onChange={handleChange} placeholder="+237 6XX XXX XXX" />
        <InputField label="Avatar URL"  name="avatar"   value={form.avatar}   onChange={handleChange} placeholder="https://..." />
        <button onClick={handleSave} disabled={saving} style={s.btn}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

const s = {
  wrapper:  { display:"flex", justifyContent:"center", padding:"32px 24px" },
  card:     { background:"#fff", padding:"36px", borderRadius:"10px", width:"100%", maxWidth:"460px", boxShadow:"0 4px 20px rgba(0,0,0,0.09)" },
  heading:  { color:"#1a1a2e", marginBottom:"24px" },
  success:  { background:"#f0fff4", border:"1px solid #38a169", color:"#276749", padding:"10px 14px", borderRadius:"5px", marginBottom:"16px", fontSize:"0.875rem" },
  alert:    { background:"#fff0f0", border:"1px solid #e94560", color:"#e94560", padding:"10px 14px", borderRadius:"5px", marginBottom:"16px", fontSize:"0.875rem" },
  avatar:   { width:"80px", height:"80px", borderRadius:"50%", objectFit:"cover" },
  btn:      { width:"100%", padding:"12px", background:"#e94560", color:"#fff", border:"none", borderRadius:"5px", cursor:"pointer", fontWeight:"700", fontSize:"1rem" },
};

export default Profile;
