var canvas;
var backgroundImg1, backgroundImg4;
var thor ;
var stepsOn = [];

const BEGINNING = 0;
const PLAY_LEVEL1 = 1;
const PLAY_LEVEL2 = 2;
const GAME_END2 = 4 ;

var gameState = PLAY_LEVEL1;
var ground, stand, standImg, left_Wall, right_wall;
var steps = [];
var deaths = [];
var randX, randVelocity; 
// gameState when 1
const LEFT = -5;
const RIGHT = 5;
var right_change  = [RIGHT, RIGHT, RIGHT, RIGHT];
var left_change  = [LEFT, LEFT, LEFT];
var deathImg, deathImg2, death;
var death_V_change = [0, 0, 0, 0, 0, 0, 0];

var left_ellipses = [];
var right_ellipses = [];

var weaponImg = [];
var weapons = [];
var swordOfDeathImg;
var ellipse_swords = [];
var weapon_visible = [ 1, 0, 0, 0, 0, 0, 0];
var death_feedback = [0, 0, 0, 0, 0, 0, 0];
var deathFeedbacks = [];
var shootFireGroup, shootFireGroup2;
var shoot2;
var standBalls = [];
var deathImg3;

//gameState when 2
var thorRight, thorLeft, thorShield, violateRings;
var thorShieldImg;
var keyWeaponImg, keyWeapon, fireRingImg, fireMove, fireStepsImg ;
var fireShootImg1, fireShootImg2;
var lifeImg, noLifeImg;
var designs = [];
var designs2 = [];
var designs1 = [];
var designs3 = [];
var ellipseImg;
var rings = [];
var ringImg;
var shoot, shoot1;
var left_wall, right_wall;
var deathRings = [];
var deathRingImg, ChooseImg;
var standBallImg1, standBallImg2, standBallImg3;

// gameEnd 
var gameOver
var retryBtn, restartBtn
var signature;
var share;
var copyInput;
var copyshare;
var shield = false;
// sounds
var hitSound;
var swordSound;
var screaming;
var music, music2, music3;
var music1 = true;
var click;

function preload(){
  //background
  backgroundImg1 = loadImage("assets/backgroundImg2.jpg");
  backgroundImg4 = loadImage("assets/gameEnd.jpg");
  //sounds
  swordSound = loadSound("assets/swordSound.wav");
  hitSound = loadSound("assets/hitSound.wav");
  swish = loadSound("assets/swish.wav");
  screaming = loadSound("assets/screaming.mp3");
  music = loadSound("assets/music.mp3");
  music2 = loadSound("assets/music2.mp3");
  click = loadSound('assets/sell2.mp3');
  music3  = loadSound("assets/music3.mp3");

  deathImg = loadImage("assets/death2.png");
  deathImg2 = loadImage("assets/fireDeath1.png");
  deathImg3 = loadImage("assets/death3.png");

  death_feedback_Img = loadImage("assets/death_feedback.png");

  standImg = loadImage("assets/ground.png");
  stepFireImage = loadImage("assets/fireStep.png");

  weaponImg[0] = loadImage("assets/weapons/weapon1.png");
  weaponImg[1] = loadImage("assets/weapons/weapon2.png");
  weaponImg[2] = loadImage("assets/weapons/weapon3.png");
  weaponImg[3] = loadImage("assets/weapons/weapon4.png");
  weaponImg[4] = loadImage("assets/weapons/weapon5.png");
  weaponImg[5] = loadImage("assets/weapons/weapon6.png");
  weaponImg[6] = loadImage("assets/weapons/weapon7.png");

  swordOfDeathImg = loadImage("assets/weapons/swordOfDeath.png");

  // gamestate 2 
  fireImg = loadImage("assets/gameState2/fire2png.png");
  keyWeaponImg = loadImage("assets/gameState2/keySword.png");
  fireRingImg = loadImage("assets/gameState2/dragonFire.png");
  fireMoveImg = loadImage("assets/gameState2/fire2png.png");
  fireStepsImg = loadImage("assets/gameState2/fireSteps.png");
  deathRingImg = loadImage("assets/gameState2/R1.png");
  ChooseImg = loadImage("assets/blueImage.png");

  thorRight = loadImage("assets/warriorImage/thorRight.png");
  thorLeft= loadImage("assets/warriorImage/thorLeft.png");

  thorShieldImg = loadImage("assets/greenLight2.png");
  fireShootImg1 = loadImage("assets/gameState2/fire1.png");
  fireShootImg2 = loadImage("assets/gameState2/R2.png");
  lifeImg = loadImage("assets/gameState2/Green.png");
  noLifeImg = loadImage("assets/gameState2/fireIceOrb.png");

  violateRings = loadImage("assets/and.png");
  ringImg = loadImage("assets/yoyo.png");
  ellipseImg = loadImage("assets/thorShield2.png");

  standBallImg1 = loadImage("assets/gameState2/blueOrb.png");
  standBallImg2 = loadImage("assets/gameState2/lifeEnd.png");
  standBallImg3 = loadImage("assets/gameState2/fireIceOrb.png");

}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  console.log(noLifeImg);

  musicPlay();

  // ground create 
  ground = createSprite(width/2, height+10 , width, 20);
  ground3 = createSprite(ground.x, ground.y-0.1 , width, 20);
  ground3.visible = false;

  // create walls 
  left_wall = createSprite(0, height/2, 20, height);
  left_wall.visible = false;
  right_wall = createSprite(width, height/2, 20, height);
  right_wall.visible = false;

  signature1 = createElement('h2', 'by Swagatika');
  signature1.position( 20,height - 32);
  signature1.class('signature1');
  signature1.hide();

  //gameEnd 
  gameEnd2();

if(gameState === 1){

// beginning stand point 
stand = createSprite(100, height -10, 200, 20);
stand.addImage(standImg);
stand.scale = 0.1;
stand.setCollider("rectangle", 0, -90, stand.width, 20);

// create Thorgrin 
thor = createSprite(stand.x, stand.y-50, 10, 40);
//thor.shapeColor = "red";
thor.addImage('thorLeft', thorLeft);
thor.addImage('thorRight', thorRight);
thor.changeImage('thorRight');
thor.scale = 0.02;

// thorshield 
thorShield = createSprite(thor.x, thor.y);
thorShield.addImage('noShield',thorShieldImg);
thorShield.addImage('shield',ringImg);
thorShield.changeImage('noShield');


thorShield.scale = 0.15;
thorShield.depth = thor.depth - 1;

shootFireGroup = new Group();

// steps create 
  for (var j = 0; j < 7; j++){
    randX = random(200, width - 200);
    var step = createSprite(randX, j*90+80, 200, 15);
    steps.push(step);
    randVelocity = random(-3, 3);
  }
  console.log('jjjjjjjjjjjjjjjjjjjjjjjjjj',height - steps[6].y)
// create death 
  for (var i = 0; i < steps.length; i++){
    // create invisible steps to collide
    stepOn = createSprite(steps[i].x, steps[i].y+0.5, steps[i].width , steps[i].height -1);
    stepsOn.push(stepOn);
    stepOn.visible = false;

    death = createSprite(steps[i].x, steps[i].y -33);
    deaths.push(death);
    death.addImage('deathImg',deathImg);
    death.addImage('deathImg2', deathImg2)
    death.addImage('deathImg3',deathImg3);
    death.changeImage('deathImg');
    death.scale = 0.055;

    var deathRing = createSprite(death.x, death.y - 18.5);
    deathRing.addImage('noChoose',deathRingImg);
    deathRing.addImage('choose',ChooseImg);
    deathRing.changeImage('noChoose');
    deathRing.scale = 0.05;
    deathRings.push(deathRing);

    deathRing.depth = death.depth -1;

      var deathFeedback_y = [ (height-80) - 0*100,
        (height-80) - 1*100,
        (height-80) - 2*100,
        (height-80) - 3*100,
        (height-80) - 4*100,
        (height-80) - 5*100,
        (height-80) - 6*100
      ]
      var x = 35;
      var y = deathFeedback_y[i];
      var deathFeedback = createSprite(x , y);
      deathFeedbacks.push (deathFeedback);
      deathFeedback.addImage(death_feedback_Img);
      deathFeedback.scale = 0.025
      deathFeedback.visible = false;
  }

  deaths[deaths.length-1].changeImage('deathImg2');
  deaths[deaths.length-1].scale = 0.1;
  deaths[deaths.length-1].setCollider('circle', 0, 0, 140);
  deaths[deaths.length-1].y = steps[steps.length - 1].y-5;
  deathRings[deaths.length-1].y = deaths[deaths.length-1].y;

  deaths[3].changeImage('deathImg2');
  deaths[3].scale = 0.1;
  deaths[3].setCollider('circle', 0, 0, 140);
  deaths[3].y = steps[3].y-7;
  deathRings[3].y = deaths[3].y;


  deaths[1].changeImage('deathImg2');
  deaths[1].scale = 0.1;
  deaths[1].setCollider('circle', 0, 0, 140);
  deaths[1].y = steps[1].y-5;
  deathRings[1].y = deaths[1].y;


  deaths[0].setCollider('obb', 0, 0, 130, 140);
  deaths[2].setCollider('obb', 0, 0, 130, 140);
  deaths[4].setCollider('obb', 0, 0, 130, 140);
  deaths[5].setCollider('obb', 0, 0, 130, 140);



// create feedback_ellipses
  for(var i =0; i<7; i++){
    var left_ellipse = new Feedback_ellipse(40, (height-80) - i*100, 30);
    left_ellipses.push(left_ellipse);

    var design = createSprite(left_ellipse.x, left_ellipse.y);
    design.addImage(ellipseImg);
    design.scale = 0.23;
    designs.push(design);

    var design2 = createSprite(left_ellipse.x, left_ellipse.y);
    design2.addImage(violateRings);
    design2.scale = 0.14;
    designs2.push(design2);
    deathFeedbacks[i].depth = design.depth + 1;
    deathFeedbacks[i].depth = design2.depth + 1;


    var right_ellipse = new Feedback_ellipse(width - 50, (height-80) - i*100, 30);
    right_ellipses.push(right_ellipse);

    var design1 = createSprite(right_ellipse.x, right_ellipse.y);
    design1.addImage(ellipseImg);
    design1.scale = 0.23;
    designs1.push(design1);

    var design3 = createSprite(right_ellipse.x, right_ellipse.y);
    design3.addImage(violateRings);
    design3.scale = 0.14;
    designs3.push(design3);

    

  }

// create weapons
for(var i = 0; i<7;i++){
  var weaponPosition = [
    [400, height - 300],
    [width-400, 500],
    [width-400, 200],
    [width/2 , 100],
    [width-width/2, 400],
    [width/2-500, 50],
    [200, 500]
  ]

  var x = weaponPosition[i][0];
  var y = weaponPosition[i][1];
  var weapon = createSprite(x, y);
  weapon.addImage(weaponImg[i]);
  weapon.scale = 0.2
  weapons.push(weapon);

  var ring = createSprite(weapons[i].x, weapons[i].y);
  ring.addImage(ringImg);
  ring.scale = 0.2;
  ring.depth = steps[0].depth - 1;
  rings.push(ring);
  
}
// attractive stand 
for(var i = 0; i<11 ;i++){
  var standBall = createSprite(i*21 +10, stand.y);
  if(i % 2 ===0){
    standBall.addImage(standBallImg1);
  }if(i % 2 !== 0){
    standBall.addImage(standBallImg2);
  }
  standBall.scale = 0.045;
  standBalls.push(standBall);
}

}
}


function draw() {
  
  if(gameState === BEGINNING){
    beginning();
  }
  if(gameState === PLAY_LEVEL1){
    play_level_1();
  }
  if(gameState === PLAY_LEVEL2){
    play_level_2();
  }
  if(gameState === GAME_END2){
    game_end_2();
    
  }

  // draw sprites
   push ();
   fill(200,192, 203, 70);
   drawSprites();
   pop ();

}
function play_level_1(){
  // background set
  background(backgroundImg1);  
  imageMode (CENTER);

  thorShield.x = thor.x;
  thorShield.y = thor.y - 5;
  thorShield.rotation +=10;
  if(shoot !== undefined){
    shoot.rotation +=25
  }if(shoot1 !== undefined){
    shoot1.rotation -=25
  }

  for(var i = 0; i<11 ;i++){
    if(i % 2 ===0){
      standBalls[i].rotation +=10;
    }if(i % 2 !==0){
      standBalls[i].rotation -=5;

    }
  }
  // change shield Image when touch sword 
  if(shield){
    thorShield.changeImage('shield')
  }else{
    thorShield.changeImage('noShield')
  }

  for(var ring of rings){
    ring.rotation +=20;
  }for(var deathRing of deathRings){
    deathRing.rotation +=10
  } 
  deathRings[deaths.length-1].y = deaths[deaths.length-1].y;
  deathRings[3].y = deaths[3].y;
  deathRings[1].y = deaths[1].y;



  for(var design of designs2){
    design.rotation +=10;
  }for(var design of designs3){
    design.rotation -=10;
  }for(var design of designs){
    design.rotation +=10;
  }for(var design of designs1){
    design.rotation +=10;
  }

  // add gravity 
  thor.velocityY = thor.velocityY + 0.5;

  for(var step of steps){
    step.shapeColor = rgb(255, 255);
      image(stepFireImage, step.x, step.y-18, 200, 50)
  }

if(steps !== undefined){
  // steps[0] velocity set
  if(right_change[0] === RIGHT){
      steps[0].velocityX = 2;
  }
  if(steps[0].x > width-150){
      right_change[0] = LEFT;
      steps[0].velocityX = -2;
  }
  if(steps[0].x < 150){
      steps[0].velocityX = 2;
  }

  // steps[2] velocity set
  if(right_change[1] === RIGHT){
    steps[2].velocityX = 3;
  }
  if(steps[2].x > width-150){
      right_change[1] = LEFT;
      steps[2].velocityX = -3;
  }
  if(steps[2].x < 150){
      steps[2].velocityX = 3;
  }
  
  // steps[4] velocity set
  if(right_change[2] === RIGHT){
    steps[4].velocityX = 2.5;
  }
  if(steps[4].x > width-150){
    right_change[2] = LEFT;
    steps[4].velocityX = -2.5;
  }
  if(steps[4].x < 150){
    steps[4].velocityX = 2.5;
  }
  
  // steps[6] velocity set
  if(right_change[3] === RIGHT){
    steps[steps.length-1].velocityX = 3;
  }
  if(steps[steps.length-1].x > width-150){
    right_change[3] = LEFT;
    steps[steps.length-1].velocityX = -3;
  }
  if(steps[steps.length-1].x < 150){
    steps[steps.length-1].velocityX = 3;
  }
  
  // steps[1] velociy set 
  if(left_change[0]=== LEFT){
    steps[1].velocityX = -3;
  }
  if(steps[1].x < 150){
    left_change[0] = RIGHT;
    steps[1].velocityX = 3;
  }
  if(steps[1].x > width-150){
    steps[1].velocityX = -3;
  }

  // steps[3] velociy set 
  if(left_change[1]=== LEFT){
    steps[3].velocityX = -2.8;
  }
  if(steps[3].x < 150){
    left_change[1] = RIGHT;
    steps[3].velocityX = 2.8;
  }
  if(steps[3].x > width-150){
    steps[3].velocityX = -2.8;
  }

  // steps[5] velociy set 
  if(left_change[2]=== LEFT){
    steps[5].velocityX = -3.2;
  }
  if(steps[5].x < 150){
    left_change[2] = RIGHT;
    steps[5].velocityX = 3.2;
  }
  if(steps[5].x > width-150){
    steps[5].velocityX = -3.2;
  }
}
if(deaths !== undefined){

    for(var i = 0; i < steps.length; i++){

      let right = steps[i].velocityX;
      let left = -steps[i].velocityX

      if(steps[i].velocityX === right){
        if(death_V_change[i]===0){
          deaths[i].velocityX = -3.5;
          deaths[i].changeImage('deathImg');
        }
        if(deaths[i].x <= steps[i].x -80){
          death_V_change[i]= 1 ;

          deaths[i].velocityX = 3.5;
          deaths[i].changeImage('deathImg3');

        }
        if(deaths[i].x >= steps[i].x +80){
          deaths[i].velocityX = -3.5;
          deaths[i].changeImage('deathImg');

        }
           
      }
      if(steps[i].velocityX === left){
        if(death_V_change[i+1]===0){
          deaths[i].velocityX = -3.5;
        }
        if(deaths[i].x <= steps[i].x -80){
          death_V_change[i+1] = 1;
          deaths[i].velocityX = 3.5;
        }
        if(deaths[i].x >= steps[i].x +80){
          deaths[i].velocityX = -3.5;
        }
    } 
    deaths[deaths.length-1].velocityX = steps[steps.length-1].velocityX;
    deaths[deaths.length-1].changeImage('deathImg2');
    deaths[1].changeImage('deathImg2');
    deaths[3].changeImage('deathImg2');


    setTimeout(() => {
      if(deaths[1].y > 140){
      deaths[1].velocityY = -1;}
      if(deaths[1].y < 100){
        deaths[1].velocityY = 1;
      }    
    }, 1000);


    setTimeout(() => {
      if(deaths[deaths.length-1].y > height-130){
      deaths[deaths.length-1].velocityY = -1;}

      if(deaths[deaths.length-1].y < height-140){
        deaths[deaths.length-1].velocityY = 1;
      }    
    }, 1000);


    deathRings[i].x = deaths[i].x;
    
    }
}
    for(var i = 0; i< 7; i++){

      if(weapon_visible[i] === 0){
        weapons[i].visible = false;
        rings[i].visible = false;
    
      }
      if(weapon_visible[i] === 1){
        weapons[i].visible = true;
        rings[i].visible = true;
       
      }
    if(weapon_visible[i] === 2){
      weapons[i].position.x = width - 50;
      weapons[i].position.y = (height-80) - i*100;
      weapons[i].scale = 0.1;
      rings[i].x = width + 500;
      rings[i].y = height + 500;
      }
    }
if(weapons !== undefined){
// [0]
    if(weapon_visible[0]=== 1 && thor.isTouching(weapons[0])){
       swordSound.play();
        weapon_visible[0] = 2;
        deathRings[deathRings.length-1].changeImage('choose');
        deathRings[deathRings.length-1].scale = 0.07
        if(!shield){
          shield =true
        }setTimeout(() => {
          if(shield){
            shield = false
          }
        }, 20000);
    }
    if(weapon_visible[0] === 2 && thor.isTouching(steps[steps.length-1])){
      deaths[deaths.length-1].visible = false;
      deathRings[deathRings.length-1].visible = false;

      if(death_feedback[0] === 0){
        death_feedback[0] = 1;
      }
    }if(death_feedback[0]===1){
      deathFeedbacks[0].visible = true;
      weapon_visible[1] = 1;
    }
// [1]  
  if(weapon_visible[1]=== 1 && thor.isTouching(weapons[1])){
    swordSound.play();

      weapon_visible[1] = 2;
      deathRings[3].changeImage('choose');
      deathRings[3].scale = 0.07

      if(!shield){
        shield =true
      }setTimeout(() => {
        if(shield){
          shield = false
        }
      }, 20000);
  }
if(weapons[1].x === width - 50){
  if(thor.isTouching(steps[3])){
    deaths[3].visible = false;
    deathRings[3].visible = false;

    if(death_feedback[1] === 0){
      death_feedback[1] = 1;
    } }
  }if(death_feedback[1]===1){
    deathFeedbacks[1].visible = true;
    weapon_visible[2] = 1;
  }

// [2]  
if(weapon_visible[2]=== 1 && thor.isTouching(weapons[2])){
  swordSound.play();

  weapon_visible[2] = 2;
  deathRings[4].changeImage('choose');

  if(!shield){
    shield =true
  }setTimeout(() => {
    if(shield){
      shield = false
    }
  }, 20000);
}
if(weapons[2].x === width - 50){
if(thor.isTouching(steps[4])){
  deaths[4].visible = false;
  deathRings[4].visible = false;

    if(death_feedback[2] === 0){
      death_feedback[2] = 1;
    } }
}if(death_feedback[2]===1){
    deathFeedbacks[2].visible = true;
    weapon_visible[2+1] = 1;
}

// [3]  
if(weapon_visible[3]=== 1 && thor.isTouching(weapons[3])){
  swordSound.play();

  weapon_visible[3] = 2;
  deathRings[0].changeImage('choose');

  if(!shield){
    shield =true
  }setTimeout(() => {
    if(shield){
      shield = false
    }
  }, 20000);
}
if(weapons[3].x === width - 50){
if(thor.isTouching(steps[0])){
  deaths[0].visible = false;
  deathRings[0].visible = false;

    if(death_feedback[3] === 0){
      death_feedback[3] = 1;
    } }
}if(death_feedback[3]===1){
    deathFeedbacks[3].visible = true;
    weapon_visible[3+1] = 1;
}

// [4]  
if(weapon_visible[4]=== 1 && thor.isTouching(weapons[4])){
  swordSound.play();

  weapon_visible[4] = 2;
  deathRings[2].changeImage('choose');

  if(!shield){
    shield =true
  }setTimeout(() => {
    if(shield){
      shield = false
    }
  }, 20000);
}
if(weapons[4].x === width - 50){
if(thor.isTouching(steps[2])){
  deaths[2].visible = false;
  deathRings[2].visible = false;

    if(death_feedback[4] === 0){
      death_feedback[4] = 1;
    } }
}if(death_feedback[4]===1){
    deathFeedbacks[4].visible = true;
    weapon_visible[4+1] = 1;
}

// [5]  
if(weapon_visible[5]=== 1 && thor.isTouching(weapons[5])){
  swordSound.play();

  weapon_visible[5] = 2;
  deathRings[5].changeImage('choose');

  if(!shield){
    shield =true
  }setTimeout(() => {
    if(shield){
      shield = false
    }
  }, 20000);
}
if(weapons[5].x === width - 50){
if(thor.isTouching(steps[5])){
  deaths[5].visible = false;
  deathRings[5].visible = false;
  
    if(death_feedback[5] === 0){
      death_feedback[5] = 1;
    } }
}if(death_feedback[5]===1){
    deathFeedbacks[5].visible = true;
    weapon_visible[5+1] = 1;
}

// [6]  
if(weapon_visible[6]=== 1 && thor.isTouching(weapons[6])){
  swordSound.play();

  weapon_visible[6] = 2;
  deathRings[1].changeImage('choose');
  deathRings[1].scale = 0.07


  if(!shield){
    shield =true
  }setTimeout(() => {
    if(shield){
      shield = false
    }
  }, 20000);
}
if(weapons[6].x === width - 50){
  if(thor.isTouching(steps[1])){
    deaths[1].visible = false;
    deathRings[1].visible = false;

    if(death_feedback[6] === 0){
      death_feedback[6] = 1;
    } }
}if(death_feedback[6]===1){
    deathFeedbacks[6].visible = true;
    weapon_visible[6+1] = 1;
}

}
  if(deathFeedbacks[6].visible){
    window.open("Winning page/index.html");
    window.close();
  }

  // move thor 
  if(keyDown(LEFT_ARROW)){
    thor.x -=6;
    thor.changeImage('thorLeft');
  }
  if(keyDown(RIGHT_ARROW)){
    thor.x +=6;
    thor.changeImage('thorRight');
  }
  if(keyDown(32)){
    thor.y -=9.8;
  }

  // collide
  thor.collide(stand);
  thor.collide(ground);
  thor.collide(stepOn);
  thor.collide(left_wall);
  thor.collide(right_wall);


  for (var i = 0; i< steps.length; i++){
    stepsOn[i].x = steps[i].x;
    thor.collide(stepsOn[i]); 

    for(var step of steps){

      if(thor.isTouching(steps[i])){
        thor.velocityX = steps[i].velocityX
      }
      if(!thor.isTouching(steps)){
        thor.velocityX = 0;    }
    }
  
  if(i % 2===0){
    if(thor.isTouching(steps[i]) && !deaths[i].visible){
      shoot_fire(-100, steps[i].y - 35, fireShootImg1, 0.119, 10);
    }
  }if( i % 2!==0){
    if(thor.isTouching(steps[i]) && !deaths[i].visible){
      shoot_fire(width+100,  steps[i].y - 35, fireShootImg2, 0.1, -10);
    }
  }

  // give power to thor 

  if(thor.isTouching(ground3)){
    screaming.play();
    gameState = GAME_END2;
    if(music1){
      music3.play();
      music3.setVolume(2);
      music2.play();
      music2.setVolume(0.3)
      music.stop();
    }music1 = false;
    
  }if(!shield){
    if(thor.isTouching(shootFireGroup)){
      hitSound.play();
      screaming.play();
      gameState = GAME_END2;
      if(music1){
        music3.play();
        music3.setVolume(2);
        music2.play();
        music2.setVolume(0.3)
        music.stop();
      }music1 = false;

    }if(deaths[i].visible && thor.isTouching(deaths[i])){
      screaming.play();
      gameState = GAME_END2;
      if(music1){
        music3.play();
        music3.setVolume(2);
        music2.play();
        music2.setVolume(0.3)
        music.stop();
      }music1 = false;

    }
  }if(shield){
    if(thor.isTouching(shootFireGroup)){
      swish.play();
    }
  }
}
  
}

    function shoot_fire(x, y, image, scale, velocity){
      if(frameCount %180 === 0){
      shoot = createSprite (x , y) ;
      shoot.addImage(image) ;
      shoot.scale = scale ;
      shoot.debug = false;
      shoot.setCollider("circle", 0, 0, 30)
      shoot.velocityX = velocity ;
      shoot.lifetime = 350 ;

      shoot1 = createSprite (width - x , y) ;
      shoot1.addImage(image) ;
      shoot1.scale = scale ;
      shoot1.debug = false;
      shoot1.setCollider("circle", 0, 0, 30)
      shoot1.velocityX = -velocity ;
      shoot1.lifetime = 350 ;

      shootFireGroup.add(shoot) ;
      shootFireGroup.add(shoot1) ;

      }
    }
    
function gameEnd2(){ 

  shootFireGroup2 = new Group();

      gameOver = createElement('h1', 'GAME OVER');
      gameOver.position(100, height/12);
      gameOver.class('resetText'); 
      gameOver.hide();
      
      signature = createElement('h2', 'by Swagatika');
      signature.position(15,height - 80);
      signature.class('signature');
      signature.hide();
    
      // button for end gameState 
      retryBtn = createButton("Retry");
      retryBtn.position(215, height/2);
      retryBtn.class('button');
      retryBtn.hide();
      retryBtn.mouseClicked(()=>{
        click.play();
        window.location.reload();

      });   
    
      restartBtn = createButton("Restart");
      restartBtn.position(500, height/2);
      restartBtn.class('button');
      restartBtn.hide();
      restartBtn.mouseClicked(()=>{
        click.play();
        window.open("https://swag3009.github.io/Abyss/");
        window.close();
      });   
    
      /*share = createElement('h2','Would you like to challenge this game to someone?');
      share.position(105, height/2+90);
      share.class('share');
      share.hide();
    
      copyInput = createInput("https://swagatika244.github.io/Initial.github.io/");
      copyInput.position(390, height/2+150+70);
      copyInput.size(300, 40);
      copyInput.class('inputBox');
      copyInput.hide();
    
      copyshare = createElement('h1','Copy & Share');
      copyshare.position(210, height/2+142+70);
      copyshare.class('copyShare');
      copyshare.hide();*/
    
      //const val = copyInput.value();
      //console.log(val)
    
}
function design_shoot(){
  if(frameCount %120 === 0){
    shoot2 = createSprite (-10 , gameOver.y+145) ;
    shoot2.addImage(deathRingImg) ;
    shoot2.scale = 0.1 ;
    shoot2.debug = false;
    shoot2.setCollider("circle", 0, 0, 30);
    
    shoot2.velocityX = 10 ;
    shoot2.lifetime = 90 ;
    shootFireGroup2.add(shoot2) ;
    }
  }
function game_end_2(){
  background(backgroundImg4);  
  design_shoot();
  if(shoot2 !== undefined){
    shoot2.rotation +=25
  }
  for(var i=0; i< steps.length; i++){
    steps[i].destroy();
    stepsOn[i].destroy();
    deathFeedbacks[i].destroy();
    deaths[i].destroy();

    designs[i].destroy();
    designs2[i].destroy();
    designs1[i].destroy();
    designs3[i].destroy();
    weapons[i].destroy();
    rings[i].destroy();
    deathRings[i].destroy();
  }for(var standBall of standBalls){
    standBall.destroy();
  }
  
  stand.destroy();
  thor.destroy();
  thorShield.destroy();
  shootFireGroup.destroyEach();
  

  
  gameOver.show();
  //signature.show();
  retryBtn.show();
  restartBtn.show();
  //share.show();
  //copyInput.show();
  //copyshare.show();
  signature1.show();

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
          if(gameState === PLAY_LEVEL1){
          music.loop();
          music.setVolume(0.5);
        }
      }
    }
  );
  
}


