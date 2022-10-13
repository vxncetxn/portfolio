import ReactDOM from "react-dom";
import * as THREE from "three";
import React, { useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import {
  softShadows,
  Text3D,
  MeshReflectorMaterial,
  // BakeShadows,
} from "@react-three/drei";
import { useSelector } from "@legendapp/state/react";
import type { ObservablePrimitive } from "@legendapp/state";
import { linInterpolate } from "../lib/linear-interpolate";

extend(THREE);
softShadows();

interface SceneProps {
  theme: ObservablePrimitive<string>;
  color: ObservablePrimitive<string>;
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.pointer.x * 2, -1 + state.pointer.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}

export function Scene({ theme, color }: SceneProps) {
  const selectedTheme = useSelector(() => theme.get());
  const selectedColor = useSelector(() => color.get());
  const { size } = useThree();

  return (
    <>
      {selectedTheme === "light" ? (
        <fog attach="fog" args={["white", 0, 40]} />
      ) : (
        <fog attach="fog" args={["#1c1c1c", 0, 30]} />
      )}
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow={selectedTheme === "light"}
        position={[12, 8, 14]}
        intensity={2.2}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-far={70}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight
        position={[-10, 0, -20]}
        color={selectedColor}
        intensity={2.0}
      />
      <Text3D
        font="/fonts/PPMonumentExtended_Bold_reduced.json"
        receiveShadow={selectedTheme === "light"}
        castShadow={selectedTheme === "light"}
        size={linInterpolate(320, 1536, 1.6, 4.2, size.width)}
        height={1}
        position={[linInterpolate(320, 1536, -3.5, -0.75, size.width), -5, 0]}
        rotation={[0, 0.1, 0]}
      >
        vxn
        <meshLambertMaterial />
      </Text3D>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5, 0]}
        receiveShadow={selectedTheme === "light"}
      >
        <planeBufferGeometry attach="geometry" args={[50, 50]} />
        {selectedTheme === "light" ? (
          <shadowMaterial
            attach="material"
            color={selectedColor}
            opacity={0.4}
          />
        ) : (
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
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
      {/* <BakeShadows /> */}
      <Intro />
    </>
  );
}
