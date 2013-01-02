enchant();
window.onload = function () {
    var game = new Game(320, 320);
    game.rootScene.backgroundColor = 'green';
    game.preload('gray.jpg', 'red.jpg');
    game.onload = function () {
	
	var score = 0;
	
	// Player's block.
        var redBlock = enchant.Class.create(enchant.Sprite, {
            initialize: function(){
                enchant.Sprite.call(this, 15, 15);
                this.image = game.assets['red.jpg'];
		this.frame = 15;
                game.rootScene.addChild(this);
            }
        });
	var player = new redBlock();
	player.moveTo(175, 175);
	// Vertical block.
        var vBlock = enchant.Class.create(enchant.Sprite, {
            initialize: function() {
                enchant.Sprite.call(this, 15, 15);
                this.image = game.assets['gray.jpg'];
                this.moveTo(Math.floor(Math.random() * 320), 0);
                this.scaleY = 1;
                this.tl.moveBy(0, 360, Math.floor(Math.random() * 150));
                game.rootScene.addChild(this);
            }
        });
	// Horizontal block.
        var hBlock = enchant.Class.create(enchant.Sprite, {
            initialize: function() {
                enchant.Sprite.call(this, 15, 15);
                this.image = game.assets['gray.jpg'];
                this.moveTo(0, Math.floor(Math.random() * 320));
                this.scaleX = 1;
                this.tl.moveBy(360, 0, Math.floor(Math.random() * 150));
                game.rootScene.addChild(this);
            }
        });
	// Spawn blocks.
        game.rootScene.tl.then(function() {
            var hblock = new hBlock();
	    var vblock = new vBlock();
        }).delay(20).loop();   
	// Move red block.
        game.rootScene.on('touchmove', function(evt) {
	    player.moveTo(evt.localX, evt.localY);
        });
	// Detect collision on enter frame.
	game.rootScene.on('enterframe', function() {
	    if (redBlock.intersect(hBlock) && redBlock.intersect(vBlock)) {
		alert("Game Over\nScore: " + score);
		game.stop();
	    }
	    score++; 
	});
	game.pushScene(game.rootScene);
    };
    game.start();
};