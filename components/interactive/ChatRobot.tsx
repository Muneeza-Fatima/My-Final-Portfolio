"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MessageCircle } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import type { Group, Mesh, MeshBasicMaterial } from "three";
import { ExtrudeGeometry, MathUtils, Shape } from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

type RobotState = {
  // The assistant is writing an answer: eyes and antenna pulse.
  busy: boolean;
  // The chat is open: eyes narrow into a friendly squint.
  open: boolean;
  // Greeting the visitor: the head tilts side to side.
  waving?: boolean;
  reduceMotion: boolean;
};

// A thin panel with rounded corners on its face (used for the visor).
function roundedPanel(width: number, height: number, depth: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  const geometry = new ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 3, curveSegments: 12 });
  geometry.center();
  return geometry;
}

const EYE = "#c9bcff";
const ACCENT = "#6d5bd0";

// Where the pointer is, relative to the robot, in -1..1 on each axis.
function usePointerTarget(reduceMotion: boolean) {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (event: PointerEvent) => {
      // The robot sits in the bottom-right corner, so measure from there.
      const originX = window.innerWidth - 60;
      const originY = window.innerHeight - 60;
      target.current.x = MathUtils.clamp((event.clientX - originX) / (window.innerWidth * 0.6), -1, 1);
      target.current.y = MathUtils.clamp((event.clientY - originY) / (window.innerHeight * 0.6), -1, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);
  return target;
}

function Robot({ busy, open, waving = false, reduceMotion }: RobotState) {
  const root = useRef<Group>(null);
  const head = useRef<Group>(null);
  const leftEye = useRef<Mesh>(null);
  const rightEye = useRef<Mesh>(null);
  const bulb = useRef<Mesh>(null);
  const nextBlink = useRef(2.5);
  const pointer = usePointerTarget(reduceMotion);
  // Rounded boxes built once (three.js addon, no extra helper library).
  const shapes = useMemo(
    () => ({
      head: new RoundedBoxGeometry(1.5, 1.18, 1.1, 6, 0.34),
      visor: roundedPanel(1.16, 0.7, 0.06, 0.2),
      body: new RoundedBoxGeometry(0.95, 0.5, 0.75, 6, 0.22),
    }),
    [],
  );
  useEffect(() => () => Object.values(shapes).forEach((shape) => shape.dispose()), [shapes]);

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;

    // Gentle idle float.
    if (root.current && !reduceMotion) {
      root.current.position.y = Math.sin(time * 1.6) * 0.07;
      root.current.rotation.z = Math.sin(time * 0.9) * 0.03;
    }

    // Turn the head toward the pointer.
    if (head.current) {
      const turnY = reduceMotion ? -0.25 : pointer.current.x * 0.65;
      const turnX = reduceMotion ? 0.08 : pointer.current.y * 0.4;
      head.current.rotation.y = MathUtils.damp(head.current.rotation.y, turnY, 6, delta);
      head.current.rotation.x = MathUtils.damp(head.current.rotation.x, turnX, 6, delta);
      const tilt = waving && !reduceMotion ? Math.sin(time * 6) * 0.22 : 0;
      head.current.rotation.z = MathUtils.damp(head.current.rotation.z, tilt, 8, delta);
    }

    // Blink every few seconds; squint while the chat is open.
    let eyeScale = open ? 0.62 : 1;
    if (!reduceMotion) {
      if (time > nextBlink.current) nextBlink.current = time + 2.5 + Math.random() * 3;
      const sinceBlink = nextBlink.current - time;
      if (sinceBlink > 2.35 && sinceBlink < 2.5) eyeScale = 0.1;
    }
    for (const eye of [leftEye.current, rightEye.current]) {
      if (!eye) continue;
      eye.scale.y = MathUtils.damp(eye.scale.y, eyeScale, 18, delta);
      const material = eye.material as MeshBasicMaterial;
      material.opacity = busy && !reduceMotion ? 0.55 + 0.45 * Math.abs(Math.sin(time * 5)) : 1;
    }

    // Antenna bulb glows brighter (and pulses while answering).
    if (bulb.current) {
      const pulse = (busy || waving) && !reduceMotion ? 1 + 0.25 * Math.sin(time * 8) : 1;
      bulb.current.scale.setScalar(MathUtils.damp(bulb.current.scale.x, pulse, 10, delta));
    }
  });

  return (
    <group ref={root}>
      <group ref={head} position={[0, 0.25, 0]}>
        {/* Head */}
        <mesh geometry={shapes.head}>
          <meshStandardMaterial color="#ece8ff" roughness={0.35} metalness={0.1} />
        </mesh>

        {/* Visor */}
        <mesh geometry={shapes.visor} position={[0, -0.02, 0.53]}>
          <meshStandardMaterial color="#14121d" roughness={0.18} metalness={0.4} />
        </mesh>

        {/* Eyes */}
        <mesh ref={leftEye} position={[-0.27, 0, 0.6]}>
          <capsuleGeometry args={[0.085, 0.16, 8, 16]} />
          <meshBasicMaterial color={EYE} toneMapped={false} transparent />
        </mesh>
        <mesh ref={rightEye} position={[0.27, 0, 0.6]}>
          <capsuleGeometry args={[0.085, 0.16, 8, 16]} />
          <meshBasicMaterial color={EYE} toneMapped={false} transparent />
        </mesh>

        {/* Ears */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.14, 24]} />
            <meshStandardMaterial color={ACCENT} roughness={0.4} />
          </mesh>
        ))}

        {/* Antenna */}
        <mesh position={[0, 0.74, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.3, 12]} />
          <meshStandardMaterial color="#b9b3d6" roughness={0.4} />
        </mesh>
        <mesh ref={bulb} position={[0, 0.94, 0]}>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshBasicMaterial color={EYE} toneMapped={false} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, -0.41, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.24, 20]} />
        <meshStandardMaterial color="#b9b3d6" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Body */}
      <mesh geometry={shapes.body} position={[0, -0.75, 0]}>
        <meshStandardMaterial color={ACCENT} roughness={0.45} metalness={0.15} />
      </mesh>
    </group>
  );
}

// Small 3D robot used as the chat launcher. Renders the plain chat icon when
// WebGL isn't available.
export default function ChatRobot(props: RobotState) {
  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.75]}
      frameloop={props.reduceMotion ? "demand" : "always"}
      camera={{ position: [0, 0, 4.6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
      fallback={<MessageCircle size={22} className="m-auto" />}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[2.5, 3, 4]} intensity={1.6} />
      <pointLight position={[-3, -1, 2]} color="#b69cff" intensity={6} distance={10} />
      <Robot {...props} />
    </Canvas>
  );
}
