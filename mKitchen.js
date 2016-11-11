boil.mKitchen = function(){};

var ptag, mKitchen,counters, x, y, flip, map, furniture, textbox,ikea, lastKeyPressed, text,kitch;

boil.mKitchen.prototype = {
    preload: function(){
        x = 1370;
        y = 875;
        flip = 0.45;
        game.load.tilemap('mKitchenTilemap', 'Assets/Backgrounds/mKitchenTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('mKitchenTileset', 'Assets/Backgrounds/mKitchenTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
//        game.load.image('counters','Assets/Backgrounds/counters.png',1500,1500);
//        game.load.spritesheet('talkfridge','Assets/Spritesheets/talkfridge.png',450,450);
//        game.load.spritesheet('talkjegg','Assets/Spritesheets/talkjegg.png',450,450);
//        game.load.audio('kitch', 'assets/Sounds/kitch.ogg');
    },
  create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(changeText, this);
    
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1500,1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the mKitchen state');        
        map = game.add.tilemap('mKitchenTilemap');
        map.addTilesetImage('mKitchenTileset');
        mKitchen = map.createLayer('mKitchen');
        ptag = game.add.sprite(110,1170, 'ptag');
    
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7,]);
        ptag.animations.add('walkup',[8,9,10,11,]);
    
        game.physics.enable(ptag);
        ptag.scale.setTo(-.45,.45);
        ptag.anchor.setTo(0.5);
        game.add.sprite(0,0,'counters');
        
        
        map.setCollisionBetween(1,90,'mKitchen'); //ceiling
        map.setCollisionBetween(841,900,'mKitchen') //bottom
  
        map.setCollision(365,395,'mKitchen');
        map.setCollision(425,455,'mKitchen'); 
        map.setCollisionBetween(481,485, 'mKitchen');   //left
        
        map.setCollision(30,60,'mKitchen');
        map.setCollision(90,120,'mKitchen');
        map.setCollision(150,180,'mKitchen');
        map.setCollision(300,330,'mKitchen');
        map.setCollision(360,390,'mKitchen');
        map.setCollision(690,720,'mKitchen');
        map.setCollision(750,780,'mKitchen');
        map.setCollision(810,840,'mKitchen');
        map.setCollision(870,900,'mKitchen');//right
    
    furniture = {
            table: [
                [185,193]
            ],
            chair: [
                [194,198]
            ],
            spice: [
                [146,150]
            ],
            fridge: [
                [535,540]
            ],
            sink:[
                [532,534]
            ],
            stove:[
                [528,531]
            ],
            counter:[
                [524,527]
            ]
        };
        
        this.setupFurniture();

        text = {
             table:{
                 dialog: [
                     'Sometimes you lay here and cover yourself with salt',
                     'You try to make a snow angel, but never succeed'
                ],
                 sprite: null
             },
            chair: {
                dialog: [
                    'You still don’t have any friends.',
                ],
                sprite: null
            },
            spice:{
                dialog: [
                    'SPICE GIRLS.',
                    'HAHAHHAHAHAHAHAHAHAAHAHAHHHAHAHAHAHHA'
                         ],
                sprite: null
            },
            fridge:{
                dialog: [
                    'Do I have any food you ask?',
                    'Do I have ',
                    'ANY.',
                    'FOOD.',
                    'NO, I don’t have any food.',
                    'Do you know WHY?',
                    'Cuz you won’t give me any!',
                    'I thought you loved me! ',
                    'I thought we had something!',
                    'You promised we would be together forever!',
                    'That i’d always have food in my belly!',
                    'All you ever do is take and leave, take and leave!!!',
                    'Hey! Are you listening?',
                    'Stop skipping through my words! Stop trying to leave!',
                    'Don’t you DARE leave me!!!!',
                    'EVERYTHING I do is for you! I feed you and give you everything i have and-'
                ],
                sprite: 'talkfridge'
            }, 
            sink: {
                dialog: [
                    'The sink is flooded with greenish brown water',
                    'But you’re very thirsty.',
                    'You drink the water.'
                ],
                sprite: null
            },
            stove: {
                dialog: [
                    'The fire is captivating',
                    'You want to touch it'
                ],
                sprite: null
            },
            counter: {
                dialog: [
                    'egg.',
                    'Hey! I’m more than just an egg, buddy!',
                    'I have a name and a dozen back at home to take care of!',
                    'the name’s Jeggson! Drew Jeggson to be precise. Nice to meet ya!',
                    'If you’re lookin’ for food, I’d check the fridge.',
                    'I hear she’s an EGGcellent food holder.',
                    'If not, talk to Sammy.',
                    'Yea, your pet fish.',
                    'And don’t even think about eating me, bud!',
                    'I might give you SALMONella poisoning!'
                ],
                sprite: 'talkjegg'
            },            
        };
      kitch = game.add.audio('kitch');
        kitch.play();
},
update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            ptag.body.velocity.x=300;
            if (!game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                ptag.animations.play('walk', 7, true);
            }
            ptag.scale.setTo(-.45,0.45);
            ikea = null;
            lastKeyPressed = 'right';
           }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            ptag.body.velocity.x=-300;
            if (!game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                ptag.animations.play('walk', 7, true);
            }
            ptag.scale.setTo(.45,.45);
            ikea = null;
            lastKeyPressed = 'left';
           }
        else{
            ptag.animations.stop('walk');
            ptag.body.velocity.x=0;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            ptag.body.velocity.y =-300;
            ptag.animations.play('walkup',7,true);   
            ikea = null;
            lastKeyPressed = 'up';
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            ptag.body.velocity.y =300;
            ptag.animations.play('walk',7,true);
            ikea = null;
            lastKeyPressed = 'down';
        }
        else{
            ptag.body.velocity.y=0;
        }
            
        var self = this;
        game.physics.arcade.collide(ptag, mKitchen, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
    
     if (ptag.x<20){
         kitch.stop();
     changeState('mHallway');
     };
     if (!game.input.keyboard.isDown(Phaser.Keyboard.UP) &&
            !game.input.keyboard.isDown(Phaser.Keyboard.DOWN) &&
            !game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) &&
            !game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if (lastKeyPressed == 'right') {
                ptag.frame = 0;
                ptag.scale.setTo(-.45,0.45);
            } else if (lastKeyPressed == 'up') {
                ptag.frame = 8;
            } else if (lastKeyPressed == 'left'){
                ptag.frame = 0;
            } 
        }
    },
  setupFurniture: function() {
        var keylist = Object.keys(furniture);
        for(var i=0; i<keylist.length; i++){
            var key = keylist[i];
            for(var j=0; j<furniture[key].length;j++){
                var tiles = furniture[key][j];
                map.setCollisionBetween(tiles[0],tiles[1],'mKitchen');
            }
        }
    },
     furnitureType: function(index){
         var keylist = Object.keys(furniture);
        for(var i=0; i<keylist.length; i++){
            var key = keylist[i];
            for(var j=0; j<furniture[key].length;j++){
                var tiles = furniture[key][j];
                if (index<=tiles[1] && index>=tiles[0]){
                    return key
                }
            }
        }
         
     }
};