import React, { useState } from "react";
import _Editor from "react-simple-code-editor";
// @ts-ignore
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

export interface EditorProps {
  title: string;
  code: string;
  setter: (s: string) => void;
}

export function Editor(props: EditorProps) {
  console.log("Editor Props: ", props);

  return (
    <div>
      <h1>{props.title}</h1>

      <_Editor
        value={props.code}
        onValueChange={props.setter}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12
        }}
      />
    </div>
  );
}
