let storm;

function setup(){
    createCanvas(1000,1000);
    colorMode(HSB);
    rectMode(CENTER);
    count = 0;
    ceiling = 1;
    inter = 0;
    i = 0;
    t = 0;
    storm_index = 0;
    rectMode(CENTER);
}
function draw_rect(j){
    if (
        storm_data[j] &&
        storm_data[j].coords &&
        storm_data[j].coords[i] &&
        storm_data[j].coords[i+1]
    ) {
            
    x1 = map(storm_data[j].coords[i][0],10,30,0,1000);
    y1 = map(storm_data[j].coords[i][1]*-1,90,200,0,1000);
    x2 = map(storm_data[j].coords[i+1][0],10,30,0,1000);
    y2 = map(storm_data[j].coords[i+1][1]*-1,90,200,0,1000);
    
    x = map(t,0,1,x1,x2);
    y = map(t,0,1,y1,y2);
    rect(x,y,10,10);
    //storm = new Storm(x,y);

    //storm.display();
    }


    
}



function draw(){
    background(0,100,0);
    noStroke();
    
    
    
    
    draw_rect(storm_index);
    stroke(255);
    text(storm_data.length-1, 200, 100);
    text(storm_data.length, 200, 200);
    text(storm_index, 200, 300);
    text((parseInt(storm_data[storm_index].nums)-2), 200,400);
    
   
    t += 0.05;
    if(t > 1){
        i++;
        t = 0;
        if(i > (parseInt(storm_data[storm_index].nums)-2)){
            //console.log("working" + t + "," + i + "," + (parseInt(storm_data[storm_index].nums)-2));
            i = 0;
        }
    }
    
    if(count >= storm_data.length){
        count = storm_data.length-1;
    }
    if(count < 0){
        count = 0;
    }
    
    //text(storm_data[0].coords[0],200,200);
    
    for(let j = count; j < count + ceiling; j++){
        last_x = map(storm_data[j].coords[0][0],10,30,0,1000);
        last_y = map(storm_data[j].coords[0][1]*-1,90,200,0,1000);
        for(let k = 0; k < storm_data[j].nums-1; k++){
            stroke(j*5,75,100,);
            x = map(storm_data[j].coords[k][0],10,30,0,1000);
            y = map(storm_data[j].coords[k][1]*-1,90,200,0,1000);
            line(last_x, last_y, x, y);
            last_x = x;
            last_y = y;
            
        }

    }
        
    
    
    
}
function keyPressed(){
    if(keyCode === RIGHT_ARROW){
        storm_index ++;
        if(storm_index >= storm_data.length){
            storm_index = storm_data.length-1;
        }
        count ++;
        i = 0;
        t = 0;

    }
    if(keyCode === LEFT_ARROW){
        storm_index --;
        if(storm_index <= -1){
            storm_index = 0;
        }
        count --;
        i = 0;
        t = 0;
        
    }
    if(keyCode === UP_ARROW){
        //count = 0;
        //ceiling = storm_data.length;
    
        
    }
    if(keyCode === DOWN_ARROW){

    }
    
}