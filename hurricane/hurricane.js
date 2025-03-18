
function setup(){
    createCanvas(1000,1000);
    colorMode(HSB);
    count = 0;
    ceiling = 1;
    inter = 0;
    i = 0;
    t = 0;
    storm_index = 0;

}
function draw_rect(j){

    
    x1 = map(storm_data[j].coords[i][0],10,30,0,1000);
    y1 = map(storm_data[j].coords[i][1]*-1,90,200,0,1000);
    x2 = map(storm_data[j].coords[i+1][0],10,30,0,1000);
    y2 = map(storm_data[j].coords[i+1][1]*-1,90,200,0,1000);
    
    x = map(t,0,1,x1,x2);
    y = map(t,0,1,y1,y2);
        
    
    rect(x,y,10,10);
    
}



function draw(){
    background(0,100,0);
    noStroke();
    
    
    
    draw_rect(storm_index);
   
    t += 0.05;
    if(t > 1){
        i++;
        t = 0;
    }
    if(i > storm_data[storm_index].nums){
        i = 0;
    }
    if(count >= storm_data.length){
        count = storm_data.length-1;
    }
    //text(storm_data[0].coords[0],200,200);
    
    for(let i = count; i < count + ceiling; i++){
        for(let j = 0; j < storm_data[i].nums-1; j++){
            stroke(i*5,75,100,);
            x = map(storm_data[i].coords[j][0],10,30,0,1000);
            y = map(storm_data[i].coords[j][1]*-1,90,200,0,1000);
            rect(x, y,10,10);
            
        }

    }
        
    
    
    
}
function keyPressed(){
    if(keyCode === RIGHT_ARROW){
        storm_index ++;
        count ++;

    }
    if(keyCode === LEFT_ARROW){
        storm_index --;
        count --;
        
    }
    if(keyCode === UP_ARROW){
        //count = 0;
        //ceiling = storm_data.length;
    
        
    }
    if(keyCode === DOWN_ARROW){

    }
    
}