function setup() {
  createCanvas(400, 400);
    background(0);

}


let cr = 0;
let cg = 0;
let cb = 0;

let num = 0;


function draw() {
    fill(cr,cb,cg);
    noStroke();
    cr += 1;
    cb += 1;
    cg += 1;
  //background(0);
  //fill(255,0,0);
    let x = random(0,400);
    let y = random(0,400);
    ellipse(x,y,10,10);
   
    if(num%2==0){
        cr = 0;
    }
    if(num%2!=0){
        cg =0;
    }

  
    //if(x == width-25)
        //x = 25;
}
function mouseClicked(){
    num +=1;

    

}
