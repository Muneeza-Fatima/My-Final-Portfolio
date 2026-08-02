"use client";


import {
  Canvas,
} from "@react-three/fiber";


import {
  Float,
} from "@react-three/drei";


import {
  Suspense,
} from "react";



function Model() {

  return (

    <mesh>

      <icosahedronGeometry
        args={[
          1.4,
          1,
        ]}
      />


      <meshStandardMaterial

        color="#8b5cf6"

        metalness={0.5}

        roughness={0.35}

      />

    </mesh>

  );

}



function Scene() {

  return (

    <>

      <ambientLight intensity={1.2}/>


      <directionalLight
        position={[3,3,3]}
        intensity={2}
      />


      <Float

        speed={1}

        rotationIntensity={0.25}

        floatIntensity={0.4}

      >

        <Model/>

      </Float>


    </>

  );

}



export function HeroModel() {


  return (

    <div

      className="
      h-[300px]
      w-[300px]
      sm:h-[360px]
      sm:w-[360px]
      lg:h-[420px]
      lg:w-[420px]
      "

    >

      <Canvas

        dpr={[0.7,1]}

        camera={{

          position:[
            0,
            0,
            5
          ],

          fov:45,

        }}


        gl={{

          antialias:false,

          powerPreference:
          "high-performance",

        }}


        frameloop="always"

      >

        <Suspense fallback={null}>

          <Scene/>

        </Suspense>


      </Canvas>


    </div>

  );

}