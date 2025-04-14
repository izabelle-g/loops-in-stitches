import { useRef, useEffect, useState } from 'react'; 
import Swatch from "./Swatch";
import p5 from "p5";

const testPalettes = [
    ['#6f1dec', '#103466', '#f10dc3', '#916d1f', '#7e517a', '#b0fc26', '#36ae35', '#271e1a'],
    ['#6fbccc', '#10eef6', '#f12303', '#91ddff', '#7adbff', '#b99112', '#36ad35', '#2811ef'],
    ['#6f1dec', '#103466', '#f10dc3', '#916d1f', '#7e517a', '#b0fc26', '#36ae35', '#271e1a']
  ];
let cells;
let zoff = 0;
let fGrid = 14; 
let flowfield = [];
let zInc;
let drawArea = fGrid * 43;
let isLoop = true;

const P5Canvas = (props) => {
    const [num, setNum] = useState(0);
    const [curPalette, setCurPalette] = useState(props.palettes[0]);
    const [palette, setPalette] = useState(curPalette);
    //const [isLoop, setLoop] = useState(true);
    const handleClick = (e) => {
        if(e.target.name == "palette1") setNum(0);
        else if(e.target.name == "palette2") setNum(1);
        else if(e.target.name == "palette3") setNum(2);
        setCurPalette(props.palettes[num]);
    };

    const size = 4; // size of piece in inches in real life
    const patterns = [
        { name: 'smoke', controls: [ { type: 'playback', btn1: '&#9205;', btn2: '&#9208;' },
                                     { type: 'speed', inc: 0, min: 0, max: 0 },
                                     { type: 'zoom', inc: 0, min: 0, max: 0 },
                                     { type: 'angle', inc: 0, min: 0, max: 0 }
                                    ] },
    ];
    const canvasRef = useRef();

    useEffect(() => { 
        const sketch = (p) => {
            p.setup = () => {
                p.createCanvas(drawArea, drawArea).parent(canvasRef.current);
                setupFlowfield();

                // ensures the palette is strictly 10 colours
                let temp = [];
                if(temp.length >= 10);
                else {
                    for(let i = 0; i < curPalette.length - 1; i++) {
                        temp.push( curPalette[i] );
                        if(i == curPalette.length - 2) temp.push( midColour( curPalette[i], curPalette[curPalette.length - 1], p ) );
                        else temp.push( midColour( curPalette[i], curPalette[i + 1], p) );
                    }
                    setPalette(temp);
                    props.threads(temp);
                }
            };
            p.draw = () => {
                generateFlowfield(p, 1, 1);
                
                //showFlowfield(p);
                smoke(p, palette);
            };
        };

        const p5sketch = new p5(sketch);
        return () => p5sketch.remove();
     }, [ curPalette ] );
    return (
        <div className='canvas-container'>
            <div className='palette'>
                <ul>
                    { palette.map( (c, index) => {
                        return <li key={ index }><Swatch colour={c}/></li>
                    } ) }
                </ul>
            
                <button type="button" name="palette1" onClick={ handleClick }>1</button>
                <button type="button" name="palette2" onClick={ handleClick }>2</button>
                <button type="button" name="palette3" onClick={ handleClick }>3</button>
            </div>

            <div className='canvas'>
                <p>{ props.emotion }</p>
                <div ref={ canvasRef }></div>
            </div>

            <div className='controls'>
                <div className='patternSelector'>
                    <button type="button" name="prevPattern" id='prevPattern' onClick={ '' }>&#9204;</button>
                    <p>{ /*TODO: curPattern*/ }</p>
                    <button type="button" name="nextPattern" id='nextPattern' onClick={ '' }>&#9205;</button>
                </div>
                <div className='stitchGrid'>
                    <button type="button" name="grid" id='grid' onClick={ '' }>&#8862;</button>
                </div>
                <div className='ctaida'>
                    <label for='aida'>aida ct: </label>
                    <select name='aida' id='aida'>
                        <option value='7'>7</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                        <option value='14'>14</option>
                        <option value='16'>16</option>
                        <option value='18'>18</option>
                        <option value='20'>20</option>
                    </select>
                </div>
            </div>
        </div>
    )
};

export default P5Canvas;


/*************** CONTROLS **************/
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

/*************** FLOWFIELD **************/
function setupFlowfield() {
    cells = p5.prototype.floor( drawArea / fGrid );
    flowfield = new Array( cells * cells );
}

function generateFlowfield(p, speed, ang) {
    let inc = 0.02;
    let zInc = 0.0005 * speed; 
    zInc = 0.0004;
    let yoff = 0;

    for( let y = 0; y < cells; y++ ){
        let xoff = 0;
        for( let x = 0; x < cells; x++ ){
            let index = x + y * cells;
            let n = p.noise(xoff, yoff, zoff);
            let angle = n * p.TAU * ang;
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


/*************** COLOUR BLEND **************/
function midColour(c1, c2, p){
    let mid = p.lerpColor( p.color(c1), p.color(c2), 0.5);
    return mid.toString("#rrggbb");
}


/*************** PATTERNS **************/
function smoke(p, palette) {
    p.background(255);  
    zInc = 0.0002;
    for(let f of flowfield) {
        let n = p.noise( f[0].x, f[0].y, zoff );
        let index = p.floor( p.map( n, 0, 1, 0, palette.length - 1, true) );
        p.push();
        p.noStroke();
        p.translate( f[1] * fGrid+fGrid, f[2] * fGrid+fGrid/2 );
        p.fill( p.color(palette[ index ]) );
        p.rect( f[0].x - fGrid, f[0].y - ( fGrid / 2 ), fGrid, fGrid );
        p.pop();
    }
}