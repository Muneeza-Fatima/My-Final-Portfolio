"use client";

import { ArrowRight } from "lucide-react";


export function HeroButtons() {


  const scrollToSection = (id:string) => {

    const section = document.querySelector(id);


    if(section){

      section.scrollIntoView({
        behavior:"smooth",
        block:"start",
      });

    }

  };



  return (

    <div
      className="
        flex
        flex-col
        gap-4
        sm:flex-row
      "
    >


      <button

        onClick={()=>scrollToSection("#projects")}

        className="
          group
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-white
          px-6
          py-3
          text-sm
          font-semibold
          text-black
          transition
          hover:-translate-y-1
          hover:bg-neutral-200
        "

      >

        View My Work

        <ArrowRight
          size={16}
          className="
            transition
            group-hover:translate-x-1
          "
        />

      </button>




      <button

        onClick={()=>scrollToSection("#contact")}

        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-white/20
          bg-white/5
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          backdrop-blur-xl
          transition
          hover:-translate-y-1
          hover:bg-white/10
        "

      >

        Let&apos;s Talk


      </button>



    </div>

  );

}