boil.oBedroom = function(){};

var ptag, oBedroom, x, y, flip, map, furniture, textbox,ikea,text, lastKeyPressed, pop, hasAwoken=false;

boil.oBedroom.prototype = {
    preload: function(){
        x = 90;
        y = 1100;
        flip = -0.45;
        game.load.tilemap('bedroomTilemap', 'Assets/Backgrounds/bedroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('bedroomTileset', 'Assets/Backgrounds/bedroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
        //game.load.audio('pop', 'assets/Sounds/bedroom.ogg');
//        game.load.spritesheet('textbox', 'Assets/Spritesheets/textbox.png', 147,47);
         
    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1500,1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the oBedroom state');        
        map = game.add.tilemap('bedroomTilemap');
        map.addTilesetImage('bedroomTileset');
        oBedroom = map.createLayer('bedroom');
        if(!hasAwoken){
            ptag = game.add.sprite(856,870, 'ptag');
        }
        else ptag = game.add.sprite(1419,1188, 'ptag')
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7,]);
        ptag.animations.add('walkup',[8,9,10,11,]);
        
     
        
        game.physics.enable(ptag);
        ptag.scale.setTo(.45,.45);
        ptag.anchor.setTo(0.5);
        if(!hasAwoken){
            ptag.angle = 90 
        }
        map.setCollisionBetween(1,45,'bedroom'); //ceiling
        map.setCollisionBetween(211,225,'bedroom') //bottom
        
        map.setCollision(103,118,'bedroom');
        map.setCollisionBetween(133,135,'bedroom');//right
        
        map.setCollision(151,'bedroom');
        map.setCollision(151,165,'bedroom');
        map.setCollision(181,196,'bedroom'); //left
        
    furniture = {
            desk: [
                [166,170],
                [136,139],
                [151,156]
            ],
            dresser: [
                [40,43]
            ],
            plant: [
                [36,39]
            ],
            bed: [
                [61,65],
                [76,80],
                [91,95],
                [106,110]
            ]
        };
        
        this.setupFurniture();

        text = {
             desk:{
                 dialog: [
                     'You stare at the desk for 42 seconds.',
                     'You’re getting desperate for heat.'
                ],
                 sprite: null
             },
            dresser: {
                dialog: [
                    'When you don’t come in here to cry, you sometimes see a field of mushrooms and prance among them',
                    'The thought of mushrooms make you salivate',
                    'Maybe the kitchen will have some?'
                ],
                sprite: null     //'talkfrige'
            },
            plant:{
                dialog: [
                    'This flower is your best friend.'
                ],
                sprite: null
            },
            bed:{
                dialog: [
                    'Sometimes when you lie down you feel like you’re on a cloud in the sky and there are butterflies and angels everywhere',
                    'You’re craving for more mushrooms..'
                ],
                sprite: null
            }, 
            
        };
        //pop = game.add.audio('pop');
        //pop.play();
},
update: function(){
        if(ptag.angle>0){
            ptag.angle--
            ptag.x--
        }
        else {
            hasAwoken=true 
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
        }
        var self = this;
        game.physics.arcade.collide(ptag, oBedroom, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
    
     if (ptag.x>1500){
         //pop.stop();
     changeState('oHallway');
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
                map.setCollisionBetween(tiles[0],tiles[1],'oBedroom');
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