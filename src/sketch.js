const drawArea = 600;
const aida = [ 11, 14, 16, 18, 20, 22, 25, 28, 32 ];  // aida cloth sizes; TODO: make slider
let inches = 4; // TODO: make slider/buttons/???
let aidaSlider, spdSlider, vecSlider;

function setup() {
    let canvas = createCanvas( drawArea, drawArea );
    canvas.position( ( ( windowWidth - drawArea )/2 ), ( ( windowHeight - drawArea )/2 ) ); // center canvas
    setupFlowfield();
    createParticles();
    setupControls();
    //stitchGrid();
}

function draw() {
    generateFlowfield();
    showFlowfield();
    //stitchGrid();
    //scales();
    //followField();
    //showParticles();
}

function stitchGrid() { // TODO: figure out how to make it stop repeating thingies
    let iGrid = drawArea / inches;
    let sGrid = iGrid / aida[ aidaSlider.value() ];
    let grid = drawArea / sGrid;

    strokeWeight(1);
    noFill();

    for( let y = 0; y < grid; y++ ) { 
        for( let x = 0; x < grid; x++ ) {
            stroke( 0, 10 );
            rect( x * sGrid, y * sGrid, sGrid, sGrid ); // TODO: will be replaced by the cross stitch texture
        }
    }

    // the inch grid
    for( let y = 0; y < inches; y++ ) {
        for( let x = 0; x < inches; x++ ) {
            stroke( 255, 0, 0, 50 );
            rect( x * iGrid, y * iGrid, iGrid, iGrid );
        }
    }
}

function setupControls() {
    //text( 'Speed', ( ( windowWidth + drawArea )/2 ), ( windowHeight - drawArea ) ); // TODO: figure out this thing
    aidaSlider = createSlider( 0, 8, 0, 1 );
    aidaSlider.position( ( ( windowWidth + drawArea )/2 ), ( windowHeight - drawArea ) - 60 );  
    aidaSlider.size(80);

    //text( 'Speed', ( ( windowWidth + drawArea )/2 ), ( windowHeight - drawArea ) ); // TODO: figure out this thing
    spdSlider = createSlider( 1, 5, 1, 1 );
    spdSlider.position( ( ( windowWidth + drawArea )/2 ), ( windowHeight - drawArea ) );  
    spdSlider.size(80);
}