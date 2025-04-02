import { useRef, useEffect } from 'react'; 
import p5 from "p5";

const drawArea = 640;
const testPalettes = [
    ['#6f1dec', '#103466', '#f10dc3', '#916d1f', '#7e517a', '#b0fc26', '#36ae35', '#271e1a'],
    ['#6fbccc', '#10eef6', '#f12303', '#91ddff', '#7adbff', '#b99112', '#36ad35', '#2811ef'],
    ['#6f1dec', '#103466', '#f10dc3', '#916d1f', '#7e517a', '#b0fc26', '#36ae35', '#271e1a']
  ];
let cells;
let zoff = 0;
let fGrid = 11;  // for demo purposes, it is hard set to 11 for the smallest aida count fabric
let flowfield = [];

const P5Canvas = (props) => {
    const aida = [ 11, 14, 16, 18, 20, 22, 25, 28, 32 ]; // aida fabric count sizes
    const size = 4; // size of piece in inches in real life
    const canvasRef = useRef();
    let palettes = [];

    useEffect(() => { 
        const sketch = (p) => {
            p.preload = () => {
                for(let i of testPalettes) {
                    let colObjs = [];
                    for(let q of i) colObjs.push(p.color(q)); 
                    palettes.push(colObjs);
                }
            };
            p.setup = () => {
                p.createCanvas(drawArea, drawArea).parent(canvasRef.current);
                setupFlowfield();
            };
            p.draw = () => {
                generateFlowfield(p);
                //showFlowfield(p);
                smoke(p);
            };
        };

        const p5sketch = new p5(sketch);
        return () => p5sketch.remove();
     }, [] );
    return <div ref={canvasRef}></div>;
};

export default P5Canvas;

function stitchGrid() { // TODO: figure out how to make it stop repeating thingies maybe use create image
    background(255);
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

function setupFlowfield() {
    cells = p5.prototype.floor( drawArea / fGrid );
    flowfield = new Array( cells * cells );
}

function generateFlowfield(p) {
    let inc = 0.02; // TODO: add zoom control
    //let zInc = 0.0005 * spdSlider.value(); 
    let zInc = 0.0004;
    let yoff = 0;

    for( let y = 0; y < cells; y++ ){
        let xoff = 0;
        for( let x = 0; x < cells; x++ ){
            let index = x + y * cells;
            let n = p.noise(xoff, yoff, zoff);
            let angle = n * p.TAU * 1; // TODO: add cells(?) control, in code, it changes the angle of the vector
            let v = p5.Vector.fromAngle(angle);

            xoff += inc;
            v.setMag(2);
            flowfield[index] = [v, x, y];
        }
        yoff += inc;
        zoff += zInc;
    }
}

function showFlowfield(p) {
    p.background(255);
    for( let f of flowfield ) {
        if( f != undefined ) {
            p.push();
            p.translate( f[1] * fGrid, f[2] * fGrid );
            p.rotate( f[0].heading() );
            p.stroke(0);
            p.strokeWeight(1); 
            p.line( fGrid/2, fGrid/2, fGrid, 0 );
            p.pop();
        }
    }
}

function smoke(p) {
    p.background(255);
    zInc = 0.0009;
    for(let f of flowfield) {
      let n = p.noise( f[0].x, f[0].y, zoff );
      p.push();
      p.noStroke();
      p.translate( f[1] * fGrid+fGrid, f[2] * fGrid+fGrid/2 );
      p.fill( getColour(n) );
      p.rect( f[0].x, f[0].y, fGrid, fGrid );
      p.pop();
    }
}