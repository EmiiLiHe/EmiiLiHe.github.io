boil.mHallway = function(){};

var ptag, mHallway, x, y, flip, map, furniture, textbox,ikea, lastKeyPressed;

boil.mHallway.prototype = {
    init: function(){
        console.log(x + ' ' + y)
    },
    preload: function(){
        game.load.tilemap('mHallwayTilemap', 'Assets/Backgrounds/mHallwayTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('mHallwayTileset', 'Assets/Backgrounds/mHallwayTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',450,940);
//        game.load.image('lowerwall','Assets/Backgrounds/lowerwall.png',3000,1500);
//        game.load.image('upperwall','Assets/Backgrounds/upperwall.png',3000,1500);
//        game.load.image('middlewall','Assets/Backgrounds/middlewall4.png',3000,1500);
//        game.load.image('lowerwallr','Assets/Backgrounds/lowerwallr.png',3000,1500);
//        game.load.audio('pop', 'assets/Sounds/ohalls.ogg');
         
    },
    create: function(){
        var enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(changeText, this);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 1500, 3000);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the mHallway state');        
        map = game.add.tilemap('mHallwayTilemap');
        map.addTilesetImage('mHallwayTileset');
        mHallway = map.createLayer('mHallway');
        ptag = game.add.sprite(x, y, 'ptag');
        
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7,]);
        ptag.animations.add('walkup',[8,9,10,11,]);
        
        game.physics.enable(ptag);
        ptag.scale.setTo(flip,.45);
        ptag.anchor.setTo(0.5);
        game.add.sprite(0,0,'lowerwall');
        game.add.sprite(0,0,'upperwall');
        game.add.sprite(0,0,'middlewall');
        game.add.sprite(0,0,'lowerwallr');
        game.camera.follow(ptag);
   
        map.setCollisionBetween(1,15,'mHallway');
        map.setCollisionBetween(22,24,'mHallway');
        map.setCollision(20,35,'mHallway'),
        map.setCollision(50,65,'mHallway'),
        map.setCollision(76,80,'mHallway'),
        map.setCollision(95,'mHallway'),
        map.setCollisionBetween(106,110,'mHallway');
       
        map.setCollisionBetween(211,215,'mHallway');
        map.setCollisionBetween(316,320,'mHallway');
        map.setCollisionBetween(436,450,'mHallway');
        map.setCollision(335,350,'mHallway');
        map.setCollision(365,380,'mHallway');
        map.setCollision(395,410,'mHallway');
        
        map.setCollision(12,27,'mHallway');//right side
        map.setCollision(42,57, 'mHallway');
        map.setCollisionBetween(87,90,'mHallway');
        
        map.setCollisionBetween(177,180,'mHallway');
        map.setCollisionBetween(237,240,'mHallway');
        map.setCollision(192,207,'mHallway');
        
        map.setCollisionBetween(342,345,'mHallway');
        map.setCollision(357,372,'mHallway');
        map.setCollision(387,432,'mHallway');
        pop = game.add.audio('pop');
        pop.play();
        
        furniture = {
            plant: [
                [22,24]
            ]
        };
   this.setupFurniture()
        text = {
            plant: {
                dialog: [
                    'You REALLY like this painting.',
                    'Sometimes if you look hard enough you’re IN the painting itself.',
                    'Pretty trippy stuff!'
                ],
                sprite: null    
            },
        
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
        game.physics.arcade.collide(ptag, mHallway, function(obj1, obj2) { 
            console.log('collided', self.furnitureType(obj2.index));
            ikea = self.furnitureType(obj2.index);
        })
    
    if (ptag.x > 1475) {
        if (ptag.y<900){
            pop.stop();
            changeState('mKitchen');
        }
        if (ptag.y>1810){
            pop.stop();
            changeState('mBathroom');
        }
    }
    
    if (ptag.x<20 && ptag.y<1189){
        pop.stop();
        changeState('mBedroom');
    }
    if (ptag.x<20 && ptag.y>1695){
        pop.stop();
        changeState('mLivingR')
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
                map.setCollisionBetween(tiles[0],tiles[1],'mHallway');
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