import { useState as _useState, Dispatch, SetStateAction } from 'react';

export interface StateCell<S> {
  key: string;
  getter: S | (() => S);
  setter: Dispatch<SetStateAction<S>>; 
}

const state: Map<string, StateCell<any>> = new Map(); 

export function useState<A>(key: string, value: A) {
  const [getter, setter] = _useState(value);
  const cell: StateCell<A> = {
    key,
    getter,
    setter,
  };

  state.set(key, cell); 
}
