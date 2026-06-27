"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/lib/auth";

export default function AccountPage() {
  const { user, loading, signup, login, logout } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      router.push("/profiles");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <NavBar />
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <main className="max-w-md mx-auto px-6 py-16 text-center">
          <h1 className="text-[22px] mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Signed in
          </h1>
          <p className="text-[14px] mb-6" style={{ color: "var(--ch-text-secondary)" }}>
            {user.email}
          </p>
          <div className="flex flex-col gap-3">
            <a href="/profiles" className="ch-btn-primary py-2.5 text-[13.5px]">
              Manage your birth profiles
            </a>
            <button onClick={logout} className="ch-btn-secondary py-2.5 text-[13.5px]">
              Sign out
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-md mx-auto px-6 py-16">
        <h1 className="text-[22px] text-center mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
          {mode === "login" ? "Sign in" : "Create an account"}
        </h1>
        <p className="text-[13px] text-center mb-7" style={{ color: "var(--ch-text-muted)" }}>
          Save your birth details once, and every reading remembers who you are.
        </p>

        <form onSubmit={handleSubmit} className="ch-glass-strong p-6">
          <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="ch-input w-full px-3 py-2.5 text-[14px] mb-4"
          />

          <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
            Password
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="ch-input w-full px-3 py-2.5 text-[14px] mb-5"
          />

          {error && (
            <p className="text-[12.5px] mb-4" style={{ color: "var(--ch-danger)" }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="ch-btn-primary w-full py-3 text-[14px] disabled:opacity-60">
            {submitting ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="text-center text-[13px] mt-5" style={{ color: "var(--ch-text-muted)" }}>
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="underline"
            style={{ color: "var(--ch-gold-400)" }}
          >
            {mode === "login" ? "Create an account" : "Sign in instead"}
          </button>
        </p>
      </main>
    </div>
  );
}
