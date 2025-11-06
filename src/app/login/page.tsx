"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: true,
      });

      if (result?.error) {
        setMessage(`Error: ${result.error}`);
        setLoading(false);
      }
      // If successful, NextAuth will redirect automatically
    } catch (error) {
      setMessage("Login failed");
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setMessage("");
    try {
      await signIn(provider); // Let NextAuth handle the redirect to /auth/redirect
    } catch (error) {
      console.error("OAuth error:", error);
      setMessage(`${provider} login failed`);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleCredentialsLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
            marginBottom: "10px",
          }}
        >
          {loading ? "Logging in..." : "Login with Email"}
        </button>
      </form>

      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <hr style={{ margin: "10px 0" }} />
        <span>OR</span>
        <hr style={{ margin: "10px 0" }} />
      </div>

      <button
        onClick={() => handleOAuthLogin("google")}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#db4437",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Login with Google
      </button>

      <button
        onClick={() => handleOAuthLogin("github")}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login with GitHub
      </button>

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
        <a href="/register" style={{ color: "#007bff", marginRight: "20px" }}>
          Don't have an account? Register
        </a>
        <a href="/resend-verification" style={{ color: "#007bff" }}>
          Resend verification email
        </a>
      </div>
    </div>
  );
}
