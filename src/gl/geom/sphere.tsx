import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

export interface SphereProps {
  position: Vector3;
}

export function Sphere(props: SphereProps) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const uniforms = useRef({ time: { value: 10 } });

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(state => {
    const temp = Math.sin(state.clock.getElapsedTime()) * 3;

    if (mesh.current) {
      // @ts-ignore
      mesh.current.position.setY(temp);
    }
  });

  const vertexShader = document.getElementById("vertexShader")?.textContent;
  const fragmentShader = document.getElementById("fragmentShader")?.textContent;

  const shaderMatParams = {
    uniforms: uniforms,
    vertexShader: vertexShader!,
    fragmentShader: fragmentShader!
  };

  return (
    <mesh
      position={props.position}
      castShadow
      userData={{ test: "hello" }}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />

      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
        transparent
        roughness={0.1}
        metalness={0.1}
      />

    </mesh>
  );
}
