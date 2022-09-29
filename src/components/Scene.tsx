import { Vector3 } from "three";
import { Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  softShadows,
  Text3D,
  Html,
  MeshReflectorMaterial,
} from "@react-three/drei";

softShadows();

function Intro() {
  const { invalidate } = useThree();
  const [vec] = useState(() => new Vector3());
  return useFrame((state) => {
    // invalidate();
    state.camera.position.lerp(
      vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}

export function Scene() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Suspense fallback={null}>
      <Canvas
        shadows={theme === "light" ? true : false}
        camera={{
          // position: [-5, 2, 10],
          fov: 60,
        }}
        dpr={[1, 2]}
        // frameloop="demand"
      >
        {theme === "light" ? (
          <fog attach="fog" args={["white", 0, 40]} />
        ) : (
          <>
            <color attach="background" args={["#191920"]} />
            <fog attach="fog" args={["#191920", 0, 40]} />
          </>
        )}
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
            {theme === "light" ? (
              <shadowMaterial attach="material" color="red" opacity={0.4} />
            ) : (
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
              />
            )}
          </mesh>
        </group>
        <Html
          style={{
            fontFamily: "Neue Montreal",
            fontSize: 24,
            lineHeight: 1.6,
            width: 480,
            transform: "translate(-120%, -50%)",
            color: "var(--color-neutral-02)",
          }}
        >
          <button
            style={{ display: "block" }}
            onClick={() => {
              if (theme === "light") {
                setTheme("dark");
              } else {
                setTheme("light");
              }
            }}
          >
            Toggle
          </button>
          Hello, I am{" "}
          <span style={{ fontFamily: "Cirka", fontSize: 27 }}>
            VANCE TAN // VXN
          </span>{" "}
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
              color: "var(--color-neutral-02)",
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
              color: "var(--color-neutral-02)",
            }}
          >
            AMATEUR PHOTOGRAPHER
          </a>
          .
        </Html>
        <Intro />
      </Canvas>
    </Suspense>
  );
}
