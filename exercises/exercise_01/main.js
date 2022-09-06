
function main(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    if(!canvas){
        console.log("Failed to retrieve the <canvas> element");
        return;
    }

    ctx.fillStyle = "rgba(0, 0, 255, 1.0)";
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.fill();
}