import { useRef, useEffect } from 'react'; 
import p5 from "p5";

const P5Canvas = (props) => {
    const aida = [ 11, 14, 16, 18, 20, 22, 25, 28, 32 ]; // aida fabric count sizes
    const size = 4; // size of piece in inches in real life
    const canvasRef = useRef();

    const drawArea = 640;
    let palettes = [];

    useEffect(() => { 
        const sketch = (p) => {
            p.preload = () => {
                for(let i of props.palettes) {
                    let colObjs = [];
                    for(let q of i) colObjs.push(p.color(q)); 
                    palettes.push(colObjs);
                }
            };
            p.setup = () => {
                p.createCanvas(drawArea, drawArea).parent(canvasRef.current);
            };
            p.draw = () => {
                p.background(255);
                let x = 0;
                let y = 0;
                let w = 40;
                let h = 40;

                for(let c of palettes[props.curPalette]){ 
                    p.noStroke();
                    p.fill(c);
                    p.rect(x, y, w, h);
                    x += w;
                    y += h;
                  }
            };
        };

        const p5sketch = new p5(sketch);
        return () => p5sketch.remove();
     }, [] );
    return <div ref={canvasRef}></div>;
};

export default P5Canvas;

/* function stitchGrid() { // TODO: figure out how to make it stop repeating thingies maybe use create image
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
} */