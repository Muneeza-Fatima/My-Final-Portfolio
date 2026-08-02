"use client";

import { useState } from "react";
import {
  ArrowRight,
} from "lucide-react";


export function ContactForm() {


  const [loading,setLoading] = useState(false);

  const [status,setStatus] = useState("");



  const [formData,setFormData] = useState({

    name:"",
    email:"",
    country:"",
    projectType:"",
    message:"",

  });



  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ){

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  }





  async function handleSubmit(
    e: React.FormEvent
  ){

    e.preventDefault();


    setLoading(true);

    setStatus("");



    try {


      const response =
      await fetch(
        "/api/contact",
        {
          method:"POST",

          headers:{
            "Content-Type":
            "application/json",
          },

          body:
          JSON.stringify(formData),

        }
      );



      const data =
      await response.json();



      if(data.success){

        setStatus(
          "✓ Message sent successfully. I'll get back to you soon."
        );


        setFormData({

          name:"",
          email:"",
          country:"",
          projectType:"",
          message:"",

        });


      }

      else{

        setStatus(
          data.message
        );

      }



    }

    catch(error){

      setStatus(
        "Something went wrong. Please try again."
      );

    }


    finally{

      setLoading(false);

    }

  }





  return (

    <form

      onSubmit={handleSubmit}

      className="
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.04]
        p-8
        backdrop-blur-xl
      "

    >



      <div
        className="
          grid
          gap-6
          md:grid-cols-2
        "
      >

        <input

          name="name"

          value={formData.name}

          onChange={handleChange}

          placeholder="Your Name"

          className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-5
            py-4
            text-white
            outline-none
            placeholder:text-white/40
            focus:border-blue-400/50
          "

        />



        <input

          name="email"

          value={formData.email}

          onChange={handleChange}

          type="email"

          placeholder="Email Address"

          className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-5
            py-4
            text-white
            outline-none
            placeholder:text-white/40
            focus:border-blue-400/50
          "

        />


      </div>





      <div
        className="
          mt-6
          grid
          gap-6
          md:grid-cols-2
        "
      >


        <select
  name="country"
  value={formData.country}
  onChange={handleChange}
  className="
    rounded-xl
    border
    border-white/10
    bg-black/40
    px-5
    py-4
    text-white
    outline-none
    focus:border-blue-400/50
  "
>

  <option 
    value=""
    className="bg-black text-white"
  >
    Select Country
  </option>

  <option 
    value="United Kingdom"
    className="bg-black text-white"
  >
    United Kingdom
  </option>

  <option 
    value="United States"
    className="bg-black text-white"
  >
    United States
  </option>

  <option 
    value="Canada"
    className="bg-black text-white"
  >
    Canada
  </option>

  <option 
    value="Australia"
    className="bg-black text-white"
  >
    Australia
  </option>

  <option 
    value="Pakistan"
    className="bg-black text-white"
  >
    Pakistan
  </option>

  <option 
    value="Other"
    className="bg-black text-white"
  >
    Other
  </option>

</select>


        <input

          name="projectType"

          value={
            formData.projectType
          }

          onChange={handleChange}

          placeholder="Project Type"

          className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-5
            py-4
            text-white
            outline-none
            placeholder:text-white/40
            focus:border-blue-400/50
          "

        />


      </div>





      <textarea

        name="message"

        value={
          formData.message
        }

        onChange={handleChange}

        rows={6}

        placeholder="Tell me about your project..."

        className="
          mt-6
          w-full
          rounded-xl
          border
          border-white/10
          bg-white/5
          px-5
          py-4
          text-white
          outline-none
          placeholder:text-white/40
          focus:border-blue-400/50
        "

      />





      <button

        disabled={loading}

        className="
          mt-8
          flex
          items-center
          gap-3
          rounded-xl
          bg-white
          px-7
          py-4
          text-sm
          font-medium
          text-black
          transition
          hover:-translate-y-1
          disabled:opacity-50
        "

      >

        {loading
          ? "Sending..."
          : "Send Inquiry"
        }


        {!loading && (
          <ArrowRight size={18}/>
        )}

      </button>





      {status && (

        <p
          className="
            mt-5
            text-sm
            text-blue-300
          "
        >

          {status}

        </p>

      )}



    </form>

  );

}