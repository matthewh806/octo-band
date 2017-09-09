var game = new Phaser.Game(900, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var notes = ["C2", "D4", "E5", "A6", "G1", "B3"];

function preload () {
    game.load.atlasXML('octopus', 'assets/sprites/octopus.png', 'assets/sprites/octopus.xml');
}

function create () {
    // Underwater background color
    game.stage.backgroundColor = '#1873CE';

    var count = notes.length;
    var columns = 3;
    var rows = count / columns

    console.log(columns);
    console.log(rows);

    for(var i=0; i < rows; i++) {
        for(var j = 0; j < columns; j++) {
            createOctoSynth(200 * j, 200 * (i+1), notes[Math.floor(Math.random() * notes.length)]);
        }
    }
}

function update() {

}

function createOctoSynth(spawn_x, spawn_y, note) {
    var octopus = createOctopus(spawn_x, spawn_y);
    var synth = createSynth();

    octopus.events.onInputDown.add(function(s) {
        synth.triggerAttack(note);
    });

    octopus.events.onInputUp.add(function(s) {
        synth.triggerRelease();
    });

    return octopus
}

function createOctopus(spawn_x, spawn_y) {
    var octopus = game.add.sprite(spawn_x, spawn_y, 'octopus');
    octopus.animations.add('swim');
    octopus.animations.play('swim', 30, true);

    octopus.inputEnabled = true;

    game.add.tween(octopus).to({y: spawn_y + 100}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

    return octopus
}

function createSynth() {
    return new Tone.Synth().toMaster();
}

function createPattern(synth, values) {
    var pattern = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.25);
    }, values);

    pattern.start(0).stop(10);
    

    return pattern
}