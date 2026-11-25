export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const canUsePointerEffects = () => hasFinePointer() && !prefersReducedMotion();

export function whenBooted(callback) {
  if (document.documentElement.classList.contains("booted")) {
    callback();
    return () => {};
  }
  window.addEventListener("portfolio:booted", callback, { once: true });
  return () => window.removeEventListener("portfolio:booted", callback);
}
