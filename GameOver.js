boil.GameOver = function(){};

boil.GameOver.prototype = {
    preload: function(){

    },
    create: function(){
        console.log('You are in the GameOver state');
        game.stage.backgroundColor = '#0000FF';
        game.input.onDown.add(function(){
            changeState('Menu');
        }); 
    },
    update: function(){
        
    }
};