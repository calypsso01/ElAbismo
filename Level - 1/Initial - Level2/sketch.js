const STATE_0 = 0;
const STATE_1 = 1;
const STATE_2 = 2;
const STATE_3 = 3;

var gameState = STATE_0;
var backgroundImg1, backgroundImg2, backgroundImg3, backgroundImg4;

// STATE_0
  var mySignature, gameName;
  var dragon, dragonImg, shootGroup;
  var sword, sword1, swordImg;
  var dragon1, dragon1Img;

// STATE_1
  var para = 1;
  var para1, para2, para3;

// STATE_2
  var state2 = 0; 
  var keySword, keySwordImg, keySwordAbout;
  var dragonRing, dragonRingImg, dragonRingAbout;
  var startBtn, startAbout;
  var bubble1, bubble2, bubbleImg;
// sound
  var click;
  var m1= true;

function preload(){
  backgroundImg1 = loadImage('assets/backgroundImg/background4.jpg');
  backgroundImg2 = loadImage('assets/backgroundImg/background1.jpg');
  backgroundImg3 = loadImage('assets/backgroundImg/background3.jpeg ');

  click = loadSound('assets/sell2.mp3');
  music = loadSound('assets/music.mp3');

  dragonImg = loadImage('assets/fireFall.png');
  swordImg = loadImage('assets/swordOfDeath.png');
  dragon1Img = loadImage('assets/dragonFire.png');

  keySwordImg = loadImage('assets/weapons/weapon10.png');
  dragonRingImg = loadImage('assets/weapons/weapon0.png');
  bubbleImg = loadImage('assets/save.png');




}

function setup() {
  createCanvas(windowWidth, windowHeight);

  console.log(music);
  musicPlay();

  state_0_setup();

  state_1_setup();

  state_2_setup();

  state_3_setup();

}

function draw() {

  if(gameState === STATE_0){
    state_0_draw();
  }

  if(gameState === STATE_1){
    state_1_draw();
  }

  if(gameState === STATE_2){
    state_2_draw();
  }

  if(gameState === STATE_3){
    state_3_draw();
  }
  
  drawSprites();
}

function state_0_setup(){

  gameName = createElement('h1', "Abyss");
  gameName.position(width/2-420, height/2-445);
  gameName.class('gameName');
  gameName.hide(); 

  mySignature = createElement('h2', 'by Swagatika');
  mySignature.position(width - 112,height - 32);
  mySignature.class('mySignature');
  mySignature.hide();

  shootGroup = new Group();

  sword = createSprite(width/2-500, height/2);
  sword.addImage(swordImg);
  sword.scale = 0.45;
  sword.rotation -=0;
  sword.visible = false;

  sword1 = createSprite(width/2+500, height/2);
  sword1.addImage(swordImg);
  sword1.scale = 0.45;
  sword1.rotation +=180;
  sword1.visible = false;

  dragon1 = createSprite(width/2, height/2);
  dragon1.addImage (dragon1Img);
  dragon1.scale = 0.6;
  dragon1.visible = false;

}

function state_0_draw(){
  background(backgroundImg1); 

  gameName.show();
  mySignature.show();
  sword.visible = true;
  sword1.visible =  true;
  dragon1.visible = true;

  dragon1.rotation -=10;

  if(frameCount % 5 === 0){
    let x = random(30, width + 300);
    var shoot = createSprite(x, 0);
    shoot.addImage(dragonImg);
    shoot.scale = 0.06;
    shoot.velocityX = -10;
    shoot.velocityY = 20
    shootGroup.add(shoot);
    if(shoot.y > height + 100){
      shoot.destroy();
    }
  }

  //change gameState
  setTimeout(() => {
    shootGroup.destroyEach();
    gameName.hide();
    sword.destroy();
    sword1.destroy();
    dragon1.destroy();
    gameState = 1;
  }, 10000);

}

function state_1_setup(){

// para = 1
  para1 = createElement('h2');
  para1.position(width/2-285, height-170);
  para1.class('para');
  para1.hide();
  para1.html(`Alux got to defeat his seven deaths <br>to enter the land of Druids.`);

// para = 2
  para2 = createElement('h2');
  para2.position(width/2-310, height-160);
  para2.class('para');
  para2.hide();
  para2.html(`What seems close is still very far away.`);


    setTimeout(() => {
      if(para = 1){
       para = 2 ;}
    }, 15000);
    
    setTimeout(() => {
      if(para = 2){
       para = 3 ;}
    }, 20000);
    
    
  
}

function state_1_draw(){
  background(backgroundImg2);  

  if(para === 1){
    para1.show();
    para2.hide();

  }if(para === 2){
    para2.show();
    para1.hide();
  }
  if(para === 3){
    gameState = 2;
    para2.hide();
  }

}

function state_2_setup(){

  bubble1 = createSprite(width-75, height - 70);
  bubble1.addImage(bubbleImg);
  bubble1.scale = 0.08;
  bubble1.visible = false;
  
  bubble2 = createSprite(65, height - 70);
  bubble2.addImage(bubbleImg);
  bubble2.scale = 0.08;
  bubble2.visible = false;

  //state2 === 0
    keySword = createSprite(width/2+160, height/2-60);
    keySword.addImage(keySwordImg);
    keySword.scale = 0.58;
    keySword.visible = false;
    keySword.rotation +=80;

    keySwordAbout = createElement ('h1', `Seven weapons for seven deaths.`);
    keySwordAbout.position(width/2 + 200, height/2-100);
    keySwordAbout.class('state2')
    keySwordAbout.hide();
  

  //state2 === 1
    dragonRing = createSprite(width/2+160, height/2-60);
    dragonRing.addImage(dragonRingImg);
    dragonRing.scale = 0.6;
    dragonRing.visible = false;
    dragonRing.rotation +=80;

    dragonRingAbout = createElement ('h1', `These sacred weapons will shield Alux<br>for some time. `);
    dragonRingAbout.position(width/2 + 200, height/2-100);
    dragonRingAbout.class('state2')
    dragonRingAbout.hide();

    
  // state2 === 2
    startAbout = createElement('h1', `Are you ready to start?`);
    startAbout.position(width/2 + 250, height/2-130);
    startAbout.class('state');
    startAbout.hide();

    startBtn = createImg('assets/Start.png');
    startBtn.size(120, 60);
    startBtn.position(width/2 + 375, height/2);
    startBtn.mouseClicked(()=>{
      click.play();
      window.open("Level - 2/index.html");
      window.close();
    })
    startBtn.hide();
  
}

function state_2_draw(){
  background(backgroundImg3);  

  bubble1.visible = true;
  bubble1.rotation +=10;    
  bubble2.visible = true;
  bubble2.rotation -=10;
  mySignature.hide();

  if(state2 === 0){
    push();
    noStroke();
    fill(0, 240, 255, 70);
    ellipse(width/2+160, height/2-62, 260);
    pop();

    keySword.visible = true;
    keySwordAbout.show();

    dragonRing.visible = false;
    dragonRingAbout.hide();

   
    startAbout.hide();
    startBtn.hide();
  }
  if(state2 === 1){
    push();
    noStroke();
    fill(0, 240, 255, 70);
    ellipse(width/2+160, height/2-62, 260);
    pop();

    keySword.visible = false;
    keySwordAbout.hide();

    //dragonRing.rotation -=10;
    dragonRing.visible = true;
    dragonRingAbout.show();
    
    startAbout.hide();
    startBtn.hide();
  }
  
  if(state2 === 2){
    push();
    noStroke();
    fill(0, 240, 255, 70);
    ellipse(width/2 + 253, height/2-70+20, 130);
    ellipse(width/2 + 263, height/2-70-20, 115);
    pop();
    startAbout.show();
    startBtn.show();

    dragonRing.visible = false;
    dragonRingAbout.hide();

    keySword.visible = false;
    keySwordAbout.hide();

  }

}

function state_3_setup(){}

function state_3_draw(){
  background('green');  

}

function mouseClicked(){

  var d1 = dist(width-75, height - 70, mouseX, mouseY);
  if(d1< 80){
    if(state2 <= 1){
      state2 +=1;
      click.play();
    }
  }
  
  var d2 = dist(65, height - 70, mouseX, mouseY);
  if(d2< 80){
    if(state2 >= 1){
      state2 -=1;
      click.play();
    }
  }
}
function musicPlay(){
  swal(
    {
      title: `Music`,
      text: "Do you want background-music?",
      imageUrl:
        "assets/m.png",
      imageSize: "230x150",
      confirmButtonText: "Yes",
      confirmButtonColor: "black",
      showCancelButton: true,
      cancelButtonText: "No", 
      cancelButtonColor: "black",
    },
    function(isConfirm) {
        if (isConfirm) {
          music.loop();
      }
    }
  );
  
}