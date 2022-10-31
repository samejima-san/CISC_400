// HelloPint2.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' + // attribute variable
  'attribute float a_Size;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
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

  let points = circleXY([0.0,0.0,0.0], 0.1, 100);
  vertices = new Float32Array(points);


  gl.vertexAttrib1f(a_Size, 4.0);

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
    


  
  var len = vertices.length;
  let translationx = .02;
  //let translationy = .04;
  let x = 0.0;
  let y = 0.0;
    // Start drawing
    var tick = function() {

       x = x + translationx;
       if(x > 0.975 || x< -0.975) {
         translationx = translationx * -1;
       }

      //create a new circle
      console.log(x)
     // console.log(Math.cos(x))
      points = circleXY([x,Math.cos(x)-.975,0.0], 0.025, 100);
      vertices = new Float32Array(points);
      gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
      for(var i = 0; i < len; i+=2) {
        gl.vertexAttrib3f(a_Position, vertices[i], vertices[i+1], 0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
      }
      requestAnimationFrame(tick, canvas); // Request that the browser ?calls tick
     };
     tick();
}
