boil.wbathroom = function(){};

var ptag, wbathroom;

boil.wbathroom.prototype = {
    preload: function(){
        game.load.tilemap('wbathroomTilemap', 'Assets/Backgrounds/wwbathroomTilemap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('wbathroomTileset', 'Assets/Backgrounds/wwbathroomTileset.png');
        game.load.spritesheet('ptag', 'Assets/Spritesheets/ptag.png',470,950);
         
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0, 1500,1500);
        //game.stage.backgroundColor = '#A80000';
        console.log('You are in the wbathroom state');        
        var map = game.add.tilemap('wbathroomTilemap');
        map.addTilesetImage('wwbathroomTileset');
        wbathroom = map.createLayer('wbathroom');
        ptag = game.add.sprite(game.world.centerX-650,game.world.centerY+300, 'ptag');
        ptag.animations.add('walk',[0,1,2,3,4,5,6,7]);
        game.physics.enable(ptag);
        ptag.scale.setTo(-.45,.45);
        ptag.anchor.setTo(0.5);
        map.setCollisionBetween(1,30,'wbathroom'); //ceiling
        map.setCollisionBetween(196,225,'wbathroom') //bottom
        
        map.setCollision(31,46, 'wbathroom');
        map.setCollision(61,76,'wbathroom');
        map.setCollision(91,'wbathroom'); //left
        
        map.setCollision(90,106,'wbathroom');
        
        map.setCollision(135,'wbathroom');
        map.setCollision(150,165,'wbathroom');
        map.setCollision(180,195,'wbathroom');
        map.setCollision(210,225,'wbathroom');
        map.setCollisionBetween(49,50,'wbathroom'); //toilet
        map.setCollisionBetween(38,39,'wbathroom'); //sink
        
        map.setCollisionBetween(42,45,'wbathroom');//bath
        map.setCollisionBetween(57,60,'wbathroom'); //bath
        map.setCollisionBetween(72,75,'wbathroom'); //bath
        map.setCollisionBetween(87,90,'wbathroom'); //bath
        map.setCollisionBetween(102,105,'wbathroom'); //bath
             
},
update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        ptag.body.velocity.x=300;
        ptag.animations.play('walk', 20, true);
        ptag.scale.setTo(-.45,.45)
       }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        ptag.body.velocity.x=-300;
        ptag.animations.play('walk', 20, true);
        ptag.scale.setTo(.45,.45)
       }
    else{
        ptag.animations.stop('walk');
        ptag.frame = 0;
        ptag.body.velocity.x=0;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        ptag.body.velocity.y =-300;
        //if(ptag.y < 1500 ){
            //ptag.y = 1500;
       }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        ptag.body.velocity.y =300;
    }
    else{
        ptag.body.velocity.y=0;
}
    game.physics.arcade.collide(ptag,wbathroom)
    
     if (ptag.x< 15){
     changeState('hallway');
     };
    }
};