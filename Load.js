var boil = {};

boil.Load = function(){};

boil.Load.prototype = {
    create: function(){
        console.log('You are in the Load state');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = game.scale.pageAlignVertically = true;
        game.time.events.add(100, function(){ changeState('Menu') });
    }
};

function changeState(state){
    console.log('x', x);
    console.log('y', y);
    game.state.start(state);
}