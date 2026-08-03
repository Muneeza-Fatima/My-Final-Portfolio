"use client";

export function HeroBackground(){

return(

<div
className="
absolute
inset-0
overflow-hidden
bg-[#050816]
pointer-events-none
"
>

<div
className="
absolute
left-1/2
top-1/3

h-[400px]
w-[400px]

-translate-x-1/2

rounded-full

bg-blue-500/20

blur-[140px]
"
/>


<div
className="
absolute
bottom-0
left-1/2

h-[300px]
w-[300px]

-translate-x-1/2

rounded-full

bg-purple-500/10

blur-[120px]
"
/>


</div>

);

}