const x = 600;
const y = 600;

function setup() {
    let canvas = createCanvas(x, y);
    canvas.position( ( ( windowWidth - x )/2 ), ( ( windowHeight - y )/2 ) );
    setupFlowfield();
    createParticles();
}

function draw() {
    generateFlowfield();
    //showFlowfield();
    followField();
    showParticles();
}