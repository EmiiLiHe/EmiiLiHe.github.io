boil.mLivingR = function(){};

var ptag, mLivingR, sammy, x, y, flip, map, furniture, textbox, ikea, lastKeyPressed,text,livin;

boil.mLivingR.prototype = {
    preload: function(){
        x = 105;
        y = 1810;
        flip = 0.45;
        game.load.tilemap('mLivingRTilemap', 'Assets/Backgrounds/mLivingRTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('mLivingRTileset', 'Assets/Backgrounds/mLivingRTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
        game.load.spritesheet('sammy','Assets/Spritesheets/Sammy.png',1400,940);
//        game.load.spritesheet('talksammy','Assets/Spritesheets/talksammy.png',450,450);
//        
//        game.load.image('topLayer','Assets/Backgrounds/LivingRtop.png',1400,2100);
//        game.load.image('wall','Assets/Backgrounds/wall.png',1400,2100);
//        
//        game.load.audio('livin', 'assets/Sounds/livin.ogg');
         
    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,1400,2100);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the mLivingR state');        
        map = game.add.tilemap('mLivingRTilemap');
        map.addTilesetImage('mLivingRTileset');
        mLivingR = map.createLayer('mLivingR');
        sammy = game.add.sprite(0,0,'sammy');
        sammy.animations.add('move',[0,1]);
        sammy.animations.play('move', 2, true);
        ptag = game.add.sprite(1295,555, 'ptag');
        game.add.sprite(0,0,'topLayer');
        game.add.sprite(0,0,'wall');
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7,]);
        ptag.animations.add('walkup',[8,9,10,11,]);
        
        
        game.physics.enable(ptag);
        ptag.scale.setTo(.45,.45);
        ptag.anchor.setTo(0.5);
        game.camera.follow(ptag);
        
        map.setCollisionBetween(1,14,'mLivingR');
        map.setCollisionBetween(15,28,'mLivingR');//ceiling
        
        map.setCollision(57,71,'mLivingR');
        map.setCollision(85,99,'mLivingR');
        map.setCollision(113,127,'mLivingR');
        map.setCollision(141,155,'mLivingR');
        map.setCollision(169,183,'mLivingR');
        map.setCollision(197,211,'mLivingR');//left
        
        map.setCollisionBetween(136,140,'mLivingR');//entrance bit
        map.setCollisionBetween(150,154,'mLivingR');

        map.setCollision(210,224,'mLivingR'); //right
        
          furniture = {
            shelf: [
                [42, 46]
            ],
            sammy: [
                [47, 50]
            ],
            TV: [
                [164,168]
            ],
            table: [
                [253,258]
            ],
            couch: [
                [245,252]
            ],
            lamp: [
                [183,184]
            ]
              
        };
        this.setupFurniture()
   text = {
            shelf: {
                dialog: [
                    'You miss your mom and dad.',
                    'You wish you could be wherever they are...',
                    '...maybe you can be.'
                ],
                sprite: null     //'talkfrige'
            },
            sammy:{
                dialog: [
                    'Oh hi, friend.',
                    'Because that’s what we are.',
                    'Friends. :)',
                    'Why don’t you look around?',
                    'Oh, you want more food? Maybe try the bathroom then.',
                    'It’s okay, I’ll just stay here.',
                    'All alone.',
                    'And wait for you...',
                    'It seems that obviously those stupid mushrooms are more important to you than hanging out with your bestest pal',
                    'So of course you’d just abandon me and leave me to swim here all by myself....',
                    'That’s alright! I can just talk to myself, no big deal...',
                    'I have a reflection for a reason, right?',
                    'Yea... Will Dew the Mildew might know where to find some.',
                    'He knows a lot,',
                    'but not as much as me!',
                         ],
                sprite: 'talksammy'
            },
            TV:{
                dialog: [
                    'It’s stickier than usual',
                    'The screen seems to be displaying static',
                    'but the TV isn’t turned on...',
                    'eh, maybe it’s just your imagination.',
                    'you decide to ignore it'
                ],
                sprite: null
            },
            table: {
                dialog: [
                    'This plant smells amaaaaazing',
                    'ACHOO!'
                ],
                sprite: null 
            },
            couch: {
                 dialog: [
                     'Sleeping on this couch reminds you of the time you had to sleep in a cardboard box because you forgot your keys.',
                     'And the next day you found out they were in your pocket the whole time.',
                     'The box was still more comfortable than this couch.'
                 ],
                 sprite: null
            },
            lamp: {
                 dialog:[
                     'This lamp is the LIGHT OF YOUR LIFE',
                     'HAHAHAHAHAHAHA'
                 ],
                sprite: null
            },
        };
        livin = game.add.audio('livin');
        livin.play();
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
        game.physics.arcade.collide(ptag, mLivingR, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
     if (ptag.x> 1350){
         livin.stop();
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
                map.setCollisionBetween(tiles[0],tiles[1],'mLivingR');
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