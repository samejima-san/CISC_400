// HelloTriangle.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
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

  // Write the positions of vertices to a vertex shader
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }


   // Create Matrix4 object for model transformation
 var modelMatrix = new Matrix4();

 // Calculate a model matrix
 let ANGLE = 0; // The rotation angle
 modelMatrix.setRotate(ANGLE, 0, 0, 1);  // Set rotation matrix
 // Pass the model matrix to the vertex shader
 var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
 if (!u_ModelMatrix) {
     console.log('Failed to get the storage location of u_xformMatrix');
     return;
 }
 gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the rectangle
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

  //arrow controls
document.onkeydown = function(e) {
  switch (e.keyCode) {
      case 37:
          //left
          console.log("left");
          ANGLE = rotateTriangle(90);
          modelMatrix.setRotate(ANGLE, 0, 0, 1); 
          gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
          break;
      case 38:
          //up
          console.log("up");
          ANGLE = rotateTriangle(0);
          modelMatrix.setRotate(ANGLE, 0, 0, 1); 
          gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
          break;
      case 39:
          //right
          console.log("right");
          ANGLE = rotateTriangle(270);
          modelMatrix.setRotate(ANGLE, 0, 0, 1); 
          gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
          break;
      case 40:
          //down
          console.log("down");
          ANGLE = rotateTriangle(180);
          modelMatrix.setRotate(ANGLE, 0, 0, 1); 
          gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
          break;
  }
}
}


function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    -.5,-0.5, 0.0,0.5, 0.5, -0.5,
  ]);
  var n = vertices.length/2; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  return n;
}


//rotate triangle
function rotateTriangle(angle) {
  return angle;
}
//add rotation controls


