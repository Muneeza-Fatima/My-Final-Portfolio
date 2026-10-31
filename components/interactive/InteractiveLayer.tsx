"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Rendered with the page (not lazy) so the chat button is there on first paint;
// its heavy 3D robot loads separately once the browser is idle.
import ChatWidget from "./ChatWidget";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const Preloader = dynamic(() => import("./Preloader"), { ssr: false });

// Client-only global effects: preloader, chat assistant and cursor. The cursor only mounts for fine pointers
// (mouse/trackpad) and never for reduced motion.
export function InteractiveLayer() {
  const [fineCursor, setFineCursor] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setFineCursor(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <>
      <Preloader />
      <ChatWidget />
      {fineCursor && <CustomCursor />}
    </>
  );
}
