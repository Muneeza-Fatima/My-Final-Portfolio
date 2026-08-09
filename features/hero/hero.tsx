"use client";

import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";
import { HeroButtons } from "./hero-buttons";
import { HeroBackground } from "./hero-background";
import { HeroTrust } from "./hero-trust";

import { Container } from "@/components/ui/container";


export function Hero(){

return(

<section
id="home"
className="
relative
isolate

min-h-screen

overflow-hidden

pt-28
pb-10

lg:pt-32
lg:pb-16
"
>


{/* Background */}
<HeroBackground />



<Container>

<div
className="
relative
z-20

grid
grid-cols-1

items-center

gap-12

lg:grid-cols-[1fr_0.9fr]

lg:gap-8
"

>


{/* Content */}

<div
className="
order-2

relative
z-30

max-w-xl

lg:order-1
"

>

<HeroContent />


<div
className="
relative
z-40

mt-8
"

>

<HeroButtons />

</div>



<HeroTrust />

</div>





{/* Image */}

<div
className="
order-1

relative
z-10

flex

justify-center

lg:order-2

lg:justify-end
"

>


<div
className="
relative

mt-4

lg:mt-0
"

>

<HeroImage />

</div>


</div>



</div>


</Container>


</section>

);

}