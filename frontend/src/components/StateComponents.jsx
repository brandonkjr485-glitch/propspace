export const Loading = ({ text = "Loading..." }) => (
  <div style={{ textAlign:"center", padding:"60px", color:"#888", fontSize:"1rem" }}>
    ⏳ {text}
  </div>
);

export const ErrorMessage = ({ message = "Something went wrong." }) => (
  <div style={{ textAlign:"center", padding:"60px", color:"#e94560", fontSize:"1rem" }}>
    ⚠️ {message}
  </div>
);

export const EmptyState = ({ message = "No results found." }) => (
  <div style={{ textAlign:"center", padding:"60px", color:"#aaa", fontSize:"1rem" }}>
    📭 {message}
  </div>
);
