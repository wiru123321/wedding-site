import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { ImageWithFallback, goToPath, logoDw } from "@/app/figma/shared";

export function PageTopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function updateScrolled() {
      setScrolled(window.scrollY > 12);
    }

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  function goHome(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    goToPath("/");
  }

  return (
    <div className={`page-topbar${scrolled ? " is-scrolled" : ""}`}>
      <button
        type="button"
        className="logo-home-button"
        aria-label="Przejdź do strony głównej"
        onClick={goHome}
      >
        <ImageWithFallback src={logoDw} alt="D&W" className="page-topbar__logo" />
      </button>
    </div>
  );
}
