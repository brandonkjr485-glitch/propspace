import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosInstance";
import InputField from "../components/InputField";

const Register = () => {
  const [form,    setForm]    = useState({ username:"", email:"", password:"", confirm:"" });
  const [errors,  setErrors]  = useState({});
  const [apiErr,  setApiErr]  = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.username.trim())            e.username = "Username is required";
    if (!form.email.trim())               e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.password)                   e.password = "Password is required";
    else if (form.password.length < 6)    e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm)   e.confirm  = "Passwords do not match";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setLoading(true);
    setApiErr("");
    try {
      const { data } = await api.post("/auth/register", {
        username: form.username,
        email:    form.email,
        password: form.password,
      });
      login(data);
      navigate("/");
    } catch (err) {
      setApiErr(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <h2 style={s.heading}>Create Account</h2>
        {apiErr && <div style={s.alert}>{apiErr}</div>}
        <InputField label="Username"        name="username" value={form.username} onChange={handleChange} placeholder="johndoe"     error={errors.username} />
        <InputField label="Email"           name="email"    value={form.email}    onChange={handleChange} placeholder="you@email.com" type="email" error={errors.email} />
        <InputField label="Password"        name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 chars"  type="password" error={errors.password} />
        <InputField label="Confirm Password" name="confirm" value={form.confirm}  onChange={handleChange} placeholder="Repeat password" type="password" error={errors.confirm} />
        <button onClick={handleSubmit} disabled={loading} style={s.btn}>
          {loading ? "Creating account..." : "Register"}
        </button>
        <p style={s.footer}>Already have an account? <Link to="/login" style={s.link}>Login</Link></p>
      </div>
    </div>
  );
};

const s = {
  wrapper: { display:"flex", justifyContent:"center", alignItems:"center", minHeight:"88vh", padding:"24px" },
  card:    { background:"#fff", padding:"36px", borderRadius:"10px", width:"100%", maxWidth:"420px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)" },
  heading: { color:"#1a1a2e", marginBottom:"24px", textAlign:"center" },
  alert:   { background:"#fff0f0", border:"1px solid #e94560", color:"#e94560", padding:"10px 14px", borderRadius:"5px", marginBottom:"16px", fontSize:"0.875rem" },
  btn:     { width:"100%", padding:"12px", background:"#e94560", color:"#fff", border:"none", borderRadius:"5px", cursor:"pointer", fontWeight:"700", fontSize:"1rem" },
  footer:  { textAlign:"center", marginTop:"18px", fontSize:"0.875rem", color:"#666" },
  link:    { color:"#e94560", fontWeight:"600" },
};

export default Register;
