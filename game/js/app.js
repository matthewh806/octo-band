requirejs.config({
		//By default load any module IDs from js/lib
    baseUrl: 'js/lib',
     paths: {
        app: '../app'
    }
});

requirejs(["Phaser", "tone"],
	function(Phaser, Tone) {
		requirejs(['app/scene']);		
});



