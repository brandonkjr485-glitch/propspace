const InputField = ({ label, error, ...props }) => (
  <div style={s.wrap}>
    {label && <label style={s.label}>{label}</label>}
    <input style={{ ...s.input, ...(error ? s.inputErr : {}) }} {...props} />
    {error && <span style={s.errText}>{error}</span>}
  </div>
);

const s = {
  wrap:     { display:"flex", flexDirection:"column", marginBottom:"14px" },
  label:    { fontSize:"0.85rem", color:"#555", marginBottom:"5px", fontWeight:"500" },
  input:    { padding:"10px 12px", border:"1px solid #ddd", borderRadius:"5px", fontSize:"0.95rem", outline:"none", transition:"border .2s" },
  inputErr: { borderColor:"#e94560" },
  errText:  { color:"#e94560", fontSize:"0.78rem", marginTop:"4px" },
};

export default InputField;
