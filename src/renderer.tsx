import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { KeyLight } from "./gl/lights/KeyLight";
import { BackDrop } from "./gl/geom/BackDrop";
import { FillLight } from "./gl/lights/FillLight";
import { RimLight } from "./gl/lights/RimLight";

import { MapControls } from "drei";

import { ShaderMaterialParameters } from "three";

export interface RendererProps {
  vert: string;
  frag: string;
}

export function Renderer(props: RendererProps) {
  console.log("Renderer props: ", props);

  const shaderMaterialParams = {
    uniforms: {
      time: { value: 1.0 }
    },
    vertexShader: props.vert,
    fragmentShader: props.frag
  };

  return (
    <Canvas camera={{ fov: 90, position: [0, 0, 5] }}>
      <BackDrop />
      <KeyLight brightness={5.6} color="#ffbdf4" />
      <FillLight brightness={2.6} color="#bdefff" />
      <RimLight brightness={54} color="#fff" />

      <TestSphere shaderMaterialParams={shaderMaterialParams} />

      <MapControls />
    </Canvas>
  );
}

interface TestSphereProps {
  shaderMaterialParams: ShaderMaterialParameters;
}

function TestSphere(props: TestSphereProps) {
  const startingUniforms = props.shaderMaterialParams.uniforms || {};

  const mesh = useRef();
  const [uniforms, setUniforms] = useState(startingUniforms);

  useFrame(state => {
    const delta = state.clock.getDelta();

    // @ts-ignore
    mesh.current.material.uniforms.time += delta * 5;
    // @ts-ignore
    mesh.current.rotation.y += delta * 0.5; 
    // @ts-ignore
		mesh.current.rotation.x += delta * 0.5;

    // @ts-ignore
    mesh.current.material.uniformsNeedUpdate = true;
  });

  return (
    <mesh ref={mesh} castShadow userData={{ test: "hello" }} scale={[1, 1, 1]}>
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />

      <shaderMaterial
        uniforms={uniforms}
        attach="material"
        vertexShader={props.shaderMaterialParams.vertexShader}
        fragmentShader={props.shaderMaterialParams.fragmentShader}
      />
    </mesh>
  );
}
