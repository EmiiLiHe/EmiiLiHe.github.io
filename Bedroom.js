boil.bedroom = function(){};

var ptag, bedroom, x, y, flip, map, furniture, textbox,ikea,text, lastKeyPressed;

boil.bedroom.prototype = {
    preload: function(){
        x = 90;
        y = 1100;
        flip = -0.45;
        ./game.load.tilemap('bedroomTilemap', './Assets/Backgrounds/bedroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        ./game.load.image('bedroomTileset', './Assets/Backgrounds/bedroomTileset.png');
        ./game.load.spritesheet('ptag', './Assets/Spritesheets/ptag.png',450,940);
        ./game.load.spritesheet('shrooms','./Assets/Spritesheets/shrooms.png',450,450);  
        //game.load.audio('pop', 'assets/Sounds/bedroom.ogg');
    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1500,1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the bedroom state');        
        map = game.add.tilemap('bedroomTilemap');
        map.addTilesetImage('bedroomTileset');
        bedroom = map.createLayer('bedroom');
        ptag = game.add.sprite(game.world.centerX+650,game.world.centerY+400, 'ptag');
        
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7,]);
        ptag.animations.add('walkup',[8,9,10,11,]);
        
        game.physics.enable(ptag);
        ptag.scale.setTo(.45,.45);
        ptag.anchor.setTo(0.5);
        
        map.setCollisionBetween(1,45,'bedroom'); //ceiling
        map.setCollisionBetween(211,225,'bedroom') //bottom
        
        map.setCollision(103,118,'bedroom');
        map.setCollisionBetween(133,135,'bedroom');//right
        
        map.setCollision(151,'bedroom');
        map.setCollision(151,165,'bedroom');
        map.setCollision(181,196,'bedroom'); //left
        
    furniture = {
            desk: [
                [136,137],
                [151,155],
                [166,170]
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
                [106,109]
            ],
            wedge: [
                [110,110]
            ]
        };
        //pop = game.add.audio('pop');
        //pop.play();
        
        this.setupFurniture();

        text = {
             desk:{
                 dialog: [
                     'you bought it for the novelty and have considered burning it for the heat',
                ],
                 sprite: null
             },
            dresser: {
                dialog: [
                    'just clothes',
                ],
                sprite: null     //'talkfrige'
            },
            plant:{
                dialog: [
                    'sometimes you look out your window, and see kids trying to throw rocks at your face.',
                         ],
                sprite: null
            },
            bed:{
                dialog: [
                    'This quilt was from your grandma for christmas.',
                    'She died two weeks ago...',
                    '...and you didn’t even show up to her funeral.',
                    'You want to repress that memory',
                    'You notice something at the foot of the bed.'
                ],
                sprite: null
            }, 
            wedge: {
                dialog: [
                    'You find a packet of mushrooms wedged between the mattress and the frame of the bed.',
                    'They look old, but at this point you’re too hungry to care.',
                    'You eat the mushrooms'
                ],
                sprite: 'shrooms',
                //end: 'pop',
                stateChange: 'oBedroom'
                
                
                
            }
            
        };
        
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
        game.physics.arcade.collide(ptag, bedroom, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
    
     if (ptag.x>1500){
         //pop.stop();
     changeState('hallway');
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
                map.setCollisionBetween(tiles[0],tiles[1],'bedroom');
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