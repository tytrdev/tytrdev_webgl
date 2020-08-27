import ReactDOM from "react-dom";
import React from "react";
import { Canvas } from "react-three-fiber";
import { KeyLight } from "./gl/lights/KeyLight";
import { BackDrop } from "./gl/geom/BackDrop";
import { FillLight } from "./gl/lights/FillLight";
import { RimLight } from "./gl/lights/RimLight";

import { MapControls } from "drei";

import { Vector3 } from "three";
import { Whiteboard } from "./gl/whiteboard/Whiteboard";

import "./index.css";

const Main = () => {
  return (
    <Canvas
      orthographic
      camera={{ fov: 90, position: [0, 0, 5] }}
      style={{ width: "100%", height: "100%" }}
    >
      <BackDrop />
      <KeyLight brightness={5.6} color="#ffbdf4" />
      <FillLight brightness={2.6} color="#bdefff" />
      <RimLight brightness={54} color="#fff" />
      <Whiteboard position={new Vector3(0, 0, 0)} />

      <MapControls />
    </Canvas>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
