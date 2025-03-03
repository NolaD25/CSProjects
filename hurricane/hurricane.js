
function setup(){
    createCanvas(400,400);
    
}


function draw(){
    background(0);
    stroke(255);
    fill(255);
    text(storm_data[0].i_d,200,200);
    text(storm_data[0].name,100,200);
    text(storm_data[0].coords,300,200);
    text(storm_data[9].i_d,200,300);
    text(storm_data[9].name,100,300);
    //text(storm_data[9].coords,300,300);
    
}