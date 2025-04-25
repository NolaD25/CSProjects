class Storm{
    constructor(CenterX,CenterY){
        this.CenterX = CenterX;
        this.CenterY = CenterY;
        this.numPoints = 50;
        this.radius = 100;
        this.coordsX = this.getPointsX(this.numPoints, this.radius);
        this.coordsY = this.getPointsY(this.numPoints, this.radius);
        
    }
    display(){
        for(i = 0; i < 100; i++){
            translate(this.CenterX, this.CenterY);
            this.drawRect(this.coordsX[i], this.coordsY[i]);
        }
        //rect(this.CenterX, this.CenterY,10,10);
    }
    drawRect(x, y){
        applyMatrix();
        rotate(frameCount/20);
        rect(x,y,5,5);
        resetMatrix();
    }
    getPointsX(numPoints, radius, centerX = 10) {
        this.pointsX = [];
        for (let i = 0; i < numPoints; i++) {
            this.randomRadius = Math.sqrt(Math.random()) * radius;
            this.randomAngle = Math.random() * 2 * Math.PI;
            this.x = centerX + this.randomRadius * Math.cos(this.randomAngle);
            this.pointsX.push(this.x);
        }
        return this.pointsX;
    }
    getPointsY(numPoints, radius, centerY = 10) {
        this.pointsY = [];
        for (let i = 0; i < numPoints; i++) {
            this.randomRadius = Math.sqrt(Math.random()) * radius;
            this.randomAngle = Math.random() * 2 * Math.PI;
            this.y = centerY + this.randomRadius * Math.sin(this.randomAngle);
            this.pointsY.push(this.y);
        }
        return this.pointsY;
    } 
    update(x,y){
        this.CenterX = x;
        this.CenterY = y;
    }
}