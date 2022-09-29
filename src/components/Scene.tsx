import * as THREE from "three";
import { Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { softShadows, Text3D, Html } from "@react-three/drei";

softShadows();

function Intro({ start, set }) {
  const [vec] = useState(() => new THREE.Vector3());
  useEffect(() => setTimeout(() => set(true), 500), []);
  return useFrame((state) => {
    if (start) {
      state.camera.position.lerp(
        vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14),
        0.05
      );
      state.camera.lookAt(0, 0, 0);
    }
  });
}

export function Scene() {
  const [clicked, setClicked] = useState(true);
  const [ready, setReady] = useState(true);

  return (
    <Suspense fallback={null}>
      <Canvas
        shadows
        camera={{
          // position: [-5, 2, 10],
          fov: 60,
        }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={["white", 0, 40]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <Text3D
          font="/PPMonumentExtended_Bold.json"
          receiveShadow
          castShadow
          size={4}
          height={1}
          position={[0, -5, 0]}
          rotation={[0, 0.1, 0]}
        >
          vxn
          <meshStandardMaterial />
        </Text3D>
        <group position={[0, -5, 0]}>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            {/* <meshBasicMaterial /> */}
            <shadowMaterial attach="material" color="red" opacity={0.4} />
          </mesh>
        </group>
        <Html
          style={{
            fontFamily: "Neue Montreal",
            fontSize: 24,
            lineHeight: 1.6,
            width: 480,
            transform: "translate(-120%, -50%)",
          }}
        >
          Hello, I am{" "}
          <span style={{ fontFamily: "Cirka", fontSize: 27 }}>VANCE TAN</span>{" "}
          from Singapore. <br />
          <br />I am a{" "}
          <span style={{ fontFamily: "Cirka", fontSize: 27 }}>
            SOFTWARE ENGINEER
          </span>{" "}
          and{" "}
          <span style={{ fontFamily: "Cirka", fontSize: 27 }}>DESIGNER</span>{" "}
          passionate about building beautiful experiences on the web. Outside of
          work, I am a hobbyist language learner who built{" "}
          <a
            href=""
            style={{
              fontFamily: "Cirka",
              fontSize: 27,
              textDecoration: "underline",
              color: "black",
            }}
          >
            KRUVT
          </a>
          , a tool for fellow Thai language learners to practise reading drills,
          and also an{" "}
          <a
            href=""
            style={{
              fontFamily: "Cirka",
              fontSize: 27,
              textDecoration: "underline",
              color: "black",
            }}
          >
            AMATEUR PHOTOGRAPHER
          </a>
          .
        </Html>
        <Intro start={ready && clicked} set={setReady} />
      </Canvas>
    </Suspense>
  );
}
