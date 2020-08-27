import React from "react";

export interface LightProps {
  brightness: number;
  color: string;
}

export function Light(props: LightProps) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={props.color}
      intensity={props.brightness}
      position={[-2, 0, 5]}
      castShadow
    />
  );
}
