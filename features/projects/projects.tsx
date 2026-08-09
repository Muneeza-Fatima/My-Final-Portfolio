"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";

import { ProjectCard } from "./projects-card";


const projects = [
{
number:"01",
title:"Velvet & Whisk",
category:"E-commerce Experience",
description:
"A refined cafe and bakery e-commerce experience featuring elegant layouts, product presentation, responsive interactions, shopping cart functionality and a smooth user journey.",
role:"Frontend Development",
focus:"Responsive Design • UX • Performance",
tech:[
"HTML5",
"CSS3",
"JavaScript (ES6)",
],
image:"/projects/velvet-whisk.webp",
liveUrl:
"https://muneeza-fatima.github.io/Velvet-and-Whisk/",
githubUrl:
"https://github.com/Muneeza-Fatima/Velvet-and-Whisk",
},

{
number:"02",
title:"Aura Clinic",
category:"Healthcare Website",
description:
"A modern healthcare interface designed for a dermatology clinic, featuring service sections, doctor information, API integration and a clean user-focused experience.",
role:"Frontend Development",
focus:"UI Architecture • Accessibility • Responsive Design",
tech:[
"HTML5",
"CSS3",
"JavaScript (ES6)",
],
image:"/projects/aura-clinic.webp",
liveUrl:
"https://muneeza-fatima.github.io/Aura-Clinic/",
githubUrl:
"https://github.com/Muneeza-Fatima/Aura-Clinic",
},

{
number:"03",
title:"Restaurant Order System",
category:"Food Ordering Platform",
description:
"A responsive restaurant ordering system with dynamic food categories, interactive shopping cart functionality and a streamlined ordering experience.",
role:"Frontend Development",
focus:"Interactive UI • User Flow • Performance",
tech:[
"HTML5",
"CSS3",
"JavaScript (ES6)",
],
image:"/projects/restaurant-order-system.webp",
liveUrl:
"https://muneeza-fatima.github.io/Restraunt-order-system/",
githubUrl:
"https://github.com/Muneeza-Fatima/Restraunt-order-system",
},
];



function ProjectsBackground(){

return (

<>

<motion.div

animate={{
x:[0,40,0],
y:[0,-20,0],
}}

transition={{
duration:24,
repeat:Infinity,
ease:"easeInOut",
}}

className="
absolute
-left-48
top-40
h-[420px]
w-[420px]
rounded-full
bg-blue-500/5
blur-[150px]
"

/>


<motion.div

animate={{
x:[0,-40,0],
y:[0,30,0],
}}

transition={{
duration:26,
repeat:Infinity,
ease:"easeInOut",
}}

className="
absolute
-right-48
bottom-20
h-[450px]
w-[450px]
rounded-full
bg-indigo-500/5
blur-[160px]
"

/>

</>

);

}
export function Projects(){

return (

<section
id="projects"
className="
relative
pt-0
pb-8
lg:pt-2
lg:pb-10
"
>


<ProjectsBackground />


<Container>


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
Selected Work
</p>



<h2
className="
mt-4
max-w-3xl
text-4xl
font-semibold
leading-[1.1]
tracking-tight
text-white
md:text-6xl
"
>

Projects that showcase my approach to{" "}

<span
className="
bg-gradient-to-r
from-blue-300
via-indigo-300
to-purple-300
bg-clip-text
text-transparent
"
>
frontend engineering.
</span>

</h2>



<p
className="
mt-3
max-w-2xl
text-lg
leading-relaxed
text-white/60
"
>

A curated collection of frontend projects focused on
responsive interfaces, thoughtful UX and modern
development practices.

</p>


</motion.div>




<div
className="
mt-6
space-y-6
md:mt-8
"
>


{
projects.map((project,index)=>(

<ProjectCard

key={project.title}

project={project}

index={index}

/>

))
}


</div>



</Container>


</section>

);

}