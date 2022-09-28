
    window.onload = function(){

    let input = document.getElementById("thenumber");
    let p = document.getElementById("circle");
    
    //function that gets the area of a circle
    function getArea(){
        var radius = input.value;
        var area = Math.PI * radius * radius;
        return area;
    }
    
    //automatically displays the area of the circle
    function displayArea(){
        p.innerHTML = getArea();
    }

    displayArea();

    //function that runs every second
    function runEverySecond(){
        displayArea();
        setTimeout(runEverySecond, 10);
    }
    runEverySecond();
}

