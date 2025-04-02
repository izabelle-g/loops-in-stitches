import { useState, useEffect } from 'react';

const NUM_PAL = 3; // only 3 palettes for each session
const NUM_COL = 8; // only 8 colours for each palette
const COL_MAP = [
    { fear: [
        { h: [0, 359], s: [0, 10], l: [0, 20] }, // black
        { h: [0, 359], s: [0, 10], l: [30, 80] }, // gray
        { h: [0, 15], s: [80, 100], l: [50, 80] }, // red
        { h: [260, 280], s: [60, 100], l: [60, 80] }, // purple
    ] },
    { neutral: [
        { h: [0, 359], s: [0, 10], l: [80, 100] }, // white
        { h: [90, 130], s: [20, 45], l: [80, 100] }, // green
        { h: [200, 240], s: [20, 45], l: [80, 100] }, // blue
        { h: [170, 190], s: [30, 80], l: [85, 95] }, // turquiose
    ] },
    { sadness: [
        { h: [0, 359], s: [0, 10], l: [20, 30] }, // black
        { h: [0, 359], s: [0, 10], l: [30, 80] }, // gray
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
        { h: [0, 359], s: [0, 10], l: [0, 30] }, // black
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

const JournalInput = (props) => {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [disableText, setDisableText] = useState(false);
    const [disableFile, setDisableFile] = useState(false);

    const fileToString = (e) => {
        const fileIn = e.target.files[0];

        if(fileIn != undefined) {
            const reader = new FileReader();
            setDisableText(true);

            reader.onload = () => {
                setText(reader.result.toString());
            };
            reader.onerror = () => {
                console.log("Error reading the file.  Please try again.");
            };

            reader.readAsText(fileIn);
        } else if(fileIn == undefined) setDisableText(false);
    };

    const handleText = (e) => {
        if(e.target.value != '') {
            setDisableFile(true);
            setText(e.target.value);
        }   else if(e.target.value == '') setDisableFile(false);
    };

    const analyze = async (e) => {
        // ensure no empty requests are sent
        if(text === '') return;

        try {
            const res = await fetch("/api/analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            // throw error if encountered error in fetching the analysis
            if(!res.ok) throw new Error("Failed to perform analysis.");

            const data = await res.json();
            setResult(data.response);

            let newPalettes = [];
            for(let i = 0; i < NUM_PAL; i++) {
                newPalettes.push(genPalette(data.response));
            }

            props.palettes(newPalettes);
            props.update(e.target.name);
        } catch(err) {
            console.error("Error fetching sentiment:", err);
            setResult({ err: "Failed to analyze text" });
        }
    };

    return(
        <div className="input-container">
            <div className="logo-banner">
                TODO: insert custom logo banner here
            </div>

            <div className="input-area">
                <label htmlFor="txtfile">Select a text file to upload:</label>
                <br></br>
                <input type="file" id="txtfile" name="txtfile" accept=".txt" onChange={ fileToString } disabled={ disableFile }></input>

                <h3>OR</h3>
                <br></br>
                <textarea name="textEntry" id="textEntry" placeholder="Enter journal entry here..." onChange={ handleText } disabled={ disableText }></textarea>
                <br></br>
                <button type="button" name="toCanvas" onClick={ analyze }>Submit Entry</button>
                <button type="button" name="toCanvas" onClick={ (e) => {props.update(e.target.name)} }>Bypass</button>
            </div>
        </div>
    )
};

export default JournalInput;

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
        let h = p5.prototype.random(rcol.h);
        let s = p5.prototype.random(rcol.s);
        let l = p5.prototype.random(rcol.l);
        let newCol = hslToHex( h, s, l );
        newPalette.push(newCol);
    }

    return newPalette;
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
  
    return hex.concat('#',p5.prototype.hex(r, 2), p5.prototype.hex(g, 2), p5.prototype.hex(b, 2));
}