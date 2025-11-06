"use client";

import { useState } from "react";

export default function ResendVerificationPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Success: ${data.data.message}`);
        setEmail("");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Resend Verification Email</h1>

      <p style={{ marginBottom: "20px", color: "#666" }}>
        Enter your email address to receive a new verification link.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Verification Email"}
        </button>
      </form>

      {message && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: message.startsWith("Success")
              ? "#d4edda"
              : "#f8d7da",
            border: `1px solid ${
              message.startsWith("Success") ? "#c3e6cb" : "#f5c6cb"
            }`,
            borderRadius: "4px",
          }}
        >
          {message}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <a href="/login" style={{ color: "#007bff", marginRight: "20px" }}>
          Back to Login
        </a>
        <a href="/register" style={{ color: "#007bff" }}>
          Register new account
        </a>
      </div>
    </div>
  );
}
