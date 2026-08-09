"use client";

import { motion } from "framer-motion";

import {
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";

import { AboutBackground } from "./about-background";


const focusAreas = [
  {
    label:"Frontend Engineering",
    value:"90%",
  },
  {
    label:"UI Implementation",
    value:"85%",
  },
  {
    label:"Interactive Motion",
    value:"75%",
  },
];


const highlights = [
  {
    icon:Code2,
    title:"Clean Development",
    text:"Writing scalable and maintainable frontend solutions.",
  },
  {
    icon:Layers3,
    title:"Thoughtful Interfaces",
    text:"Creating designs that feel simple and intuitive.",
  },
  {
    icon:Sparkles,
    title:"Digital Experiences",
    text:"Adding motion and interaction that improves usability.",
  },
];


const reveal = {
  hidden:{
    opacity:0,
    y:20,
  },

  show:{
    opacity:1,
    y:0,
  },
};



export function About(){

return (

<section
id="about"
className="
relative
pt-8
pb-10
lg:pt-10
lg:pb-12
overflow-hidden
"
>


<AboutBackground />


<Container>


{/* Heading */}

<motion.div

variants={reveal}

initial="hidden"

whileInView="show"

viewport={{
once:true,
amount:0.25,
}}

transition={{
duration:0.6,
}}

>


<p
className="
text-sm
uppercase
tracking-[0.35em]
text-blue-300
"
>
About Me
</p>



<h2

className="
mt-5
max-w-3xl
text-4xl
font-semibold
leading-[1.1]
tracking-tight
text-white
md:text-6xl
"

>

Building digital experiences where{" "}

<span

className="
bg-gradient-to-r
from-white
via-slate-200
to-blue-300
bg-clip-text
text-transparent
"

>

design meets engineering.

</span>

</h2>



<p

className="
mt-5
max-w-2xl
text-lg
leading-relaxed
text-white/60
"

>

I’m Muneeza Fatima, a Frontend Engineer
focused on creating responsive,
interactive and high-quality web experiences.
I enjoy transforming ideas into clean
interfaces with attention to performance,
usability and detail.

</p>


</motion.div>





{/* Stats Card */}

<motion.div

variants={reveal}

initial="hidden"

whileInView="show"

viewport={{
once:true,
amount:0.25,
}}

transition={{
duration:0.7,
}}

className="
mt-8
rounded-[32px]
border
border-white/10
bg-white/[0.04]
p-7
shadow-[0_25px_80px_rgba(0,0,0,0.35)]
backdrop-blur-xl
"

>


{focusAreas.map((item)=>(

<div
key={item.label}
className="mb-5 last:mb-0"
>


<div
className="
flex
justify-between
mb-2
text-sm
text-white/70
"
>

<span>
{item.label}
</span>

<span>
{item.value}
</span>

</div>



<div
className="
h-2
overflow-hidden
rounded-full
bg-white/10
"
>

<motion.div

initial={{
width:0,
}}

whileInView={{
width:item.value,
}}

viewport={{
once:true,
}}

transition={{
duration:1,
}}

className="
h-full
rounded-full
bg-gradient-to-r
from-blue-300
to-indigo-400
"

/>

</div>


</div>

))}


</motion.div>





{/* Highlights */}

<div

className="
mt-8
grid
gap-5
md:grid-cols-3
"

>


{highlights.map((item,index)=>{

const Icon=item.icon;


return (

<motion.div

key={item.title}

variants={reveal}

initial="hidden"

whileInView="show"

viewport={{
once:true,
amount:0.25,
}}

transition={{
duration:0.5,
delay:index*0.1,
}}

className="
rounded-3xl
border
border-white/10
bg-white/[0.035]
p-7
backdrop-blur-xl
"

>


<Icon
size={28}
className="text-blue-300"
/>


<h3

className="
mt-5
text-xl
font-semibold
text-white
"

>

{item.title}

</h3>


<p

className="
mt-3
leading-relaxed
text-white/60
"

>

{item.text}

</p>


</motion.div>

)

})}


</div>


</Container>


</section>

);

}