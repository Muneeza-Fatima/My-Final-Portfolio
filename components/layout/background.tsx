"use client";

import { memo } from "react";


function Background() {

  return (

    <div
      aria-hidden="true"
      className="
      pointer-events-none
      fixed
      inset-0
      -z-50
      overflow-hidden
      "
    >

      {/* Main Gradient */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-br
        from-[#050816]
        via-[#0b1024]
        to-[#050816]
        "
      />


      {/* Violet Glow */}

      <div
        className="
        absolute
        -left-40
        top-20
        h-[420px]
        w-[420px]
        rounded-full
        bg-violet-600/20
        blur-[100px]
        "
      />


      {/* Cyan Glow */}

      <div
        className="
        absolute
        -right-40
        top-1/3
        h-[350px]
        w-[350px]
        rounded-full
        bg-cyan-400/10
        blur-[100px]
        "
      />


      {/* Subtle Grid */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.035]
        "
        style={{
          backgroundImage:
          `
          linear-gradient(
          rgba(255,255,255,.15) 1px,
          transparent 1px
          ),
          linear-gradient(
          90deg,
          rgba(255,255,255,.15) 1px,
          transparent 1px
          )
          `,
          
          backgroundSize:
          "60px 60px",
        }}
      />

    </div>

  );
}


export const MemoBackground =
memo(Background);


export { MemoBackground as Background };