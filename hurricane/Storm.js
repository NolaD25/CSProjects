class Storm{
    constructor(index, i, t){
        //this.CenterX = CenterX;
        //this.CenterY = CenterY;
        this.i = i;
        this.t = t;
        this.index = index;
        this.numPoints = 50;
        this.radius = 100;
        this.coordsX = this.getPointsX(this.numPoints, this.radius);
        this.coordsY = this.getPointsY(this.numPoints, this.radius);
        
    }
    display(){
        for(let j = 0; j < 100; j++){
            translate(this.CenterX, this.CenterY);
            this.drawRect(this.coordsX[j], this.coordsY[j]);
        }
        //rect(this.CenterX, this.CenterY,10,10);
    }
    update_center(){
        
        this.t += 0.05;
        if(this.t > 1){
            this.i++;
            this.t = 0;
            if(this.i > (parseInt(storm_data[this.index].nums)-2)){
                //console.log("working" + t + "," + i + "," + (parseInt(storm_data[storm_index].nums)-2));
                this.i = 0;
            }
        }
        if (
        storm_data[this.index] &&
        storm_data[this.index].coords &&
        storm_data[this.index].coords[this.i] &&
        storm_data[this.index].coords[this.i+1]
        ) {
            
            this.x1 = map(storm_data[this.index].coords[this.i][0],10,30,0,1000);
            this.y1 = map(storm_data[this.index].coords[this.i][1]*-1,90,200,0,1000);
            this.x2 = map(storm_data[this.index].coords[this.i+1][0],10,30,0,1000);
            this.y2 = map(storm_data[this.index].coords[this.i+1][1]*-1,90,200,0,1000);
            this.CenterX = map(this.t,0,1,this.x1,this.x2);
            this.CenterY = map(this.t,0,1,this.y1,this.y2);

        }
    }
    drawRect(x, y){
        applyMatrix();
        rotate(frameCount/20);
        rect(x,y,5,5);
        resetMatrix();
    }
    getPointsX(numPoints, radius, centerX = 10) {
        this.pointsX = [];
        for (let j = 0; j < numPoints; j++) {
            this.randomRadius = Math.sqrt(Math.random()) * radius;
            this.randomAngle = Math.random() * 2 * Math.PI;
            this.x = centerX + this.randomRadius * Math.cos(this.randomAngle);
            this.pointsX.push(this.x);
        }
        return this.pointsX;
    }
    getPointsY(numPoints, radius, centerY = 10) {
        this.pointsY = [];
        for (let j = 0; j < numPoints; j++) {
            this.randomRadius = Math.sqrt(Math.random()) * radius;
            this.randomAngle = Math.random() * 2 * Math.PI;
            this.y = centerY + this.randomRadius * Math.sin(this.randomAngle);
            this.pointsY.push(this.y);
        }
        return this.pointsY;
    } 
}