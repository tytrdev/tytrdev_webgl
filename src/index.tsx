import ReactDOM from "react-dom";
import React, { useState } from "react";
import { Editor } from "./editor";
import { Renderer } from "./renderer";
import "./index.css";

const vertexShaderCode = `
varying vec2 vUv;

void main()	{

vUv = uv;

gl_Position = vec4( position, 1.0 );

}
`;

const fragmentShaderCode = `
uniform float time;

varying vec2 vUv;

void main( void ) {

  vec2 position = - 1.0 + 2.0 * vUv;

  float red = abs( sin( position.x * position.y + time / 5.0 ) );
  float green = abs( sin( position.x * position.y + time / 4.0 ) );
  float blue = abs( sin( position.x * position.y + time / 3.0 ) );
  gl_FragColor = vec4( red, green, blue, 1.0 );

}
`;

const Main = () => {
  const [vertexShader, setVertexShader] = useState(vertexShaderCode);
  const [fragmentShader, setFragmentShader] = useState(fragmentShaderCode);

  return (
    <div id="app">
      <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
        <Editor
          title={"Vertex Shader"}
          code={vertexShader}
          setter={setVertexShader}
        />
        <Editor
          title={"Fragment Shader"}
          code={fragmentShader}
          setter={setFragmentShader}
        />
      </div>

      <Renderer vert={vertexShader} frag={fragmentShader} />
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
