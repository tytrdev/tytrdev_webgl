import React from 'react';

export interface KeyLightProps {
  brightness: number;
  color: string;
}

export function KeyLight(props: KeyLightProps) {
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
