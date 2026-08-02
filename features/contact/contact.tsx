"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { ContactBackground } from "./contact-background";
import { ContactForm } from "./contact-form";


export function Contact() {

  return (
    <Section
      id="contact"
      className="
        relative
        overflow-hidden
        py-24
        md:py-36
      "
    >

      <ContactBackground />


      <Container>


        {/* Header */}

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
            Get In Touch
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

            Let&apos;s build something{" "}

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
              remarkable together.
            </span>


          </h2>



          <p
            className="
              mt-7
              max-w-xl
              text-lg
              leading-relaxed
              text-white/60
            "
          >

            Have a website idea, frontend project
            or digital product in mind?
            Let&apos;s discuss how we can create
            something impactful.

          </p>


        </motion.div>





        <div
          className="
            mt-14
            grid
            gap-8
            lg:grid-cols-5
            lg:mt-16
          "
        >


          {/* Form */}

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
            }}

            transition={{
              duration:0.7,
              delay:0.1,
            }}

            className="
              lg:col-span-3
            "
          >

            <ContactForm />

          </motion.div>







          {/* Availability Card */}


          <motion.div

            initial={{
              opacity:0,
              scale:0.96,
            }}

            whileInView={{
              opacity:1,
              scale:1,
            }}

            viewport={{
              once:true,
            }}

            transition={{
              duration:0.7,
              delay:0.2,
            }}

            className="
              lg:col-span-2
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.035]
              p-8
              backdrop-blur-2xl
              transition
              duration-500
              hover:border-blue-300/20
            "
          >


            <h3
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-white
              "
            >
              Let&apos;s collaborate
            </h3>



            <p
              className="
                mt-4
                leading-relaxed
                text-white/60
              "
            >
              Available for freelance projects,
              frontend development and modern
              web experiences.
            </p>





            <div
              className="
                mt-8
                space-y-5
              "
            >


              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-white/5
                  bg-white/[0.02]
                  p-4
                "
              >

                <Mail
                  size={20}
                  className="text-blue-300"
                />

                <span className="text-sm text-white/70">
                  Open for opportunities
                </span>

              </div>




              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-white/5
                  bg-white/[0.02]
                  p-4
                "
              >

                <MapPin
                  size={20}
                  className="text-blue-300"
                />

                <span className="text-sm text-white/70">
                  Working worldwide
                </span>

              </div>





              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-white/5
                  bg-white/[0.02]
                  p-4
                "
              >

                <Clock
                  size={20}
                  className="text-blue-300"
                />

                <span className="text-sm text-white/70">
                  Response within 24-48 hours
                </span>

              </div>


            </div>


          </motion.div>


        </div>


      </Container>


    </Section>
  );
}