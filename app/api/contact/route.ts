import { NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(
  process.env.RESEND_API_KEY || ""
);



export async function POST(
  request: Request
) {

  try {


    const body =
      await request.json();



    const {
      name,
      email,
      country,
      projectType,
      message,
    } = body;




    if (
      !name ||
      !email ||
      !country ||
      !projectType ||
      !message
    ) {

      return NextResponse.json(
        {
          success:false,
          message:
          "Please complete all fields.",
        },
        {
          status:400,
        }
      );

    }





    await resend.emails.send({

      from:
      "Portfolio Contact <onboarding@resend.dev>",


      to:
      process.env.CONTACT_EMAIL as string,


      subject:
      `New Portfolio Inquiry from ${name}`,


      html:
      `
      <div
        style="
          font-family:Arial,sans-serif;
          line-height:1.6;
        "
      >

        <h2>
          New Project Inquiry
        </h2>


        <p>
          <strong>Name:</strong>
          ${name}
        </p>


        <p>
          <strong>Email:</strong>
          ${email}
        </p>


        <p>
          <strong>Country:</strong>
          ${country}
        </p>


        <p>
          <strong>Project Type:</strong>
          ${projectType}
        </p>


        <p>
          <strong>Message:</strong>
        </p>


        <p>
          ${message}
        </p>


      </div>
      `,

    });





    return NextResponse.json(
      {
        success:true,
        message:
        "Message sent successfully.",
      },
      {
        status:200,
      }
    );



  }

  catch(error) {


    console.error(error);



    return NextResponse.json(
      {
        success:false,
        message:
        "Failed to send message.",
      },
      {
        status:500,
      }
    );


  }

}