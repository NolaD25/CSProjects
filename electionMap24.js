//python3 -m http.server
//https://nolad25.github.io/CSProjects/
let show_state_names = true;
let show_election_colors = true;



let state_colors = {}
let state_centers = {}

let fontRegular;
let fontBold;

let demColor;
let repColor;

let demCheck;
let repCheck;

let state_colors_election = {}

let w = 900;
let h = 600;

function preload(){
    fontRegular = loadFont('Roboto-Regular.ttf');
    fontBold = loadFont('Roboto-Bold.ttf');
    
    demCheck = loadImage('demCheck.jpg');
    repCheck = loadImage('repCheck.jpg');
    
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
        if(state === "Maine" && harris == trump && trump > 0){
            hue = 7;
            value = 78;
            saturation = 71;
        }else{
            if (harris > trump) {
                hue = 210;
                //value = map(int(harris/total * 100), 45, 70, 0, 100);
                value = 70;
                saturation = 70;
            }else if (trump > harris){
                hue = 7;
                //value = map(int(trump/total * 100), 45, 70, 0, 100);
                value = 78;
                saturation = 71;
            }else{
                hue = 24;
                value = 5;
                saturation = 92;
            }
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
        
        if(state === "Hawaii"){
            state_centers[state] = [275, height-50];
        }else if(state === "Alaska"){
            state_centers[state] = [100, height-100];
        }else{
            state_centers[state] = [sum_x/count, sum_y/count];
        }
    }
}


function setup() {
    createCanvas(w, h);
    colorMode(HSB, 360, 100, 100);
    initialize_state_colors();
    initialize_state_centers();
    initialize_state_colors_election();
    textFont(fontRegular);
    
    /*
    let link = createA('https://theultraviolet.com/category/elections/', 'Candidate Updates');
    link.position(width/9*8+10,height/2+50);
    link.attribute('target', '_blank');
    link.style('font-size', '12px');
    link.style('color', '#00aeff');
    */
    
    repColor = color(7, 78, 71);
    demColor = color(210,70,70);
}


function transform_coordinates(p,stateName) {
    // map latitude/longitude to rect(0, 0, width, height)
    if(stateName === "Alaska"){
        const x1 = -179;
        const x2 = -120; 
        const y1 = 50;
        const y2 = 70;
        return [map(p[0], x1, x2, 0, 240),
                map(p[1], y1, y2, height+20, height-150)]
    }else if(stateName === "Hawaii"){
        const x1 = -165;
        const x2 = -150; 
        const y1 = 15;
        const y2 = 30;
        return [map(p[0], x1, x2, 160, 410),
                map(p[1], y1, y2, height+20, height-220)]
    }else{
        const x1 = -127;
        const x2 = -66;
        const y1 = 25;
        const y2 = 50;
        return [map(p[0], x1, x2, 0, width),
                map(p[1], y1, y2, height-50, 75)]
    }
}


function draw_state(name) {
    let position = [0,0];
    polygons = state_data[name];

    for (let polygon of polygons) {
        beginShape();
        for (let point of polygon) {
            q = transform_coordinates(point, name); 
            vertex(q[0], q[1]);
        }
        endShape();
    }
    textFont(fontRegular);
    if (show_state_names) {
        fill(255);
        if(name === "Hawaii" || name === "Alaska"){
            position = state_centers[name];
        }else{
            position = transform_coordinates(state_centers[name]);
        }
        textAlign(CENTER);
        noStroke();
        textSize(14);
        let stateName = state_abbreviations[name][0];
        
        if(stateName == "Idaho"){
            text(stateName, position[0]-10, position[1]+20);
        }else if(stateName == "Ariz."){
            text(stateName, position[0]+20, position[1]);
        }else if(stateName == "Miss."){
            text(stateName, position[0]+5, position[1]);
        }else if(stateName == "La."){
            text(stateName, position[0], position[1]+5);
        }else if(stateName == "Ky."){
            text(stateName, position[0]+20, position[1]);
        }else if(stateName == "Fla."){
            text(stateName, position[0]+20, position[1]);
        }else if(stateName == "Mich."){
            text(stateName, position[0]+20, position[1]+40);
        }else if(stateName == "W.Va."){
            text(stateName, position[0]-10, position[1]+15);
        }else if(stateName == "Ark."){
            text(stateName, position[0]-10, position[1]);
        }else if(stateName == "Nebr."){
            text(stateName, position[0]-10, position[1]);
        }else if(stateName == "S.Dak"){
            text(stateName, position[0]-10, position[1]);
        }else if(stateName == "Oreg."){
            text(stateName, position[0], position[1]+20);
        }else if(stateName == "Tenn."){
            text(stateName, position[0], position[1]+5);
        }else if(stateName == "Alaska"){
            text(stateName, position[0], position[1]);
        }else if(stateName == "Md."){
            fill(50);
            text(stateName, position[0]+45, position[1]+20);
        }else if(stateName == "Del."){
            fill(50);
            text(stateName, position[0]+30, position[1]+10);
        }else if(stateName == "N.J."){
            fill(50);
            text(stateName, position[0]+25, position[1]+10);
        }else if(stateName == "N.H."){
            fill(50);
            text(stateName, position[0]+30, position[1]+20);
        }else if(stateName == "Mass."){
            fill(50);
            text(stateName, position[0]+30, position[1]+5);
        }else if(stateName == "R.I."){
            fill(50);
            text(stateName, position[0]+30, position[1]+15);
        }else if(stateName == "Conn."){
            fill(50);
            text(stateName, position[0]+20, position[1]+20);
        }else if(stateName == "Hawaii"){
            fill(50);
            text(stateName, position[0], position[1]);
        }else{
            text(stateName, position[0], position[1]);
        }
        
        
    }
}


function find_closest_state(x, y) {

    result = "";
    min_distance = 100;
    let q = [0,0];

    for (const state in state_centers) {
        position = state_centers[state];
        if(state === "Hawaii" || state === "Alaska"){
            q = position;
        }else{
            q = transform_coordinates(position);
        }
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
        
       

        if(state == "Nebraska" || state == "Maine"){
            harrisTotal += demVotes;
            trumpTotal += repVotes;
        }else{
            if (demVotes > repVotes) {
                harrisTotal+= electoral_college[state][0];
            }else if (repVotes > demVotes){
                trumpTotal+= electoral_college[state][0];
            }else if (demVotes == repVotes){
           
            }
        }
       
    }
    return [harrisTotal, trumpTotal];
        //let demScore = map(harrisTotal, 0, 538, 0, 900);
        //let repScore = map(trumpTotal, 0 , 538, 0, 900);
        
    
}

function draw_score(scores){
    textFont(fontBold);
    
    let harrisTotal = scores[0];
    let trumpTotal = scores[1];
    
    let demScore = map(harrisTotal, 0, 538, 0, 900);
    let repScore = map(trumpTotal, 0 , 538, 0, 900);
    
    fill(24, 5, 92);
    rect(0,40, width, 10);
    fill(demColor);
    rect(0,40,demScore,10);
    fill(repColor);
    rect(width-repScore,40,width,10);
    
    stroke(0);
    line(width/2,40,width/2,50);
    noStroke();
    textSize(14);
    fill(0);
    textAlign(CENTER);
    text("270", width/2, 65);
    text("TO WIN", width/2, 80);
    
    textAlign(LEFT);
    textSize(24);
    fill(demColor);
    text(harrisTotal,5,20);
    textSize(16);
    text("Kamala Harris",5,35);
    textSize(24);
    fill(repColor);
    textAlign(RIGHT);
    text(trumpTotal,width-5,20);
    textSize(16);
    text("Donald Trump",width-5,35);
    
    //text(harrisTotal + trumpTotal, 400,400);
    imageMode(CENTER);
    if(harrisTotal >= 270){
        textAlign(LEFT);
        fill(demColor);
        demCheck.resize(10,0);
        image(demCheck, 120,30)
    }else if(trumpTotal >= 270){
        textAlign(RIGHT);
        fill(repColor);
        repCheck.resize(10,0);
        image(repCheck, width-120,30);
    }
}

function mouse_box(state){
    textFont(fontRegular);
    let ecVotes = 0;
    let ecVotesDem = 0;
    let ecVotesRep = 0;
    if(state == "Nebraska" || state == "Maine"){
        ecVotesDem = election_data_2024[state][0];
        ecVotesRep = election_data_2024[state][1];
    }else{
        ecVotes = electoral_college[state][0];
    }
    textAlign(LEFT);
    fill(255);
    stroke(25, 2, 84);
    rect(mouseX - 100, mouseY + 10, 200, 80);
    noStroke();
    textSize(20);
    //if(hue(get_color(state)) > 23.9 && hue(get_color(state)) < 24.1){
        fill(0);
        text(state, mouseX - 90, mouseY + 30);
    //}else{
        //fill(get_color(state));
        //text(state, mouseX - 90, mouseY + 30);
    //}
    textSize(14);
    fill(50);
    if(state == "Nebraska"){
        text("5 electoral votes (EV)", mouseX - 90, mouseY + 45);
        textSize(10);
        text("EV:", mouseX + 50, mouseY + 45);
    }else if(state == "Maine"){
        text("4 electoral votes (EV)", mouseX - 90, mouseY + 45);
        textSize(10);
        text("EV:", mouseX + 50, mouseY + 45);
    }else{
        text(ecVotes + " electoral votes (EV)", mouseX - 90, mouseY + 45);
        textSize(10);
        text("EV:", mouseX + 50, mouseY + 45);
    }
    textSize(18);
    stroke(50);
    line(mouseX-100, mouseY+50, mouseX+100, mouseY+50);
    line(mouseX-100, mouseY+70, mouseX+100, mouseY+70);
    line(mouseX+40,mouseY+50,mouseX+40,mouseY+90);
    noStroke();
    if(state == "Nebraska" || state == "Maine"){
        fill(repColor);
        text("Donald Trump       " + ecVotesRep, mouseX - 90, mouseY+85);
        fill(demColor);
        text("Kamala Harris       " + ecVotesDem, mouseX - 90, mouseY+65);
    }else{
    
        if(get_state_call(state) == "Harris"){
            fill(demColor);
            text("Kamala Harris       " + ecVotes, mouseX - 90, mouseY+65);
            fill(repColor);
            text("Donald Trump       " + "0", mouseX - 90, mouseY+85);
        }else if(get_state_call(state) == "Trump"){
            fill(repColor);
            text("Donald Trump       " + ecVotes, mouseX - 90, mouseY+65);
            fill(demColor);
            text("Kamala Harris       " + "0", mouseX - 90, mouseY+85);
        }else{
            fill(0);
            text("Donald Trump       " + "0", mouseX - 90, mouseY+65);
            text("Kamala Harris       " + "0", mouseX - 90, mouseY+85);
        }
    }
    
}
function draw_MaineAndNebraska(state){
    let demMaine = election_data_2024["Maine"][0];
    let repMaine = election_data_2024["Maine"][1];
    let demNebraska = election_data_2024["Nebraska"][0];
    let repNebraska = election_data_2024["Nebraska"][1];
    
    let maineColor = color(24, 5, 92);
    let nebraskaColor = color(24, 5, 92);
    
    
    if(demNebraska == 5){
        nebraskaColor = demColor;
    }else if(repNebraska == 5){
        nebraskaColor = repColor;
    }else{
        if(demNebraska < repNebraska){
            nebraskaColor = demColor;
        }else if(repNebraska < demNebraska){
            nebraskaColor = repColor;
        }else{
            nebraskaColor = color(24, 5, 92);
        }
    }
    
    if(state === "Nebraska"){
        fill(hue(nebraskaColor), saturation(nebraskaColor)-30, brightness(nebraskaColor));
    }else{
        fill(nebraskaColor);
    }
    
    stroke(255);
    rect(width/20*9,height/40*16.25,height/30,height/30);
    
    if(demMaine == 4){
        maineColor = demColor;
    }else if(repMaine == 4){
        maineColor = repColor;
    }else{
        if(demMaine < repMaine){
            maineColor = demColor;
        }else if(repMaine < demMaine){
            maineColor = repColor;
        }else if(repMaine == demMaine && repMaine > 0){
            maineColor = demColor;
        }else{
            maineColor = color(24, 5, 92);
        }
    }
    
    if(state === "Maine"){
        fill(hue(maineColor), saturation(maineColor)-30, brightness(maineColor));
    }else{
        fill(maineColor);
    }
    
    rect(width/40*37.5,height/30*7,height/30,height/30);
    noStroke();
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
        //text(state, width/9*8, height/2);
        let call = get_state_call(state);
        /*
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
        */
        
    }
    
    textAlign(CENTER);
    textSize(12);
    fill(50);
    textFont(fontRegular);
    text("Results are as reported by The Associated Press at APNews.com.", width/2,height-20);
    //text("", width/2,height-20);

    fill(0, 0, 0);
    let x = 25;
    let y = height*.8;
    textAlign(LEFT);
    textSize(20);
    //text("n: state names", x, y+=25);
    //text("c: toggle election colors", x, y+=25);
    
    draw_MaineAndNebraska(state);
    draw_score(score());
    if(state != ""){
        mouse_box(state);
    }
    
    
}


function keyPressed() {
    if (key == 'n') {
        show_state_names = !show_state_names;
    }
    /*if (key == 'c') {
        show_election_colors =!show_election_colors;
    }*/
}

/*
function mousePressed() {
    // temporary hack for mobile

    let x = 25;
    let y = height*.8;

    if (x<mouseX && mouseX<x+150 && y<mouseY && mouseY<y+25)
        show_state_names = !show_state_names;

    y += 25;

    if (x<mouseX && mouseX<x+150 && y<mouseY && mouseY<y+25)
        show_election_colors =!show_election_colors;
}*/