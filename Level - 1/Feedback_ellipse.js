class Feedback_ellipse{
    constructor(x, y, r){
      this.x = x;
      this.y = y;
      this.r = r;
      this.image = loadImage("assets/R5.png")
    }display(r, g, b, a){
      noStroke();
  
      fill(r, g, b, a);
      ellipseMode(RADIUS);
      ellipse(this.x, this.y, this.r);
    }
  }
  