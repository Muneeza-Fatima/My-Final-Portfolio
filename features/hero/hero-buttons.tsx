"use client";

import { ArrowRight } from "lucide-react";


export function HeroButtons() {


  const handleScroll = (href:string) => {


    const section = document.querySelector(href);



    if(section){


      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        100;



      window.scrollTo({

        top,

        behavior:"smooth",

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
        sm:items-center
      "

    >



      {/* View Work */}


      <button

        onClick={()=>handleScroll("#projects")}


        className="
          group

          flex
          items-center
          justify-center
          gap-2

          rounded-xl

          bg-gradient-to-r

          from-violet-500
          via-purple-500
          to-blue-500


          px-6
          py-3


          text-sm

          font-semibold

          text-white


          shadow-[0_0_35px_rgba(139,92,246,0.35)]


          transition-all

          duration-300


          hover:-translate-y-1


          hover:shadow-[0_0_55px_rgba(139,92,246,0.55)]
        "

      >

        View My Work


        <ArrowRight

          size={16}

          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "

        />


      </button>




      {/* Contact */}


      <button

        onClick={()=>handleScroll("#contact")}


        className="
          flex

          items-center

          justify-center


          rounded-xl


          border

          border-white/15


          bg-white/5


          px-6

          py-3


          text-sm

          font-semibold

          text-white


          backdrop-blur-xl


          transition-all

          duration-300


          hover:bg-white/10
        "

      >

        Let&apos;s Talk


      </button>



    </div>

  );

}