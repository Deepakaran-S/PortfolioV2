import { useEffect, useState } from "react";
import { PROFILE } from "../../data/profile";

const CACHE_KEY = "latest-repo";
const USERNAME = PROFILE.github.split("/").pop();
const API_URL = `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=10`;

function timeAgo(iso) {
  const minutes = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 60) return `${days}d ago`;
  return `${Math.round(days / 30)}mo ago`;
}

function readCache() {
  try {
    return JSON.parse(sessionStorage.getItem(CACHE_KEY));
  } catch {
    return null;
  }
}

function measurePageWeight() {
  if (!import.meta.env.PROD) return null;
  const bytes = performance
    .getEntriesByType("resource")
    .filter((r) => r.initiatorType === "script" || r.initiatorType === "link")
    .reduce((sum, r) => sum + (r.encodedBodySize || 0), 0);
  return bytes > 0 ? Math.round(bytes / 1024) : null;
}

const itemStyle = { display: "inline-flex", alignItems: "center", gap: 8 };

export default function ProofStrip() {
  const [repo, setRepo] = useState(readCache);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    if (repo) return;
    let cancelled = false;
    fetch(API_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((repos) => {
        const latest = repos.find((r) => !r.fork && r.name.toLowerCase() !== USERNAME.toLowerCase());
        if (cancelled || !latest) return;
        const data = { name: latest.name, url: latest.html_url, pushedAt: latest.pushed_at };
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
        setRepo(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [repo]);

  useEffect(() => {
    const measure = () => setWeight(measurePageWeight());
    if (document.readyState === "complete") measure();
    else window.addEventListener("load", measure, { once: true });
    return () => window.removeEventListener("load", measure);
  }, []);

  if (!repo && !weight) return null;

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-soft)" }}>
      {repo && (
        <a href={repo.url} target="_blank" rel="noopener noreferrer" style={{ ...itemStyle, textDecoration: "none" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", animation: "fl-pulse 2s infinite" }} />
          Latest push: {repo.name} · {timeAgo(repo.pushedAt)}
        </a>
      )}
      {weight && <span style={itemStyle}>This page: {weight} KB over the wire</span>}
    </div>
  );
}
