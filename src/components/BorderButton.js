import React from "react";

const BorderButton = ({ borders, onClick }) => {
  if (!borders || borders.length === 0) return <p>No borders available.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {borders.map((code) => (
        <button
          key={code}
          onClick={() => onClick(code)}
          style={{
            padding: "5px 15px",
            backgroundColor: "#3AAFA9",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {code}
        </button>
      ))}
    </div>
  );
};

export default BorderButton;
