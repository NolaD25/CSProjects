//python3 -m http.server
let show_state_names = false;
let show_election_colors = false;



let state_colors = {}
let state_centers = {}
let clintonImg;
let trumpImg;


let state_colors_election = {}

function preload(){
    clintonImg = loadImage('clinton.jpg');
    trumpImg = loadImage('trump.jpg');
}


function initialize_state_colors() {
    for (const state in state_data) {
        let c = color(random(360), 20, 100);
        state_colors[state] = c;
    }
}


function initialize_state_colors_election() {

    for (const state in election_data_2016) {
        let clinton = election_data_2016[state][0];
        let trump = election_data_2016[state][1];
        let total = clinton + trump;

        let hue, value;

        if (clinton > trump) {
            hue = 240;
            //value = map(int(clinton/total * 100), 45, 70, 0, 100);
        } else {
            hue = 0;
            //value = map(int(trump/total * 100), 45, 70, 0, 100);
        }

        state_colors_election[state] = color(hue, 100 /*value*/, 100); 
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
    
    let link = createA('https://theultraviolet.com/category/elections/', 'Candidate Updates');
    link.position(width/9*8+10,height/2+50);
    link.attribute('target', '_blank');
    link.style('font-size', '12px');
    link.style('color', '#00aeff');
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
        fill(0);
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

    return color(0, 0, 50);
}

function get_state_percent(state){
    
        let demVotes = election_data_2016[state][0];
        let repVotes = election_data_2016[state][1];
        let total = demVotes + repVotes;
        
        let clinton = (demVotes/total)*100;
        let trump = (repVotes/total)*100;


        if (demVotes > repVotes) {
            return clinton.toFixed(2);
        } else {
            return trump.toFixed(2);
        }

    
}


function draw() {

    background(0, 0, 75);
    noFill();

    for (let state in state_data) {
        stroke(0);
        fill(get_color(state));
        draw_state(state);
        
    }

    let state = find_closest_state(mouseX, mouseY);
    if (state) {
        fill(0, 0, 100);
        draw_state(state);
        fill(get_color(state));
        text(state, width/9*8, height/2);
        let percent = get_state_percent(state);
        
        if(hue(get_color(state)) == 240){
            clintonImg.resize(width/9,height/3);
            image(clintonImg, width/9*8, height/3*2);
            fill(240,100,100);
            text(percent + "%", width/9*8, height/2+20);
            fill(0,100,100);
            text((100-percent).toFixed(2) + "%", width/9*8, height/2+30);
        }else if(hue(get_color(state)) == 0){
            trumpImg.resize(width/9, height/3);
            image(trumpImg, width/9*8, height/3*2);
            fill(0,100,100);
            text(percent + "%", width/9*8, height/2+20);
            fill(240,100,100);
            text((100-percent).toFixed(2) + "%", width/9*8, height/2+30);
        }
        
        
    }

    fill(0, 0, 0);
    let x = 25;
    let y = height*.8;
    textAlign(LEFT);
    text("n: state names", x, y+=25);
    text("c: election 2016 colors", x, y+=25);
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



