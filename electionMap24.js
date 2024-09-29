//python3 -m http.server
let show_state_names = false;
let show_election_colors = true;



let state_colors = {}
let state_centers = {}
let harrisImg;
let trumpImg;
let noCallImg;


let state_colors_election = {}

function preload(){
    harrisImg = loadImage('harris.jpg');
    trumpImg = loadImage('trump.jpg');
    noCallImg = loadImage('harrisvtrump.jpg');
}


function initialize_state_colors() {
    for (const state in state_data) {
        let c = color(random(360), 20, 100);
        state_colors[state] = c;
    }
}


function initialize_state_colors_election() {

    for (const state in election_data_2024) {
        let harris = election_data_2024[state][0];
        let trump = election_data_2024[state][1];
        let total = harris + trump;

        let hue, value, saturation;

        if (harris > trump) {
            hue = 210;
            //value = map(int(harris/total * 100), 45, 70, 0, 100);
            value = 70;
            saturation = 70;
        } else if (trump > harris){
            hue = 7;
            //value = map(int(trump/total * 100), 45, 70, 0, 100);
            value = 78;
            saturation = 71;
        }else{
            hue = 24;
            value = 5;
            saturation = 92;
        }

        state_colors_election[state] = color(hue, value, saturation); 
    }
}



function initialize_state_centers() {
    for (const state in state_data) {
        let sum_x = 0;
        let sum_y = 0;
        let count = 0;
        for (const polygon of state_data[state]) {
            for (const point of polygon) {
                sum_x += point[0];
                sum_y += point[1];
                count++;
            }
        }
        state_centers[state] = [sum_x/count, sum_y/count];
    }
}


function setup() {
    createCanvas(900, 500);
    colorMode(HSB, 360, 100, 100);
    initialize_state_colors();
    initialize_state_centers();
    initialize_state_colors_election();
    
    /*
    let link = createA('https://theultraviolet.com/category/elections/', 'Candidate Updates');
    link.position(width/9*8+10,height/2+50);
    link.attribute('target', '_blank');
    link.style('font-size', '12px');
    link.style('color', '#00aeff');
    */
}


function transform_coordinates(p) {
    // map latitude/longitude to rect(0, 0, width, height)
    const x1 = -127;
    const x2 = -66;
    const y1 = 25;
    const y2 = 50;
    return [map(p[0], x1, x2, 0, width),
            map(p[1], y1, y2, height, 0)]
}


function draw_state(name) {

    polygons = state_data[name];

    for (let polygon of polygons) {
        beginShape();
        for (let point of polygon) {
            q = transform_coordinates(point); 
            vertex(q[0], q[1]);
        }
        endShape();
    }

    if (show_state_names) {
        fill(255);
        let position = transform_coordinates(state_centers[name]);
        textAlign(CENTER);
        text(name, position[0], position[1]);
    }
}


function find_closest_state(x, y) {

    result = "";
    min_distance = 100;

    for (const state in state_centers) {
        position = state_centers[state];
        let q = transform_coordinates(position);
        let d = dist(q[0], q[1], x, y);
        if (d < min_distance) {
            min_distance = d;
            result = state;
        }
    }

    if (min_distance < 50) 
        return result;
    else
        return "";
}



function get_color(state) {
    if (show_election_colors) {
        if (state in state_colors_election) {
            return state_colors_election[state];
        }
    } else {
        return state_colors[state];
    }

    return color(24, 5, 92);
}

function get_state_call(state){

        let demVotes = election_data_2024[state][0];
        let repVotes = election_data_2024[state][1];
        let total = demVotes + repVotes;
        
        //let harris = (demVotes/total)*100;
        //let trump = (repVotes/total)*100;


        if (demVotes > repVotes) {
            return "Harris";
        } else if (repVotes > demVotes){
            return "Trump";
        }else if (demVotes == repVotes){
            return "Not called yet";
        }
    
    
}

function score(){
    let harrisTotal = 0;
    let trumpTotal = 0;
    
    for(const state in election_data_2024){
        let demVotes = election_data_2024[state][0];
        let repVotes = election_data_2024[state][1];
        let total = demVotes + repVotes;
        
       

        
        if (demVotes > repVotes) {
            harrisTotal+= electoral_college[state][0];
        } else if (repVotes > demVotes){
            trumpTotal+= electoral_college[state][0];
        }else if (demVotes == repVotes){
           
        }
       
    }
    return [harrisTotal, trumpTotal];
        //let demScore = map(harrisTotal, 0, 538, 0, 900);
        //let repScore = map(trumpTotal, 0 , 538, 0, 900);
        
        
    
    
    
}

function draw_score(scores){
    
    let harrisTotal = scores[0];
    let trumpTotal = scores[1];
    
    let demScore = map(harrisTotal, 0, 538, 0, 900);
    let repScore = map(trumpTotal, 0 , 538, 0, 900);
    
    fill(24, 5, 92);
    rect(0,0, width, 10);
    fill(210,70,70);
    rect(0,0,demScore,10);
    fill(7, 78, 71);
    rect(width-repScore,0,width,10);
    
    line(width/2,0,width/2,10);
    
    fill(255);
    text(harrisTotal,10,10);
    text(trumpTotal,width-25,10)
    
    //text(harrisTotal + trumpTotal, 400,400);
}

function mouse_box(state){
    let ecVotes = electoral_college[state][0];
    fill(255);
    rect(mouseX - 100, mouseY + 10, 200, 100);
    fill(get_color(state));
    text(state, mouseX - 100, mouseY + 20);
    text(ecVotes + " electoral votes", mouseX - 100, mouseY + 30);
    
}




function draw() {

    background(255);
    noFill();

    for (let state in state_data) {
        stroke(255);
        fill(get_color(state));
        draw_state(state);
        
    }
    

    let state = find_closest_state(mouseX, mouseY);
    if (state) {
        //if(hue(get_color(state)) = 210){
           fill(hue(get_color(state)), saturation(get_color(state))-30, brightness(get_color(state))); 
        
        //}else if(hue(get_color(state)) = 7){
            //fill(7, 51, 86);
        //}else{
            //fill(25, 4, 97);
        //}
        
        draw_state(state);
        fill(get_color(state));
        text(state, width/9*8, height/2);
        let call = get_state_call(state);
        
        if(call === "Harris"){
            harrisImg.resize(width/9,height/3);
            image(harrisImg, width/9*8, height/3*2);
            fill(get_color(state));
            text(call, width/9*8, height/2+20);
            text("Electoral college",width/9*8,height/2+40);
            text("votes:" + electoral_college[state][0],width/9*8,height/2+60);
            //fill(0,100,100);
            //text((100-percent).toFixed(2) + "%", width/9*8, height/2+30);
        }else if(call === "Trump"){
            trumpImg.resize(width/9, height/3);
            image(trumpImg, width/9*8, height/3*2);
            fill(get_color(state));
            text(call, width/9*8, height/2+20);
            text("Electoral college",width/9*8,height/2+40);
            text("votes:" + electoral_college[state][0],width/9*8,height/2+60);
            //fill(240,100,100);
            //text((100-percent).toFixed(2) + "%", width/9*8, height/2+30);
        }else{
            noCallImg.resize(width/9, height/3);
            image(noCallImg, width/9*8, height/3*2);
            fill(get_color(state));
            text(call, width/9*8, height/2+20);
            text("Electoral college",width/9*8,height/2+40);
            text("votes:" + electoral_college[state][0],width/9*8,height/2+60);
        }
        
        
    }

    fill(0, 0, 0);
    let x = 25;
    let y = height*.8;
    textAlign(LEFT);
    text("n: state names", x, y+=25);
    text("c: toggle election colors", x, y+=25);
    
    
    draw_score(score());
    
    mouse_box(state);
}


function keyPressed() {
    if (key == 'n') {
        show_state_names = !show_state_names;
    }
    if (key == 'c') {
        show_election_colors =!show_election_colors;
    }
}


function mousePressed() {
    // temporary hack for mobile

    let x = 25;
    let y = height*.8;

    if (x<mouseX && mouseX<x+150 && y<mouseY && mouseY<y+25)
        show_state_names = !show_state_names;

    y += 25;

    if (x<mouseX && mouseX<x+150 && y<mouseY && mouseY<y+25)
        show_election_colors =!show_election_colors;
}