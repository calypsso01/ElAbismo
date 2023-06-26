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
  var life, lifeImg, lifeAbout;
  var leftKey, leftKey2, leftKeyImg;
  var rightKey, rightKey1, rightKeyImg;
  var spaceKey, spaceKey3, spaceKeyImg;
  var startBtn, startAbout;
  var rightBtn, rightBtnImg;
  var leftBtn, leftBtnImg;
  var bubble1, bubble2, bubbleImg;
  var click, second;
  var music1 = true;

function preload(){
  backgroundImg1 = loadImage('assets/backgroundImg/background4.jpg');
  backgroundImg2 = loadImage('assets/backgroundImg/backgroundImg1.jpg');
  backgroundImg3 = loadImage('assets/backgroundImg/background.jpg ');
  dragonImg = loadImage('assets/fireFall.png');
  swordImg = loadImage('assets/swordOfDeath.png');
  dragon1Img = loadImage('assets/dragonFire.png');

  keySwordImg = loadImage('assets/keySword.png');
  dragonRingImg = loadImage('assets/dragonFire.png');
  lifeImg = loadImage('assets/Green.png');
  rightKeyImg = loadImage('assets/upArrow.png');
  spaceKeyImg = loadImage('assets/spaceKeyImg.png');
  bubbleImg = loadImage('assets/save.png');
  click = loadSound('assets/sell2.mp3')
  second = loadSound('assets/2nd.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

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

// para = 0
  para1 = createElement('h2');
  para1.position(100, height/2-340);
  para1.class('para');
  para1.hide();
  para1.html(`Alux has left in the quest to the land of Druids, to his mother.<br>
    To know how is he a druid? What are his powers?<br> Why doesn't
    he has any control over them?<br> Many questions and one destination. `);

// para = 1
  para2 = createElement('h2');
  para2.position(130, height/2-320);
  para2.class('para');
  para2.hide();
  para2.html(`But before entering the land of Druids, he has to go through Abyss...
    <br>He got to enter it alive ,<br>and defeat his
    seven deaths to enter the land of druids.`);

// para = 2
  para3 = createElement('h2');
  para3.position(250, height/2-290);
  para3.class('para2');
  para3.hide();
  para3.html(`Remember, it is neither facile nor forlorn,<br> and either way you are right.`);

    setTimeout(() => {
      if(para = 1){
       para = 2 ;}
    }, 17000 + 7000);
    
    setTimeout(() => {
      if(para = 2){
       para = 3 ;}
    }, 31000 + 7000);
    
    setTimeout(() => {
      if(para = 3){
       para = 4 ;}
      }, 35000 + 8000);
  
}

function state_1_draw(){
  background(backgroundImg2);  

  if(para === 1){
    para1.show();
    para2.hide();
    para3.hide();

  }if(para === 2){
    para2.show();
    para1.hide();
    para3.hide();
  }if(para === 3){
    para3.show();
    para2.hide();
    para1.hide();
  }
  if(para === 4){
    para3.hide();
    gameState = 2;
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
    keySword = createSprite(260, 150);
    keySword.addImage(keySwordImg);
    keySword.scale = 0.18;
    keySword.visible = false;
    keySword.rotation -=45;

    keySwordAbout = createElement ('h1', `To enter Abyss alive 
    Alux ought to achieve <br>
    the sword of Lupon.   
    `);
    keySwordAbout.position(425, 80);
    keySwordAbout.class('state2')
    keySwordAbout.hide();
  

  //state2 === 1
    dragonRing = createSprite(260, 150);
    dragonRing.addImage(dragonRingImg);
    dragonRing.scale = 0.3;
    dragonRing.visible = false;
    dragonRing.rotation -=45;

    dragonRingAbout = createElement ('h1', `But the sword of Lupon 
    is protected <br>by the dragon ring.<br> The ring will destroy Alux 
    <br>if he touches it directly or indirectly. 
  
    `);
    dragonRingAbout.position(425, 40);
    dragonRingAbout.class('state2')
    dragonRingAbout.hide();
  

  //state2 === 2
    life = createSprite(260, 150);
    life.addImage(lifeImg);
    life.scale = 0.2;
    life.visible = false;
    life.rotation -=45;

    lifeAbout = createElement ('h1', `Malachites will increase Alux's endurance.`);
    lifeAbout.position(425, 100);
    lifeAbout.class('state2')
    lifeAbout.hide();
  

  //state2 === 3
    rightKey1 = createSprite(260, 150);
    rightKey1.addImage(rightKeyImg);
    rightKey1.scale = 0.2;
    rightKey1.visible = false;
    rightKey1.rotation +=90;


    rightKey = createElement('h1', `Click "RIGHT ARROW" to move Alux right.`);
    rightKey.position(430, 105);
    rightKey.class('state2')
    rightKey.hide();

  
  //state2 === 4
    leftKey2 = createSprite(260, 150);
    leftKey2.addImage(rightKeyImg);
    leftKey2.scale = 0.2;
    leftKey2.rotation -=90;
    leftKey2.visible = false;
    
    leftKey = createElement('h1', `Click "LEFT ARROW" to move Alux left.`);
    leftKey.position(430, 105);
    leftKey.class('state2')
    leftKey.hide();
    
  
  //state2 === 5
    spaceKey3 = createSprite(263, 150);
    spaceKey3.addImage(spaceKeyImg);
    spaceKey3.scale = 0.15;
    spaceKey3.visible = false;

    spaceKey = createElement('h1', `Click "SPACE KEY" to jump Alux.`);
    spaceKey.position(465, 105);
    spaceKey.class('state2');
    spaceKey.hide();
  

  // state2 === 6
    startAbout = createElement('h1', `Are you ready to start the quest?`);
    startAbout.position(435, 90);
    startAbout.class('state');
    startAbout.hide();

    startBtn = createImg('assets/Start.png');
    startBtn.size(200, 100);
    startBtn.position(width/2-150, height/2-80);
    startBtn.mouseClicked(()=>{
      click.play();
      window.open("Level - 1/index.html");
      close();
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
    fill(21, 244, 238, 70);
    ellipse(260, 150, 250);
    pop();

    keySword.visible = true;
    keySwordAbout.show();

    dragonRing.visible = false;
    dragonRingAbout.hide();

    life.visible = false;
    lifeAbout.hide();

    rightKey.hide();
    rightKey1.visible = false;

    leftKey.hide();
    leftKey2.visible = false;

    spaceKey.hide();
    spaceKey3.visible = false;

    startAbout.hide();
    startBtn.hide();
  }
  if(state2 === 1){
    push();
    noStroke();
    fill(21, 244, 238, 70);
    ellipse(260, 150, 250);
    pop();

    keySword.visible = false;
    keySwordAbout.hide();

    dragonRing.rotation -=10;
    dragonRing.visible = true;
    dragonRingAbout.show();

    life.visible = false;
    lifeAbout.hide();

    rightKey.hide();
    rightKey1.visible = false;

    leftKey.hide();
    leftKey2.visible = false;

    spaceKey.hide();
    spaceKey3.visible = false;

    startAbout.hide();
    startBtn.hide();
  }
  if(state2 === 2){
    push();
    noStroke();
    fill(21, 244, 238, 70);
    ellipse(260, 150, 250);
    pop();

    life.rotation +=5;
    life.visible = true;
    lifeAbout.show();

    dragonRing.visible = false;
    dragonRingAbout.hide();

    keySword.visible = false;
    keySwordAbout.hide();

    rightKey.hide();
    rightKey1.visible = false;

    leftKey.hide();
    leftKey2.visible = false;

    spaceKey.hide();
    spaceKey3.visible = false;

    startAbout.hide();
    startBtn.hide();
  }
  if(state2 === 3){
    push();
    noStroke();
    fill(21, 244, 238, 70);
    ellipse(260, 150, 250);
    pop();

    rightKey.show();
    rightKey1.visible = true;

    dragonRing.visible = false;
    dragonRingAbout.hide();

    keySword.visible = false;
    keySwordAbout.hide();

    life.visible = false;
    lifeAbout.hide();

    leftKey.hide();
    leftKey2.visible = false;

    spaceKey.hide();
    spaceKey3.visible = false;

    startAbout.hide();
    startBtn.hide();
  }
  if(state2 === 4){
    push();
    noStroke();
    fill(21, 244, 238, 70);
    ellipse(260, 150, 250);
    pop();

    leftKey.show();
    leftKey2.visible = true;

    dragonRing.visible = false;
    dragonRingAbout.hide();

    keySword.visible = false;
    keySwordAbout.hide();

    life.visible = false;
    lifeAbout.hide();

    rightKey.hide();
    rightKey1.visible = false;

    spaceKey.hide();
    spaceKey3.visible = false;

    startAbout.hide();
    startBtn.hide();

  }
  if(state2 === 5){
    push();
    noStroke();
    fill(21, 244, 238, 70);
    ellipse(260, 150, 250);
    pop();
    spaceKey.show();
    spaceKey3.visible = true;

    dragonRing.visible = false;
    dragonRingAbout.hide();

    keySword.visible = false;
    keySwordAbout.hide();

    life.visible = false;
    lifeAbout.hide();

    rightKey.hide();
    rightKey1.visible = false;

    leftKey.hide();
    leftKey2.visible = false;

    startAbout.hide();
    startBtn.hide();
  }
  if(state2 === 6){
    push();
    noStroke();
    fill(21, 244, 238, 70);
    ellipse(410, 150, 170);
    ellipse(490, 150, 170);
    pop();
    startAbout.show();
    startBtn.show();

    dragonRing.visible = false;
    dragonRingAbout.hide();

    keySword.visible = false;
    keySwordAbout.hide();

    life.visible = false;
    lifeAbout.hide();

    rightKey.hide();
    rightKey1.visible = false;

    leftKey.hide();
    leftKey2.visible = false;

    spaceKey.hide();
    spaceKey3.visible = false;
  }

}

function state_3_setup(){}

function state_3_draw(){
  background('green');  

}

function mouseClicked(){

  var d1 = dist(width-75, height - 70, mouseX, mouseY);
  if(d1< 80){
    if(state2 <= 5){
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
          second.loop();
          second.setVolume(0.8);
      }
    }
  );
  
} 
 