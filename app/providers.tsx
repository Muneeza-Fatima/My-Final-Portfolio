"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { SmoothScroll } from "@/components/providers/smooth-scroll";


interface ProvidersProps {
  children: ReactNode;
}


export function Providers({
  children,
}: ProvidersProps) {

  return (

    <ThemeProvider

      attribute="class"

      defaultTheme="dark"

      enableSystem={false}

      disableTransitionOnChange

      storageKey="muneeza-portfolio-theme"

    >

      <SmoothScroll>

        {children}

      </SmoothScroll>


    </ThemeProvider>

  );

}