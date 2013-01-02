enchant();
window.onload = function () {
    var game = new Game(320, 320);
    game.fps = 20;
    game.preload('gray.jpg', 'red.jpg');
    game.onload = function () {
	var graySprite = new Sprite(15, 15);
	graySprite.image = game.assets['gray.jpg'];
	var redSprite = new Sprite(15, 15);
	redSprite.image = game.assets['red.jpg'];
	redSprite.x = 100; redSprite.y = 100;
	game.rootScene.addChild(graySprite);
	game.rootScene.addChild(redSprite);
	// Move red block.
        game.rootScene.on('touchmove', function(evt) {
	    redSprite.y = evt.localY;
	    redSprite.x = evt.localX;
        });
	// Detect collision on enter frame.
	game.rootScene.on('enterframe', function(){
	    if (redSprite.intersect(graySprite)) {
		alert("Game Over.");
		game.stop();
	    }
	});
	game.pushScene(game.rootScene);
    };
    game.start();
};