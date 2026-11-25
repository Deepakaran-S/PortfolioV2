import { useEffect, useState } from "react";

const readSlug = () => {
  const match = window.location.hash.match(/^#\/case\/([\w-]+)$/);
  return match ? match[1] : null;
};

export function useHashRoute() {
  const [slug, setSlug] = useState(readSlug);

  useEffect(() => {
    const onChange = () => setSlug(readSlug());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return slug;
}
