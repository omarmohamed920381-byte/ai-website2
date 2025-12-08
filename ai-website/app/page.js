"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    setLoading(true);

    const res = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setImage(data.url);
    setLoading(false);
  }

  return (
    <div style={{
      fontFamily: "sans-serif",
      padding: "40px",
      maxWidth: "600px",
      margin: "auto",
      textAlign: "center"
    }}>
      
      <h1 style={{ fontSize: "32px", fontWeight: "600" }}>
        Apple-Style AI Image Generator
      </h1>

      <input
        style={{
          width: "100%",
          padding: "14px",
          marginTop: "20px",
          borderRadius: "14px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
        placeholder="Describe your image..."
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateImage}
        style={{
          marginTop: "20px",
          padding: "14px 24px",
          borderRadius: "12px",
          border: "none",
          background: "black",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Generate
      </button>

      {loading && <p style={{ marginTop: "20px" }}>Generating…</p>}

      {image && (
        <img
          src={image}
          style={{ marginTop: "20px", width: "100%", borderRadius: "16px" }}
        />
      )}
    </div>
  );
}
