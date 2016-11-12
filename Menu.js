boil.Menu = function(){};
var menu, ikea = null;

boil.Menu.prototype = {
    preload: function(){
        game.load.spritesheet('menu', './Assets/Spritesheets/emenuscreen.png',600,600);
        game.load.spritesheet('textbox', './Assets/Spritesheets/textbox.png', 1500,470);
    },
    create: function(){
        console.log('You are in the Menu state');
        //game.stage.backgroundColor = '#000000';
        var menu = game.add.sprite(150,150, 'menu');
        var load = menu.animations.add('load');
        menu.animations.play('load', 6, true);
        menu.scale.setTo (2,2);
        game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(function(){
            game.state.start('bathroom');
        });
         
    },
    update: function(){
        
    }
};

function changeText(){
        console.log('ikea', ikea);
        if(textbox && ikea && wordIndex < text[ikea].dialog.length-1){
           wordIndex++ 
           var newText = text[ikea].dialog[wordIndex]
           words.setText(newText)
        }
        else if(textbox && ikea && wordIndex == text[ikea].dialog.length-1 && text[ikea].stateChange){
                changeState(text[ikea].stateChange)
        }
       
        else if(textbox){
            textbox.destroy();
            textbox=null;
            words.destroy();
            talksprite.destroy();
        }
    
        else if(ikea!== undefined){
//            textbox = game.add.sprite(0,0,'textbox');

        if(ikea !== null){
            var textX =0;
            var textY = 1000;
            var textMargin = 75;
            
            textbox = game.add.sprite(textX,textY,'textbox');

            //textbox.scale.setTo(8,8);
            textbox.animations.add('float',[0,1,2,3,4,5]);
            textbox.animations.play('float',5,true);  
            
            var style = {
                fontSize: '40px',
                fill : 'white',
                wordWrap : true,
                wordWrapWidth : textbox.width-(2*textMargin)
            };
            
            wordIndex = 0
            words = game.add.text(textX+textMargin,textY+textMargin,text[ikea].dialog[wordIndex],style);
            
            if(text[ikea].sprite !== null){
                talksprite = game.add.sprite(875,1150,text[ikea].sprite);
                talksprite.scale.setTo(0.8,0.8);
                talksprite.animations.add('talk', [0,1,2,3,4,5,6,7]);
                talksprite.animations.play('talk',5,true);
            }
            //ikea = null;
         }
 };
};