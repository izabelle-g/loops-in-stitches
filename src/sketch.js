const drawArea = 600;
const aida = [ 11, 14, 16, 18, 20, 22, 25, 28, 32 ];  // aida cloth sizes; TODO: make slider
let inches = 4; // TODO: make slider/buttons/???

function setup() {
    let canvas = createCanvas( drawArea, drawArea );
    canvas.position( ( ( windowWidth - drawArea )/2 ), ( ( windowHeight - drawArea )/2 ) ); // center canvas
    setupFlowfield();
    createParticles();
    //stitchGrid();
}

function draw() {
    generateFlowfield();
    //showFlowfield();
    //stitchGrid();
    scales();
    //followField();
    //showParticles();
}

function stitchGrid() {
    let iGrid = drawArea / inches;
    let sGrid = iGrid / aida[0]; // TODO: will be changed by slider/dropdown
    let grid = drawArea / sGrid;

    strokeWeight(1);
    noFill();

    for( let y = 0; y < grid; y++ ) { 
        for( let x = 0; x < grid; x++ ) {
            stroke( 0, 10 );
            rect( x * sGrid, y * sGrid, sGrid, sGrid ); // will be replaced by the crosses
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

function pixelize() {

}