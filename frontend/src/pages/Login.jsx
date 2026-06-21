import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosInstance";
import InputField from "../components/InputField";

const Login = () => {
  const [form,    setForm]    = useState({ email:"", password:"" });
  const [errors,  setErrors]  = useState({});
  const [apiErr,  setApiErr]  = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.trim())                    e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email    = "Enter a valid email";
    if (!form.password)                        e.password = "Password is required";
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
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate("/");
    } catch (err) {
      setApiErr(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <h2 style={s.heading}>Welcome Back</h2>
        {apiErr && <div style={s.alert}>{apiErr}</div>}
        <InputField label="Email"    name="email"    type="email"    value={form.email}    onChange={handleChange} placeholder="you@email.com" error={errors.email} />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Your password"  error={errors.password} />
        <button onClick={handleSubmit} disabled={loading} style={s.btn}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={s.footer}>No account? <Link to="/register" style={s.link}>Register</Link></p>
      </div>
    </div>
  );
};

const s = {
  wrapper: { display:"flex", justifyContent:"center", alignItems:"center", minHeight:"88vh", padding:"24px" },
  card:    { background:"#fff", padding:"36px", borderRadius:"10px", width:"100%", maxWidth:"400px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)" },
  heading: { color:"#1a1a2e", marginBottom:"24px", textAlign:"center" },
  alert:   { background:"#fff0f0", border:"1px solid #e94560", color:"#e94560", padding:"10px 14px", borderRadius:"5px", marginBottom:"16px", fontSize:"0.875rem" },
  btn:     { width:"100%", padding:"12px", background:"#e94560", color:"#fff", border:"none", borderRadius:"5px", cursor:"pointer", fontWeight:"700", fontSize:"1rem" },
  footer:  { textAlign:"center", marginTop:"18px", fontSize:"0.875rem", color:"#666" },
  link:    { color:"#e94560", fontWeight:"600" },
};

export default Login;
