// import React from "react";
import ReactDOM from "react-dom";
import { Vector3 } from "three";
import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  softShadows,
  Text3D,
  MeshReflectorMaterial,
  BakeShadows,
} from "@react-three/drei";
import { useSelector } from "@legendapp/state/react";

softShadows();

function Intro() {
  const [vec] = useState(() => new Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Component({ theme }) {
  const selectedTheme = useSelector(() => theme.get());

  return (
    <>
      {selectedTheme === "light" ? (
        <fog attach="fog" args={["white", 0, 40]} />
      ) : (
        <fog attach="fog" args={["#1c1c1c", 0, 40]} />
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
      <pointLight position={[-10, 0, -20]} color="red" intensity={2.0} />
      <Text3D
        font="/PPMonumentExtended_Bold_reduced.json"
        receiveShadow
        castShadow
        size={4}
        height={1}
        position={[0, -5, 0]}
        rotation={[0, 0.1, 0]}
      >
        vxn
        <meshLambertMaterial />
      </Text3D>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[50, 50]} />
        {selectedTheme === "light" ? (
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
            color="#1c1c1c"
            metalness={0.5}
            mirror={0}
          />
        )}
      </mesh>
      <BakeShadows />
      <Intro />
    </>
  );
}

export function Scene({ theme }) {
  return (
    <>
      <Component theme={theme} />
    </>
  );
}
