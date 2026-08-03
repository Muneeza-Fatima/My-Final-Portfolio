import { NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(
  process.env.RESEND_API_KEY
);



export async function GET() {

  return NextResponse.json(
    {
      message: "Contact API is working",
    },
    {
      status: 200,
    }
  );

}



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
          message:"Please complete all fields.",
        },
        {
          status:400,
        }
      );

    }



    if (!process.env.RESEND_API_KEY) {

      return NextResponse.json(
        {
          success:false,
          message:"RESEND_API_KEY missing.",
        },
        {
          status:500,
        }
      );

    }



    if (!process.env.CONTACT_EMAIL) {

      return NextResponse.json(
        {
          success:false,
          message:"CONTACT_EMAIL missing.",
        },
        {
          status:500,
        }
      );

    }




    const { error } =
      await resend.emails.send({

        from:
        "Portfolio Contact <onboarding@resend.dev>",


        to:
        process.env.CONTACT_EMAIL,


        replyTo:
        email,


        subject:
        `New Portfolio Inquiry from ${name}`,



        html:
        `
        <div>

          <h2>
          New Portfolio Inquiry
          </h2>

          <p>
          <b>Name:</b> ${name}
          </p>

          <p>
          <b>Email:</b> ${email}
          </p>

          <p>
          <b>Country:</b> ${country}
          </p>

          <p>
          <b>Project Type:</b> ${projectType}
          </p>

          <p>
          <b>Message:</b> ${message}
          </p>

        </div>
        `,

      });



    if (error) {

      return NextResponse.json(
        {
          success:false,
          message:error.message,
        },
        {
          status:500,
        }
      );

    }



    return NextResponse.json(
      {
        success:true,
        message:"Message sent successfully.",
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
        message:"Internal server error.",
      },
      {
        status:500,
      }
    );


  }

}