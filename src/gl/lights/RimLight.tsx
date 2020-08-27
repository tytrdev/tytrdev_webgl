import React from 'react';

export interface RimLightProps {
  brightness: number;
  color: string;
}

export function RimLight(props: RimLightProps) {
  return (
    <rectAreaLight
      width={2}
      height={2}
      intensity={props.brightness}
      color={props.color}
      position={[1, 4, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
}
