"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


export function HeroButtons(){

return(

<div
className="
flex
w-full
flex-col
gap-4

sm:w-auto
sm:flex-row
"
>


<motion.div
whileHover={{y:-3}}
whileTap={{scale:.97}}
>

<Link

href="#projects"

className="
flex
h-12
w-full

items-center
justify-center
gap-2

rounded-xl

bg-white

px-8

text-sm
font-semibold

text-black

sm:w-auto
"

>

View My Work

<ArrowRight size={16}/>

</Link>

</motion.div>




<motion.div
whileHover={{y:-3}}
whileTap={{scale:.97}}
>

<Link

href="#contact"

className="
flex
h-12
w-full

items-center
justify-center

rounded-xl

border

border-white/15

bg-white/5

px-8

text-sm

font-semibold

text-white

sm:w-auto
"

>

Let&apos;s Talk

</Link>

</motion.div>


</div>

);

}