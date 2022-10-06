// HelloPint2.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' + // attribute variable
  'attribute float a_Size;\n' +
  'uniform vec4 u_Translation;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position + u_Translation;\n' +
  '  gl_PointSize = a_Size;\n' +
  '}\n'; 

// Fragment shader program
var FSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  let a_Size = gl.getAttribLocation(gl.program, 'a_Size');
  if (a_Size < 0) {
    console.log('Failed to get the storage location of a_Size');
    return;
  }
  
  //gaining access to the variable u_Translation
  let u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
  if (u_Translation < 0) {
    console.log('Failed to get the storage');
    return;
  }

  let vertices = new Float32Array([]);
 

  let circleXY = ( center, radius, dots) => {
    stepSize = ((2*Math.PI)/dots);
    let points = [];
    for (let d = 0; d <= (2*Math.PI)-stepSize; d += stepSize) {
      //add the x and y coordinates into the Float32Array
      //reduce the float to 2 decimal places
      let num1 = ((Math.sin(d) * radius) + center[0]);
      let num2 = ((Math.cos(d) * radius) + center[1]);
      points.push(parseFloat(num1));
      points.push(parseFloat(num2));
    }
    return points;
  }

  let points = circleXY([0.0,0.0,0.0], 0.5, 100);
  var n = 50; // The number of vertices
  vertices = new Float32Array(points);
  console.log(vertices);


  
  gl.vertexAttrib1f(a_Size, 7.0);

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
    
  //translate the circle
  let Tx = 0.2;
  let Ty = 0.2;
  let Tz = 0.0;
  gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);
  
  var len = vertices.length;
  for(var i = 0; i < len; i+=2) {
    // Pass vertex position to attribute variable
    gl.vertexAttrib3f(a_Position, vertices[i], vertices[i+1], 0.0);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
  


}
