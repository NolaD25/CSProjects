
function setup(){
    createCanvas(1000,1000);
    colorMode(HSB);
    count = 0;
    ceiling = 1;
    
}



function draw(){
    background(0,100,0);
    noStroke();
    if(count <= -1){
        count = 0;
    }
    if(count >= storm_data.length){
        count = storm_data.length-1;
    }
    //text(storm_data[0].coords[0],200,200);
    
    for(let i = count; i < count + ceiling; i++){
        last_x = map(storm_data[i].coords[0][0],10,30,0,1000);
        last_y = map(storm_data[i].coords[0][1]*-1,90,200,0,1000);
        for(let j = 0; j < storm_data[i].nums-1; j++){
            //console.log(storm_data[i].name);
            text(storm_data[i].name,200,100);
            text(storm_data[i].coords.length,200,200);
            text(storm_data[i].nums,200,300);
            stroke(i*10,75,100,);
            x = map(storm_data[i].coords[j][0],10,30,0,1000);
            y = map(storm_data[i].coords[j][1]*-1,90,200,0,1000);
            //rect(x, y,10,10);
            line(last_x, last_y, x, y);
            last_x = x;
            last_y = y;
        }
    }
    //text(storm_data.length,200,200);
    //text(count,200,400);
   
    
}
function keyPressed(){
    if(keyCode === RIGHT_ARROW){
        count+=1;
        ceiling = 1;
    }
    if(keyCode === LEFT_ARROW){
        count-=1;
        ceiling = 1;
        
    }
    if(keyCode === UP_ARROW){
        count = 0;
        ceiling = storm_data.length;
        
    }
    
}