"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Code2,
} from "lucide-react";


interface Project {

  number:string;
  title:string;
  category:string;
  description:string;
  role:string;
  focus:string;
  tech:string[];
  image:string;
  liveUrl:string;
  githubUrl:string;

}



interface Props {

  project:Project;
  index:number;

}




export function ProjectCard({

  project,
  index,

}:Props){


return (

<motion.div

initial={{
  opacity:0,
  y:25,
}}

whileInView={{
  opacity:1,
  y:0,
}}

viewport={{

  once:true,
  amount:0.15,

}}

transition={{

  duration:0.55,
  delay:index * 0.08,
  ease:"easeOut",

}}


className="
group
overflow-hidden
rounded-[36px]
border
border-white/10
bg-white/[0.035]
p-6
md:p-8
lg:backdrop-blur-xl
shadow-[0_20px_50px_rgba(0,0,0,0.25)]
"

>


<div

className="
grid
gap-10
lg:grid-cols-2
lg:items-center
"

>


{/* IMAGE */}


<div

className="
overflow-hidden
rounded-3xl
border
border-white/10
bg-black/30
"

>


<div

className="
flex
items-center
gap-2
border-b
border-white/10
bg-white/[0.04]
px-5
py-3
"

>

<span className="h-2.5 w-2.5 rounded-full bg-red-400/70"/>
<span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70"/>
<span className="h-2.5 w-2.5 rounded-full bg-green-400/70"/>

</div>




<div

className="
relative
aspect-[16/10]
w-full
overflow-hidden
bg-black/20
"

>


<Image

src={project.image}

alt={project.title}

fill

sizes="
(max-width:768px) 100vw,
(max-width:1280px) 50vw,
600px
"

className="
object-contain
p-2
transition-transform
duration-500
ease-out
lg:group-hover:scale-[1.03]
"

/>



<div

className="
absolute
inset-0
bg-gradient-to-t
from-black/30
via-transparent
to-transparent
pointer-events-none
"

 />


</div>


</div>





{/* CONTENT */}


<div

className="
flex
flex-col
"

>


<span

className="
text-xs
uppercase
tracking-[0.35em]
text-blue-300
"

>

{project.number}

</span>




<p

className="
mt-4
text-sm
text-white/50
"

>

{project.category}

</p>




<h3

className="
mt-3
text-3xl
font-semibold
tracking-tight
text-white
md:text-4xl
"

>

{project.title}

</h3>




<p

className="
mt-5
leading-relaxed
text-white/60
"

>

{project.description}

</p>







<div

className="
mt-8
space-y-5
rounded-2xl
border
border-white/10
bg-black/20
p-5
"

>


{

[

{
title:"Role",
value:project.role,
},

{
title:"Built With",
value:project.tech.join(" • "),
},

{
title:"Focus",
value:project.focus,
},

]

.map((item)=>(


<div key={item.title}>


<p

className="
text-xs
uppercase
tracking-[0.25em]
text-white/40
"

>

{item.title}

</p>



<p

className="
mt-2
text-sm
text-white/80
"

>

{item.value}

</p>


</div>


))


}


</div>







<div

className="
mt-8
flex
flex-wrap
gap-4
"

>


<a

href={project.liveUrl}

target="_blank"

rel="noopener noreferrer"

className="
flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-violet-500
to-blue-500
px-6
py-3
text-sm
font-semibold
text-white
transition
lg:hover:-translate-y-1
"

>

Live Demo

<ExternalLink size={16}/>

</a>






<a

href={project.githubUrl}

target="_blank"

rel="noopener noreferrer"

className="
flex
items-center
gap-2
rounded-xl
border
border-white/10
bg-white/5
px-6
py-3
text-sm
text-white
transition
lg:hover:-translate-y-1
lg:hover:bg-white/10
"

>

GitHub

<Code2 size={16}/>

</a>



</div>



</div>


</div>


</motion.div>


);

}