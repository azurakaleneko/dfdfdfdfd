video="";
status="";
objects=[];

function preload (){
    video= createVideo("miku.mp4");
    video.hide();

}

function setup(){
    canvas= createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Death";
            document.getElementById("number_of_objects").innerHTML="Void" +  objects.length;

            fill("#F1A5E5");
            percent= floor(objects[i].confidence * 100);
            text (objects[i].label + "" + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke("#A5F1D3");
            rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height );        
        }
    }
}

function start(){
   objectDetector=ml5.objectDetector("cocossd",modelLodaded);
   document.getElementById("status").innerHTML= "Estado: detectando kirby's";
}

function modelLodaded(){
    console.log("modelo kirby");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects=results;
}