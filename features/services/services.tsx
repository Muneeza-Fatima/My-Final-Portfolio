"use client";

import { motion } from "framer-motion";

import {
  Code2,
  LayoutTemplate,
  Sparkles,
  Zap,
} from "lucide-react";

import { Container } from "@/components/ui/container";

import { ServicesBackground } from "./services-background";


const services = [
  {
    number:"01",
    title:"Frontend Engineering",
    description:
      "Building modern, responsive interfaces using React, Next.js and scalable frontend architecture.",
    stack:
      "React • Next.js • TypeScript",
    icon: Code2,
  },

  {
    number:"02",
    title:"UI Implementation",
    description:
      "Transforming designs into polished interfaces with attention to detail, usability and consistency.",
    stack:
      "Responsive Design • UI Systems",
    icon: LayoutTemplate,
  },

  {
    number:"03",
    title:"Motion & Interaction",
    description:
      "Creating engaging digital experiences through smooth animations, transitions and micro-interactions.",
    stack:
      "Framer Motion • Interactive UI",
    icon: Sparkles,
  },

  {
    number:"04",
    title:"Performance Optimization",
    description:
      "Improving speed, accessibility and overall website performance for better user experiences.",
    stack:
      "Performance • Clean Code",
    icon: Zap,
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



export function Services(){

return (

<section
id="services"
className="
relative
pt-6
pb-10
lg:pt-8
lg:pb-12
overflow-hidden
"
>

<ServicesBackground />


<Container>


{/* Heading */}

<motion.div

initial={{
opacity:0,
y:30,
}}

whileInView={{
opacity:1,
y:0,
}}

viewport={{
once:true,
amount:0.3,
}}

transition={{
duration:0.7,
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
My Expertise
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

Building modern{" "}

<span

className="
bg-gradient-to-r
from-blue-300
via-violet-300
to-purple-300
bg-clip-text
text-transparent
"

>

digital experiences.

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

I create responsive, interactive and
high-performance web experiences
using modern frontend technologies.

</p>


</motion.div>
{/* Services Timeline */}

<div

className="
mt-10
grid
gap-6
lg:mt-12
"

>


{services.map((service,index)=>{

const Icon = service.icon;


return (

<motion.div

key={service.title}

variants={reveal}

initial="hidden"

whileInView="show"

viewport={{
once:true,
amount:0.15,
}}

transition={{
duration:0.5,
delay:index * 0.06,
}}

className="
relative
pl-16
"

>


{/* Icon */}

<div

className="
absolute
left-0
top-2
flex
h-12
w-12
items-center
justify-center
rounded-2xl
border
border-white/10
bg-white/[0.04]
"

>

<Icon
size={22}
className="text-blue-300"
/>

</div>



{/* Card */}

<div

className="
rounded-3xl
border
border-white/10
bg-white/[0.035]
p-7
backdrop-blur-xl
transition
duration-500
hover:border-blue-300/20
"

>


<span

className="
text-xs
tracking-[0.3em]
text-white/40
"

>

{service.number}

</span>



<h3

className="
mt-3
text-2xl
font-semibold
tracking-tight
text-white
"

>

{service.title}

</h3>



<p

className="
mt-4
leading-relaxed
text-white/60
"

>

{service.description}

</p>



<p

className="
mt-5
text-sm
text-blue-300
"

>

{service.stack}

</p>



</div>


</motion.div>


);

})}


</div>


</Container>


</section>


);

}