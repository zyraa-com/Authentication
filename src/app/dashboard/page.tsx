"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/login" });
  };

  if (status === "loading") {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  if (!session) {
    return (
      <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
        <h1>Access Denied</h1>
        <p>You need to be logged in to view this page.</p>
        <a href="/login" style={{ color: "#007bff" }}>
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Dashboard</h1>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        <h2>User Information</h2>
        <p>
          <strong>Name:</strong> {session.user?.name}
        </p>
        <p>
          <strong>Email:</strong> {session.user?.email}
        </p>
        <p>
          <strong>Email Verified:</strong>{" "}
          {session.user?.emailVerified ? "Yes" : "No"}
        </p>
        <p>
          <strong>Plan:</strong> {session.user?.plan}
        </p>
        <p>
          <strong>Premium:</strong> {session.user?.isPremium ? "Yes" : "No"}
        </p>
        <p>
          <strong>Trial Used:</strong> {session.user?.trialUsed ? "Yes" : "No"}
        </p>

        {session.user?.usage && (
          <div>
            <h3>Usage Stats</h3>
            <p>
              <strong>Total Builds:</strong> {session.user.usage.totalBuilds}
            </p>
            <p>
              <strong>Remaining Trial:</strong>{" "}
              {session.user.usage.remainingTrial}
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          backgroundColor: "#fff3cd",
          padding: "15px",
          borderRadius: "4px",
          marginBottom: "20px",
          border: "1px solid #ffeaa7",
        }}
      >
        <h3>Session Data (for testing)</h3>
        <pre style={{ fontSize: "12px", overflow: "auto" }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <button
        onClick={handleSignOut}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#dc3545",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          borderRadius: "4px",
        }}
      >
        {loading ? "Signing out..." : "Sign Out"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <a href="/" style={{ color: "#007bff" }}>
          Back to Home
        </a>
      </div>
    </div>
  );
}
