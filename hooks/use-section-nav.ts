"use client";

import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

// Scrolls to a home-page section. On the home page it uses Lenis for a
// smooth scroll; from any other route it navigates to "/#id".
export function useSectionNav() {
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (id: string, event?: React.MouseEvent) => {
      if (pathname !== "/") return; // let the <a href="/#id"> navigate normally
      event?.preventDefault();
      const target = id === "home" ? 0 : `#${id}`;
      if (lenis) lenis.scrollTo(target, { offset: id === "home" ? 0 : -24, duration: 1.4 });
      else if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      router.replace(id === "home" ? "/" : `/#${id}`, { scroll: false });
    },
    [lenis, pathname, router],
  );
}
