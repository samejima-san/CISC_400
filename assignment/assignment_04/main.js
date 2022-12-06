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
  let otherverts = new Float32Array([]);
 

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

  let points = circleXY([0.0,0.0,0.0], 0.3, 200);
  let otherpoints = []
  //otherpoints is a list of 200 points at random locations
  for (let i = 0; i < 200; i++) {
    let point = []
    point.push(2.0);
    point.push(2.0);
    if(i== 5%200) point.push(5.0)
    else point.push(1.0)
    let temp = new Float32Array(point);
    otherpoints.push(temp);
  }
  //-1, 1, -1, 1

  //convert ye to a float32 array
  vertices = new Float32Array(points);

  gl.vertexAttrib1f(a_Size, 10.0);
  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
    


  //zone creation
  let zone = () =>{
  var len = vertices.length;
  for(var i = 0; i < len; i+=2) {
    // Pass vertex position to attribute variable
    gl.vertexAttrib3f(a_Position, vertices[i], vertices[i+1], 0.0);
    gl.vertexAttrib1f(a_Size, 10.0)
    // Draw 
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
zone()

  //kanye creation
  let createKanye = () => {
      var len = otherpoints.length;
      let sizechange = 0;
      for(var i = 0; i < len; i++) {
        // Pass vertex position to attribute variable
        if(otherpoints[i][2]===5.0) sizechange = 25.0
        else sizechange = 15.0
        gl.vertexAttrib1f(a_Size, sizechange);
        gl.vertexAttrib3f(a_Position, otherpoints[i][0], otherpoints[i][1], 0.0);
        // Draw
        gl.drawArrays(gl.POINTS, 0, 1);
      }
  }
  createKanye() 
  
  //player
  let player = {
    points: 0,
    lives: 3
  }

  let stack = new Stack();
  let queue = new Queue();
  let playerpoints = document.getElementById("points");
  let playerlives = document.getElementById("lives");
  let startbutton = document.getElementById("start");
  let gameover = false;
  //push all otherpoints onto the stack
  for(let i = 0; i<otherpoints.length;i++){
    stack.push(otherpoints[i]);
  }

  let speedofye = 0.005;
  var tick = function(){
    if(gameover){
      for(let i = 0; i<otherpoints.length;i++){
        if(otherpoints[i][0] >1.0 && otherpoints[i][1]>1.0) continue;
        else goToCenter(otherpoints[i], speedofye); 
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      zone()
      createKanye()
      playerpoints.innerText = 'Points: ' + player.points;
      playerlives.innerText = 'Lives: ' + player.lives;
      gl.drawArrays(gl.POINTS, 0, 1);
    }
    requestAnimationFrame(tick, canvas); // Request that the browser calls tick
  }
  tick()
//each second this function repeats once 
let i = 0;
let speedofspawn = 1000;
let sqpicker = true;
setInterval(function(){
  if(gameover){
    if(!stack.isEmpty() && sqpicker){ 
      let temp = stack.pop();
      spawnLocation(temp);
      queue.enqueue(temp);
      if(stack.isEmpty()) sqpicker = false;
    }
    else{
      let temp = queue.dequeue();
      spawnLocation(temp);
      queue.enqueue(temp);
      if(queue.isEmpty()) sqpicker = true;
    }
      //check if any point is in the zone
      for(let i = 0; i<otherpoints.length;i++){
        checkZone(otherpoints[i], player);
      }
      i++;
      //increase speed of spawn gradually as time goes on
      if(i%10 === 0){
        speedofspawn = speedofspawn - 50;
        speedofye = speedofye + 0.001;
      }
  }
  if(player.lives === 0){ //game over i guess :)
    gameover = false;
    playerlives.innerText = 'Lives: ' + player.lives;
    startbutton.innerText = 'Restart';
    clearInterval(this);
  }
  }, speedofspawn);

  //this is a click listener for the otherpoints
  canvas.addEventListener('click', function(ev) {
    let x = ev.clientX;
    let y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
    let range = 0.1;
    for(let i = 0; i<otherpoints.length;i++){
      //x and y are within the range of the point
      if(otherpoints[i][0] < x+range && otherpoints[i][0] > x-range && otherpoints[i][1] < y+range && otherpoints[i][1] > y-range){
        if(otherpoints[i][2]===5.0){
          player.points += 5;
          otherpoints[i][0] = 2.0;
          otherpoints[i][1] = 2.0;
        }
        else{
          player.points += 1;
          otherpoints[i][0] = 2.0;
          otherpoints[i][1] = 2.0;
        }
      }
    }
  });

  startbutton.addEventListener('click', function(ev) {
    if(gameover === false) gameover = true;
    else document.location.reload();
  });
}



let goToCenter = (point, speed) => {
  //if point[0] is greater than 0.0 then subtract 0.01 from point[0]
  //if point[1] is greater than 0.0 then subtract 0.01 from point[1]
  //if point[0] is less than 0.0 then add 0.01 to point[0]
  //if point[1] is less than 0.0 then add 0.01 to point[1]
  if(point[0] > 0.0) point[0] -= speed;
  if(point[1] > 0.0) point[1] -= speed;
  if(point[0] < 0.0) point[0] += speed;
  if(point[1] < 0.0) point[1] += speed;
  return;
}

let spawnLocation = (point) => {
  let side = Math.floor(Math.random() * 4);
  //random number between 1 and -1
  let y = Math.random() * 2 - 1;
  switch (side) {
    case 0:
      point[0] = 1.0;
      point[1] = y;
      return
    case 1:
      point[0] = -1.0;
      point[1] = y;
      return
    case 2:
      point[0] = y;
      point[1] = 1.0;
      return
    case 3:
      point[0] = y;
      point[1] = -1.0;
      return
  }
}

//collision detection function
let checkZone = (point, p) => {
  let stoppoint = 0.34;
  if(point[0] < stoppoint && point[0] > -stoppoint && point[1] < stoppoint && point[1] > -stoppoint){
    point[0] = 2.0;
    point[1] = 2.0;
    p.lives--;
  }
}

class Stack {
  constructor() {
      this.items = [];
  }
  push(element) {
      this.items.push(element);
  }
  pop() {
      if (this.items.length == 0) return "Underflow";
      return this.items.pop();
  }
  peek() {
      return this.items[this.items.length - 1];
  }
  isEmpty() {
      return this.items.length == 0;
  }
  printStack() {
      var str = "";
      for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
      return str;
  }
}

class Queue {
  constructor() {
      this.queue = [];
  }
  //add element to queue
  enqueue(element) {
      this.queue.push(element);
  }
  //remove element from queue
  dequeue() {
      if (this.isEmpty()) {
          return "Underflow";
      }
      return this.queue.shift();
  }
  //check if queue is empty
  isEmpty() {
      return this.queue.length == 0;
  }
  //print queue
  printQueue() {
      var str = "";
      for (var i = 0; i < this.queue.length; i++) {
          str += this.queue[i] + " ";
      }
      return str;
  }
}
