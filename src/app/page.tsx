"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Zyraa Authentication</h1>

      <div style={{ marginBottom: "30px" }}>
        {status === "loading" && <p>Loading...</p>}

        {status === "authenticated" && session && (
          <div
            style={{
              backgroundColor: "#d4edda",
              padding: "15px",
              borderRadius: "4px",
              border: "1px solid #c3e6cb",
            }}
          >
            <p>
              <strong>Welcome back, {session.user?.name}!</strong>
            </p>
            <p>Email: {session.user?.email}</p>
            <p>Verified: {session.user?.emailVerified ? "Yes" : "No"}</p>
          </div>
        )}

        {status === "unauthenticated" && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              padding: "15px",
              borderRadius: "4px",
              border: "1px solid #f5c6cb",
            }}
          >
            <p>You are not logged in.</p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Test Authentication Flow</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "200px",
          }}
        >
          {status === "unauthenticated" && (
            <>
              <a
                href="/register"
                style={{
                  padding: "10px",
                  backgroundColor: "#28a745",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              >
                Register
              </a>

              <a
                href="/login"
                style={{
                  padding: "10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              >
                Login
              </a>

              <a
                href="/resend-verification"
                style={{
                  padding: "10px",
                  backgroundColor: "#ffc107",
                  color: "black",
                  textDecoration: "none",
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              >
                Resend Verification
              </a>
            </>
          )}

          {status === "authenticated" && (
            <a
              href="/dashboard"
              style={{
                padding: "10px",
                backgroundColor: "#17a2b8",
                color: "white",
                textDecoration: "none",
                textAlign: "center",
                borderRadius: "4px",
              }}
            >
              Dashboard
            </a>
          )}
        </div>
      </div>

      <div style={{ marginTop: "40px", fontSize: "14px", color: "#666" }}>
        <h3>Available Routes:</h3>
        <ul>
          <li>
            <code>/register</code> - User registration
          </li>
          <li>
            <code>/login</code> - Login (credentials, Google, GitHub)
          </li>
          <li>
            <code>/dashboard</code> - Protected dashboard
          </li>
          <li>
            <code>/resend-verification</code> - Resend verification email
          </li>
          <li>
            <code>/verify/[token]</code> - Email verification (from email links)
          </li>
          <li>
            <code>/api/auth/register</code> - Registration API
          </li>
          <li>
            <code>/api/auth/resend-verification</code> - Resend API
          </li>
        </ul>
      </div>
    </div>
  );
}
