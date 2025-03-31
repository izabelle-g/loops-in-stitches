import p5 from "p5";

const NUM_COL = 8; // only 8 colours for each palette
const NUM_PAL = 3; // only 3 palettes for each session
const COL_MAP = [
    { fear: [
        { h: [0, 360], s: [0, 10], l: [0, 20] }, // black
        { h: [0, 360], s: [0, 10], l: [30, 80] }, // gray
        { h: [0, 15], s: [80, 100], l: [50, 80] }, // red
        { h: [260, 280], s: [60, 100], l: [60, 80] }, // purple
    ] },
    { neutral: [
        { h: [0, 360], s: [0, 10], l: [80, 100] }, // white
        { h: [90, 130], s: [20, 45], l: [80, 100] }, // green
        { h: [200, 240], s: [20, 45], l: [80, 100] }, // blue
        { h: [170, 190], s: [30, 80], l: [85, 95] }, // turquiose
    ] },
    { sadness: [
        { h: [0, 360], s: [0, 10], l: [20, 30] }, // black
        { h: [0, 360], s: [0, 10], l: [30, 80] }, // gray
        { h: [200, 240], s: [60, 100], l: [50, 70] }, // blue
    ] },
    { disgust: [
        { h: [10, 40], s: [50, 80], l: [40, 70] }, // brown
        { h: [90, 130], s: [60, 100], l: [30, 50] }, // green
    ] },
    { surprise: [
        { h: [15, 45], s: [30, 80], l: [95, 100] }, // orange
        { h: [45, 60], s: [30, 80], l: [95, 100] }, // yellow
        { h: [290, 335], s: [20, 75], l: [95, 100] }, // pink
    ] },
    { anger: [
        { h: [0, 360], s: [0, 10], l: [0, 30] }, // black
        { h: [0, 15], s: [80, 100], l: [50, 80] }, // red
    ] },
    { joy: [
        { h: [45, 60], s: [30, 80], l: [95, 100] }, // yellow
        { h: [20, 40], s: [30, 80], l: [95, 100] }, // orange
        { h: [290, 335], s: [20, 75], l: [95, 100] }, // pink
        { h: [0, 15], s: [80, 100], l: [80, 95] }, // red
        { h: [260, 280], s: [30, 60], l: [80, 100] }, // purple
        { h: [90, 130], s: [20, 45], l: [80, 100] }, // green
        { h: [170, 190], s: [40, 80], l: [85, 95] }, // turquiose
    ] },
];
let palettes = []; // palettes to be used for pattern generation

// TODO: Remove later on
const test1 = [ 
    { label: 'fear', score: 0.9617002010345459 },
    { label: 'neutral', score: 0.011039502918720245 },
    { label: 'sadness', score: 0.00931981485337019 },
    { label: 'disgust', score: 0.008170760236680508 },
    { label: 'surprise', score: 0.004774100612848997 },
    { label: 'anger', score: 0.0035738563165068626 },
    { label: 'joy', score: 0.0014216917334124446 }
];

const test2 = [
    { label: 'anger', score: 0.004419783595949411},
    { label: 'disgust', score: 0.0016119900392368436},
    { label: 'fear', score: 0.0004138521908316761},
    { label: 'joy', score: 0.9771687984466553},
    { label: 'neutral', score: 0.005764586851000786},
    { label: 'sadness', score: 0.002092392183840275},
    { label: 'surprise', score: 0.008528684265911579}
];

function genPalette(results) {
    let newPalette = [];
    let comp = [];
    
    // Sort results in decreasing order of score
    sortRes(results);

    // Divide the 8-colour palette based on percentage of results
    for(let r of results) {
      let num = p5.prototype.floor(r.score * NUM_COL);
      
      for(let i = 0; i < num; i++) {
        if(comp.length < NUM_COL) comp.push(r);
      }
      if(num == 0 && comp.length < NUM_COL) comp.push(r);
    }
    
    // Create a palette based on results by randomizing pre-set values of colour-emotion association
    for(let i = 0; i < comp.length; i++){
        let sel = find(comp[i].label);
        let rcol = p5.prototype.random(sel);
        let newCol = hslToHex(p5.prototype.random(rcol.h), p5.prototype.random(rcol.s), p5.prototype.random(rcol.l));
        newPalette.push(newCol);
    }

    palettes.push(newPalette);
}
  
function find(emo) {
      for(let c of COL_MAP){
          let list = Object.getOwnPropertyNames(c);
          if(list[0] == emo){
            let emoteArray = Object.entries(c.valueOf(emo))[0][1];
            return emoteArray;
          }
      }
}
  
function sortRes(result) {
    let swapped = false;
    
    for(let i = 0; i < result.length; i++){
      swapped = false;
      for(let j = 0 ; j < result.length - i -1; j++){
        if(result[j].score < result[j+1].score) {
          [ result[j], result[j+1] ] = [ result[j+1], result[j] ];
            swapped = true;
        }
      }
      if(swapped === false) break;
    }
    return result;
}

function hslToHex(h, s, l) {
    let chroma, h1, x, match;
    let r, g, b, r1, g1, b1;
    let hex = '';

    let sat = p5.prototype.map(s, 0, 100, 0, 1);
    let light = p5.prototype.map(l, 0, 100, 0, 1);

    chroma = ( 1 - Math.abs( (2 * light) - 1 ) ) * sat;
    h1 = h / 60;
    x = ( chroma * ( 1 - Math.abs( (h1 % 2) - 1 ) ) );
    match = light - ( chroma / 2 );

    if(0 <= h1 && h1 < 1) {
      r1 = chroma;
      g1 = x;
      b1 = 0;
    } else if(1 <= h1 && h1 < 2) {
      r1 = x;
      g1 = chroma;
      b1 = 0;
    } else if(2 <= h1 && h1 < 3) {
      r1 = 0;
      g1 = chroma;
      b1 = x;
    } else if(3 <= h1 && h1 < 4) {
      r1 = 0;
      g1 = x;
      b1 = chroma;        
    } else if(4 <= h1 && h1 < 5) {
      r1 = x;
      g1 = 0;
      b1 = chroma;
    } else if(5 <= h1 && h1 < 6) {
      r1 = chroma;
      g1 = 0;
      b1 = x;     
    } 
  
    r = p5.prototype.round( (r1 + match) * 255 );
    g = p5.prototype.round( (g1 + match) * 255 );
    b = p5.prototype.round( (b1 + match) * 255 );
  
    return hex.concat('#',r.toString(16), g.toString(16), b.toString(16));
}