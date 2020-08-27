import React from 'react';

export interface FillLightProps {
  brightness: number;
  color: string;
}

export function FillLight(props: FillLightProps) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      intensity={props.brightness}
      color={props.color}
      position={[2, 1, 4]}
      castShadow
    />
  );
}
