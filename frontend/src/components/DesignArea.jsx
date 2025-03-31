import P5Canvas from "./P5Canvas";
import PaletteArea from "./PaletteArea"
import { useState } from "react";

const DesignArea = (props) => {
    const [curPalette, setCurPalette] = useState('0');
    const getCurPalette = (e) => { setCurPalette(curPalette) };
    const handleClick = (e) => { props.update(e.target.name) };

    //console.log(props.analysis);

    return(
        <div>
            {/*<P5Canvas palettes={props.palettes} curPalette={ curPalette } />*/}
            <PaletteArea palettes={props.palettes} curPalette={ getCurPalette } />
            <br></br>
            <button type="button" name="toHome" onClick={ handleClick }>Back</button>
            <button type="button" name="toExport" onClick={ handleClick }>Export</button>
        </div>
    )
}

export default DesignArea;