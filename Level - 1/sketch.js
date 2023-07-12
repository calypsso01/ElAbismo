var backgroundImg3,
    backgroundImg4;

const BEGINNING = 0,
      PLAY_LEVEL1 = 1,
      PLAY_LEVEL2 = 2,
      GAME_END2 = 4 ;

var gameState = PLAY_LEVEL2;
var ground, 
    stand, 
    standImg, 
    left_Wall, 
    right_wall,
    randX,
    randVelocity;
var steps = [], deaths = [];

// gameState when 1
const LEFT = -5;
const RIGHT = 5;

//gameState when 2
var startPoint,
    ground3,
    thor2, 
    thorRight, 
    thorLeft, 
    thorShield,
    thorShieldImg;

var steps1 = [],
    stepsOn1 = [],
    steps2 = [],
    stepsOn2 = [],
    fireSteps1 = [],
    fireSteps2 = [],
    lifes=[],
    lifesV = [];

var array0 = [1, 1, 1, 1, 1, 1, 1, 1, 1];
var array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var keyWeaponImg, 
    keyWeapon, 
    rectangle, 
    square, 
    fireRingImg, 
    fireMove, 
    fireStepsImg,
    shootFireGroup, 
    fireShootImg1, 
    fireShootImg2,
    shoot,
    lifeImg,
    noLifeImg;

var lifeTime = 1,
    lifeEnd = 1,
    signature1,
    shoot2;

// gameEnd 
var gameOver,
    retryBtn, restartBtn,
    signature,
    share,
    copyInput,
    copyshare;

//sound
var music, 
    lifeTouch,
    music1 = true,
    hitSound, 
    music2, 
    music3;

function preload(){
  backgroundImg3 = loadImage("assets/backgroundImg3.jpg");
  backgroundImg4 = loadImage("assets/gameEnd.jpg");

  standImg = loadImage("assets/ground.png");
  stepFireImage = loadImage("assets/fireStep.png");

  //music
  music = loadSound("assets/music.mp3");
  lifeTouch = loadSound("assets/lifeTouch.wav");
  music2 = loadSound("assets/music2.mp3");
  music3  = loadSound("assets/music3.mp3");
  dragonFire = loadSound("assets/dragonFire.mp3");
  hitSound =  loadSound("assets/hitSound.wav");

  // gamestate 2 
  fireImg = loadImage("assets/gameState2/fire2png.png");
  keyWeaponImg = loadImage("assets/gameState2/keySword.png");
  fireRingImg = loadImage("assets/gameState2/dragonFire.png");
  fireMoveImg = loadImage("assets/gameState2/fire2png.png");
  fireStepsImg = loadImage("assets/gameState2/fireSteps.png");

  thorRight = loadImage("assets/warriorImage/thorRight.png");
  thorLeft= loadImage("assets/warriorImage/thorLeft.png");

  thorShieldImg = loadImage("assets/gameState2/light.png");
  fireShootImg1 = loadImage("assets/gameState2/R1.png");
  fireShootImg2 = loadImage("assets/gameState2/R2.png");
  lifeImg = loadImage("assets/gameState2/Green.png");
  noLifeImg = loadImage("assets/gameState2/fireIceOrb.png")

}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);

  // ground create 
  ground = createSprite(width/2, height+80 , width, 30);
  ground3 = createSprite(ground.x, height+50 , width, 60);
  ground3.visible = false;

  // create walls 
    left_wall = createSprite(0, height/2, 20, height*8);
    left_wall.visible = false;
    right_wall = createSprite(width, height/2, 20, height*8);
    right_wall.visible = false;

  signature1 = createElement('h2', 'by Swagatika');
  signature1.position(20,height - 35);
  signature1.class('signature1');
  signature1.hide();

  //gameEnd 
  gameEnd2()
  
if(gameState === 2){

  musicPlay();
  
  // beginning start point 
  startPoint = createSprite(100, height -10, 200, 20);
  startPoint.addImage(standImg);
  startPoint.scale = 0.1;
  startPoint.setCollider("rectangle", 0, -90, startPoint.width, 20);

   // steps create 
  for (var j = 0; j < 9; j ++){
    randX = random(200, width - 200);
    var step = createSprite(randX, (height - (85*3+10))- j*190+160, 225, 17);
    steps1.push(step);
  }
  for (var i = 0; i< steps1.length ; i++){
    var stepOn1 = createSprite(steps1[i].x, steps1[i].y+0.5, steps1[i].width, steps1[i].height-1);
    stepOn1.shapeColor = "red";
    stepsOn1.push(stepOn1);
  }
  for(var i = 0; i< steps1.length ; i++){
    var fireStep = createSprite(steps1[i].x, steps1[i].y-6.8);
    fireSteps1.push(fireStep);
    fireStep.addImage(fireStepsImg);
    fireStep.scale = 0.064;
  }

  // steps2 create 
  for (var j = 0; j < 9; j++){
    randX = random(200, width - 200);
    var step = createSprite(randX,(height - (85*4+20))- j*190+160, 175, 17);
    steps2.push(step);
  }
  for (var i = 0; i< steps2.length ; i++){
    var stepOn2 = createSprite(steps2[i].x, steps2[i].y+0.5 , steps2[i].width, steps2[i].height-1);
    stepOn2.shapeColor = "blue";
    stepsOn2.push(stepOn2);
  }
  for(var i = 0; i< steps2.length ; i++){
    var fireStep2 = createSprite(steps2[i].x, steps2[i].y-3.3);
    fireSteps2.push(fireStep2);
    fireStep2.addImage(fireStepsImg);
    fireStep2.scale = 0.0495
  }

// key weapon 
  keyWeapon = createSprite(width/2, steps2[steps2.length-1].y-150);
  keyWeapon.addImage(keyWeaponImg);
  keyWeapon.debug = false;
  keyWeapon.setCollider("obb", 0, 0)
  keyWeapon.scale = 0.13;
  keyWeapon.rotation = -45;
  keyWeapon.velocityX = 3;
  rectangle = createSprite(keyWeapon.x+5, keyWeapon.y+6, 10, 140);
  rectangle.visible = false;
  square = createSprite(keyWeapon.x+8, keyWeapon.y-40, 60, 40);
  square.visible = false;

// fire Ring
  fireRing = createSprite(keyWeapon.x-2, keyWeapon.y+20);
  fireRing.addImage(fireRingImg);
  fireRing.scale = 0.135;
  fireRing.debug = false ;
  fireRing.setCollider("circle", 0, 0, 220);
  keyWeapon.depth = fireRing.depth + 1;

  fireMove = createSprite(startPoint.x-110, startPoint.y-5);
  fireMove.addImage(fireMoveImg);
  fireMove.scale = 0.33;
  startPoint.depth = fireMove.depth + 1;

// create Thorgrin 
  thor2 = createSprite(startPoint.x + 100, startPoint.y-50, 10, 30);
  thor2.debug = false;
  thor2.addImage('thorRight',thorRight);
  thor2.addImage('thorLeft',thorLeft);
  thor2.scale = 0.0185;

  thorShield = createSprite(thor2.x, thor2.y);
  thor2.depth = thorShield.depth + 1;
  thorShield.addImage(thorShieldImg);
  thorShield.scale = 0.15;

//fire group 
  shootFireGroup = new Group();
// life display create 
for (var i = 0; i < 5; i++){
  let positionArray =[
    [width - 300, height - (167*2)],
    [200, height - (314*2)],
    [width-260, height - (413*2)],
    [260, height - (650*2)],
    [350, height - (790*2)]
    //[229, 240],
    //[1302, height/2+100]
  ]
  var life = createSprite(positionArray[i][0], positionArray[i][1], 20, 20);
  life.addImage(lifeImg);
  life.scale = 0.0475;
  lifes.push(life);

  var lifeV = createSprite((width - 33*i)-35, height-30, 20, 20);
  lifeV.addImage('lifeImg',lifeImg);
  lifeV.addImage('noLifeImg',noLifeImg);
  lifeV.changeImage('lifeImg')
  lifeV.scale = 0.047;
  lifeV.visible = false;
  lifesV.push(lifeV);

  }

}

}


function draw() {

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

function play_level_2(){
  background(backgroundImg3);  
  // fire image
  imageMode(CENTER);
  image(fireImg, startPoint.x+5, startPoint.y-20, 270, 50);

  thor2.collide(right_wall);
  thor2.collide(left_wall);

//life time increase 
  let numArray = [0 ,0 ,0 ,0 ,0];
  for(var i=0; i<lifesV.length; i++){
    
    if(camera.y === windowHeight/2)
      lifesV[i].y = camera.y*2 - 30;
    else 
      lifesV[i].y = camera.y + 320

    if( i % 2===0){
      lifes[i].rotation -= 5;
      lifesV[i].rotation += 5;
    }
    if( i % 2!==0){
      lifes[i].rotation += 7;
      lifesV[i].rotation -= 7;
    }
  if(thor2.isTouching(lifes[i])){
    lifeTouch.play();
    lifes[i].destroy();
    lifeTime +=1;
    numArray[i]=1;
  }

  // trial 
  if(lifeTime === 2){
    lifesV[0].visible = true;
  }if(lifeTime === 3){
    lifesV[1].visible = true;
  }if(lifeTime === 4){
    lifesV[2].visible = true;
  }if(lifeTime === 5){
    lifesV[3].visible = true;
  }if(lifeTime === 6){
    lifesV[4].visible = true;
  }

  if(lifeEnd === 2){
    lifesV[0].changeImage('noLifeImg');
  }if(lifeEnd === 3){
    lifesV[1].changeImage('noLifeImg');
  }if(lifeEnd === 4){
    lifesV[2].changeImage('noLifeImg');
  }if(lifeEnd === 5){
    lifesV[3].changeImage('noLifeImg');
  }if(lifeEnd === 6){
    lifesV[4].changeImage('noLifeImg');
  }


      if(numArray[i] === 1){
        if(i===0){
          thor2.x = steps1[3].x;
          thor2.y = steps1[3].y - 30;
        }
        if(i===1){
          thor2.x = steps1[5].x;
          thor2.y = steps1[5].y - 30;
        }
        if(i===2){
          thor2.x = steps2[5].x;
          thor2.y = steps2[5].y - 30;
        }
        if(i===3){
          thor2.x = steps1[8].x;
          thor2.y = steps1[8].y - 30;
        }
        if(i===4){
          thor2.x = steps2[0].x;
          thor2.y = steps2[0].y - 30;
        }
      } 
      setTimeout(() => {
        numArray[i]=0;
      }, 2000);
  }
  
// animation for sword
  fireRing.rotation -=10;
  thorShield.rotation +=10;
  if(shoot !== undefined){
    shoot.rotation -=25
  }
// thorShield
  thorShield.display(140, 225, 220, 255);
  thorShield.x = thor2.x ;
  thorShield.y = thor2.y - 5 ;

// move keyWeapon
if(keyWeapon.x > width - 150)
  keyWeapon.velocityX = -3;
else if(keyWeapon.x < 150)
  keyWeapon.velocityX = 3;
rectangle.velocityX = keyWeapon.velocityX;
square.velocityX = keyWeapon.velocityX;
fireRing.velocityX = keyWeapon.velocityX;


// move steps
  for(i = 0; i< steps1.length; i++){
    var randSpeed = [6, 1, 3, 6, 4, 7, 5, 3, 4];

    if(steps1[i].x > width-150){
      array0[i]=1;
    }
    if(steps1[i].x <150){
      array0[i]=0;
    }
    if(array0[i]===0){
      steps1[i].velocityX = randSpeed[i];

    }else if(array0[i]===1){
      steps1[i].velocityX = -randSpeed[i];
    }
    fireSteps1[i].velocityX = steps1[i].velocityX;
    stepsOn1[i].x = steps1[i].x;
    thor2.collide(stepsOn1);
  }

  for(i = 0; i< steps2.length; i++){
    var randSpeed = [3, 7, 5, 6, 7, 4, 3, 7, 5];

    if(steps2[i].x > width-150){
      array1[i]=1;
    }
    if(steps2[i].x <150){
      array1[i]=0;
    }
    if(array1[i]===0){
      steps2[i].velocityX = randSpeed[i];

    }else if(array1[i]===1){
      steps2[i].velocityX = -randSpeed[i];
    }
    fireSteps2[i].velocityX = steps2[i].velocityX;
    stepsOn2[i].x = steps2[i].x;
    thor2.collide(stepsOn2);
// thor2 velocity is eqaul to step valocity when touch steps 
// shoot fire when thor2 is touching steps
      if(thor2.isTouching(steps2[i])){
        thor2.velocityX = steps2[i].velocityX;
        if(i < 2)
          shoot_fire(-100, steps2[i].y - 30, fireShootImg1, 0.08, 10);
        else if(i < 4)
          shoot_fire(-100, steps2[i].y - 30, fireShootImg1, 0.08, 15);
        else if(i < 6)
          shoot_fire(-100, steps2[i].y - 30, fireShootImg1, 0.08, 20);
        else if(i < 9)
          shoot_fire(-100, steps2[i].y - 30, fireShootImg1, 0.08, 30);
      }
      if(thor2.isTouching(steps1[i])){
        thor2.velocityX = steps1[i].velocityX;
        if(i < 2)
          shoot_fire(width+100, steps1[i].y - 30, fireShootImg2, 0.1, -10);
        else if(i < 4)
          shoot_fire(width+100, steps1[i].y - 30, fireShootImg2, 0.1, -15);
        else if(i < 6)
          shoot_fire(width+100, steps1[i].y - 30, fireShootImg2, 0.1, -20);
        else if(i < 9)
          shoot_fire(width+100, steps1[i].y - 30, fireShootImg2, 0.1, -30);
      }

      if(!thor2.isTouching(steps1) && !thor2.isTouching(steps2)){
        thor2.velocityX = 0;    
      }
  }

  // lifeTime decrease 
  if(thor2.isTouching(shootFireGroup)){
      shootFireGroup.destroyEach();
      lifeEnd += 1 ;
      hitSound.play();
      
      //bring thor to back position when touch fire 
      let change = true;
      if(change){
        if(thor2.y >= steps2[3].y ){
          thor2.x = steps1[0].x;
          thor2.y = steps1[0].y - 30;
        };
        if(thor2.y >= steps2[6].y ){
          thor2.x = steps1[2].x;
          thor2.y = steps1[2].y - 30;
        };
        if(thor2.y <= steps2[6].y ){
          thor2.x = steps2[6].x;
          thor2.y = steps2[6].y - 30;
        };
      }
      setTimeout(() => {
        change = false;
      }, 3000);
      
    }
  
// fire animation 
  if(fireMove.x >= startPoint.x -10){
    fireMove.velocityX = -5 }
  
  if(fireMove.x < startPoint.x - 100){
    fireMove.velocityX = 5 }

  // move thor 
     //gravity to thor
  thor2.velocityY += 0.5;
  
    // thor collide
  thor2.collide(startPoint);
  thor2.collide(ground);

  if(keyDown(LEFT_ARROW)){
    thor2.x -=6;
    thor2.changeImage('thorLeft');
    }
  if(keyDown(RIGHT_ARROW)){
    thor2.x +=6;
    thor2.changeImage('thorRight');
  }
  // if(keyDown(DOWN_ARROW)){
  //   thor2.y +=6.578
  // }
  if(keyDown(32)){
    //thor2.y -=6.578;
    thor2.y -=10.5;

  }
  if(thor2.y<=steps1[3].y-10)
    camera.y = windowHeight - (height+height*0.830/2);
  else 
    camera.y = windowHeight/2;

  if(thor2.y<=steps2[6].y-10)
    camera.y = windowHeight - (height+height*1.355);

  

  // game over 
  if(thor2.isTouching(ground3)){
      gameState = GAME_END2;
      if(music1){
        music3.play();
        music3.setVolume(2);
        music2.play();
        music2.setVolume(0.3)
        music.stop();
    }music1 = false;
  }
/*if(thor2.isTouching(fireRing)){
      gameState = GAME_END2;
      if(music1){
        dragonFire.play();
        dragonFire.setVolume(2);
        music2.play();
        music2.setVolume(0.3)
        music.stop();
      }music1 = false;
  }
  if(thor2.isTouching(steps1[0]) && steps1[0].isTouching(fireRing)){
      setTimeout(() => {
        gameState = GAME_END2;
        if(music1){
          music3.play();
          music3.setVolume(2);
          music2.play();
          music2.setVolume(0.3)
          music.stop();
        }music1 = false;
      }, 100);
  }*/

  let x = lifeEnd - lifeTime;
    if(x >=1){
      gameState = GAME_END2;
      if(music1){
        music3.play();
        music3.setVolume(2);
        music2.play();
        music2.setVolume(0.3)
        music.stop();
      }music1 = false;
    }

// win state 
if(thor2.isTouching(rectangle)||thor2.isTouching(square)){
  window.open("Initial - Level2/index.html", "_blank");
  window.close();
}

}
    function shoot_fire(x, y, image, scale, velocity){
      if(frameCount %180 === 0){
      shoot = createSprite (x , y);
      shoot.addImage(image);
      shoot.scale = scale;
      shoot.debug = false;
      shoot.setCollider("circle", 0, 0, 30);
      
      shoot.velocityX = velocity ;
      shoot.lifetime = 350 ;
      shootFireGroup.add(shoot) ;
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
    window.location.reload();
  });   

  restartBtn = createButton("Restart");
  restartBtn.position(500, height/2);
  restartBtn.class('button');
  restartBtn.hide();
  restartBtn.mouseClicked(()=>{
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
}
  function design_shoot(){
    if(frameCount %120 === 0){
      shoot2 = createSprite (-10 , gameOver.y+145) ;
      shoot2.addImage(fireShootImg1) ;
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

  for(var i=0; i< steps1.length; i++){
    steps1[i].destroy();
    stepsOn1[i].destroy();
    fireSteps1[i].destroy();

    steps2[i].destroy();
    stepsOn2[i].destroy();
    fireSteps2[i].destroy();
  }
  for(var i=0; i< lifesV.length; i++){
    lifesV[i].destroy();
    lifes[i].destroy();
  }
  startPoint.destroy();
  keyWeapon.destroy();
  fireRing.destroy();
  fireMove.destroy();
  thor2.destroy();
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
          music.loop();
          music.setVolume(0.3);
      }
    }
  );
  
}


