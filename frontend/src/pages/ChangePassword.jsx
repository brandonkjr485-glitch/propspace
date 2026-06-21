import { useState } from "react";
import api from "../api/axiosInstance";
import InputField from "../components/InputField";

const ChangePassword = () => {
  const [form,    setForm]    = useState({ oldPassword:"", newPassword:"", confirmNew:"" });
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState("");
  const [apiErr,  setApiErr]  = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.oldPassword)           e.oldPassword  = "Current password is required";
    if (!form.newPassword)           e.newPassword  = "New password is required";
    else if (form.newPassword.length < 6) e.newPassword = "New password must be at least 6 characters";
    if (form.newPassword !== form.confirmNew) e.confirmNew = "Passwords do not match";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setLoading(true);
    setApiErr("");
    try {
      await api.put("/users/change-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      setSuccess("Password changed successfully!");
      setForm({ oldPassword:"", newPassword:"", confirmNew:"" });
    } catch (err) {
      setApiErr(err.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <h2 style={s.heading}>Change Password</h2>
        {success && <div style={s.success}>{success}</div>}
        {apiErr  && <div style={s.alert}>{apiErr}</div>}
        <InputField label="Current Password" name="oldPassword" type="password" value={form.oldPassword} onChange={handleChange} error={errors.oldPassword} />
        <InputField label="New Password"     name="newPassword" type="password" value={form.newPassword} onChange={handleChange} error={errors.newPassword} />
        <InputField label="Confirm New Password" name="confirmNew" type="password" value={form.confirmNew} onChange={handleChange} error={errors.confirmNew} />
        <button onClick={handleSubmit} disabled={loading} style={s.btn}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

const s = {
  wrapper: { display:"flex", justifyContent:"center", padding:"32px 24px" },
  card:    { background:"#fff", padding:"36px", borderRadius:"10px", width:"100%", maxWidth:"420px", boxShadow:"0 4px 20px rgba(0,0,0,0.09)" },
  heading: { color:"#1a1a2e", marginBottom:"24px" },
  success: { background:"#f0fff4", border:"1px solid #38a169", color:"#276749", padding:"10px 14px", borderRadius:"5px", marginBottom:"16px", fontSize:"0.875rem" },
  alert:   { background:"#fff0f0", border:"1px solid #e94560", color:"#e94560", padding:"10px 14px", borderRadius:"5px", marginBottom:"16px", fontSize:"0.875rem" },
  btn:     { width:"100%", padding:"12px", background:"#e94560", color:"#fff", border:"none", borderRadius:"5px", cursor:"pointer", fontWeight:"700", fontSize:"1rem" },
};

export default ChangePassword;
