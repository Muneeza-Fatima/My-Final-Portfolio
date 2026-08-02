"use client";

import dynamic from "next/dynamic";


const DesktopHeroModel = dynamic(
  () =>
    import("./hero-model").then(
      (mod) => mod.HeroModel
    ),
  {
    ssr: false,
  }
);



export function HeroModel() {


  return <DesktopHeroModel />;


}