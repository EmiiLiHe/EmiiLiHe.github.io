boil.bathroom = function(){};

var ptag, bathroom, x, y, flip, map, furniture, textbox, ikea, lastKeyPressed,text,myth;
//ikea is whether or not you're near furniture
boil.bathroom.prototype = {
    preload: function(){
        x = 1370;
        y = 1945;
        flip = 0.45;
        game.load.tilemap('bathroomTilemap', 'Assets/Backgrounds/bathroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('bathroomTileset', 'Assets/Backgrounds/bathroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
        game.load.audio('myth', 'assets/Sounds/myth.ogg');
//        game.load.spritesheet('textbox', 'Assets/Spritesheets/textbox.png', 1500,470);

         
    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1500, 1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the bathroom state');        
        map = game.add.tilemap('bathroomTilemap');
        map.addTilesetImage('bathroomTileset');
        bathroom = map.createLayer('bathroom');
        ptag = game.add.sprite(game.world.centerX-650, 1065, 'ptag');
        
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7,]);
        ptag.animations.add('walkup',[8,9,10,11,]);
        
        game.physics.enable(ptag);
        ptag.scale.setTo(-.45,.45);
        ptag.anchor.setTo(0.5);

        map.setCollisionBetween(1,30,'bathroom'); //ceiling
        map.setCollisionBetween(196,225,'bathroom') //bottom
        
        map.setCollision(31,46, 'bathroom');
        map.setCollision(61,76,'bathroom');
        map.setCollision(91,'bathroom'); //left
        
        map.setCollision(90,106,'bathroom');
        
        map.setCollision(135,'bathroom');
        map.setCollision(150,165,'bathroom');
        map.setCollision(180,195,'bathroom');
        map.setCollision(210,225,'bathroom');
        
        furniture = {
            toilet: [
                [49, 50]
            ],
            mildew: [
                [36,36]
            ],
            sink: [
                [38,39]
            ],
            bath: [
                [42,45],
                [57,60],
                [72,75],
                [87,90],
                [102,105]
            ]
        };
        this.setupFurniture()
        // \n = new line
        text = {
            toilet: {
                dialog: [
                    'You flushed your late pet turtle down this toilet last month.',
                    'It clogged the toilet and you couldn’t get enough money to pay for a plumber.'
                ],
                sprite: null     //'talkfrige'
            },
            mildew:{
                    dialog: [
                    'The only living (?) thing in this room.',
                    'Your soul died a long time ago'
                ],
                 sprite: null
            },
            sink:{
                dialog: [
                    'God, you hate how you look.',
                    'That stupid red hair and those beady eyes.',
                    'Disgusting.'
                    
                         ],
                sprite: null
            },
            bath:{
                dialog: [
                    'your bathtub doesn’t work.',
                    'The pipes are connected to your toilet.',
                    'Which clogged.'
                ],
                sprite: null
            }, 
        };
        myth = game.add.audio('myth');
        myth.play();
    },
    
    update: function(){
        if(!textbox){
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
        game.physics.arcade.collide(ptag,bathroom, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
    

         if (ptag.x< 15){
             myth.stop();
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
                map.setCollisionBetween(tiles[0],tiles[1],'bathroom');
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
         
     },

};
    
 