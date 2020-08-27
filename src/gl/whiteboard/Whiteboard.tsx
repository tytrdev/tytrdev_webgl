import * as Three from "three";
import { DynamicTexture } from "./DynamicTexture";
import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";

export interface WhiteboardProps {
  position: Three.Vector3;
}

export function Whiteboard(props: WhiteboardProps) {
  const mesh = useRef();

  const dynamicTexture = new DynamicTexture(512, 512);

  useFrame(state => {
    const raycaster = new Three.Raycaster();
    raycaster.setFromCamera(state.mouse, state.camera);

    const intersections = raycaster.intersectObjects(state.scene.children);

    console.log("Intersects? ", intersections.length);

    for (let intersection of intersections) {
      console.log(intersection);

      console.log(mesh);
      // @ts-ignore
      if (intersection.object.uuid === mesh.current.uuid) {
        console.log("Got it!");

        // @ts-ignore
        raycastIntersected(intersection, mesh.current, dynamicTexture);
      }
    }
  });

  return (
    <mesh position={props.position} ref={mesh} scale={[1, 1, 1]}>
      <planeGeometry attach="geometry" args={[5.0, 2.5, 1.5]} />
      <meshStandardMaterial attach="material" map={dynamicTexture.texture} />
    </mesh>
  );
}

function raycastIntersected(intersection: any, mesh: Three.Mesh<Three.Geometry>, dynamicTexture: DynamicTexture) {
  const localIntersect = mesh.worldToLocal(intersection.point);
  const face = intersection.face;
  const faceIndex = intersection.faceIndex;

  // Convert from local coordinate to Barycentric coordinates
  let coordinates = new Three.Vector3();
  Three.Triangle.getBarycoord(
    localIntersect,
    mesh.geometry.vertices[face.a],
    mesh.geometry.vertices[face.b],
    mesh.geometry.vertices[face.c],
    coordinates
  );

  // Work out the relevant texture coordinates
  // TODO: This probably belongs on the DynamicTexture class
  var uv = new Three.Vector2();
  uv.x += coordinates.x * mesh.geometry.faceVertexUvs[0][faceIndex][0].x;
  uv.y += coordinates.x * mesh.geometry.faceVertexUvs[0][faceIndex][0].y;
  uv.x += coordinates.y * mesh.geometry.faceVertexUvs[0][faceIndex][1].x;
  uv.y += coordinates.y * mesh.geometry.faceVertexUvs[0][faceIndex][1].y;
  uv.x += coordinates.z * mesh.geometry.faceVertexUvs[0][faceIndex][2].x;
  uv.y += coordinates.z * mesh.geometry.faceVertexUvs[0][faceIndex][2].y;

  // Now take the texture coordinates, and work out the canvas coordinates
  const canvas = dynamicTexture.canvas;
  const context = dynamicTexture.context;
  const x = uv.x * canvas.width;
  const y = (1 - uv.y) * canvas.height;

  // Draw!
  // TODO: Probably belongs on the dynamic texture class?
  context.beginPath();
  context.rect(x - 4, y - 4, 8, 8);
  context.fillStyle = "#175ac6";
  context.fill();

  dynamicTexture.texture.needsUpdate = true;
}
