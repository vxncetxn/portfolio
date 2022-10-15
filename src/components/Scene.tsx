import * as THREE from "three";
import React from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import {
  softShadows,
  Text3D,
  MeshReflectorMaterial,
  // BakeShadows,
} from "@react-three/drei";
import { linInterpolate } from "../lib/linear-interpolate";
import { useStore } from "@nanostores/react";

extend(THREE);
softShadows();

function Intro() {
  const { invalidate } = useThree();
  const [vec] = React.useState(() => new THREE.Vector3());
  return useFrame((state) => {
    if (state.camera.position.manhattanDistanceTo(vec) > 0.3) {
      invalidate();
    }
    state.camera.position.lerp(
      vec.set(state.pointer.x * 2, -1 + state.pointer.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Layer({ theme, color }) {
  const { size } = useThree();
  const $theme = useStore(theme);
  const $color = useStore(color);

  return (
    <>
      {$theme === "light" ? (
        <fog attach="fog" args={["white", 0, 40]} />
      ) : (
        <fog attach="fog" args={["#1c1c1c", 0, 30]} />
      )}
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow={$theme === "light"}
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
      <pointLight position={[-10, 0, -20]} color={$color} intensity={2.0} />
      <Text3D
        font="/fonts/PPMonumentExtended_Bold_reduced.json"
        receiveShadow={$theme === "light"}
        castShadow={$theme === "light"}
        size={linInterpolate(320, 1536, 1.9, 4.2, size.width)}
        height={1}
        position={[linInterpolate(320, 1536, -3.5, -0.75, size.width), -5.5, 0]}
        rotation={[0, 0.1, 0]}
      >
        vxn
        <meshLambertMaterial />
      </Text3D>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5.5, 0]}
        receiveShadow={$theme === "light"}
      >
        <planeBufferGeometry attach="geometry" args={[50, 50]} />
        {$theme === "light" ? (
          <shadowMaterial attach="material" color={$color} opacity={0.4} />
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

export function Scene({ theme, color }) {
  return (
    <>
      <Layer theme={theme} color={color} />
    </>
  );
}
