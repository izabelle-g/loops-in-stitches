import { useState } from "react";
import Swatch from "./Swatch";

const PaletteArea = (props) => {
    const [palette, setPalette] = useState(0);

    const handleClick = (e) => {
        if(e.target.name == "palette1") setPalette(0);
        else if(e.target.name == "palette2") setPalette(1);
        else if(e.target.name == "palette3") setPalette(2);
        props.curPalette(palette);
    };

    return(
        <div>
            <ul>
                <Swatch/>
            </ul>

            <button type="button" name="palette1" onClick={ handleClick }>1</button>
            <button type="button" name="palette2" onClick={ handleClick }>2</button>
            <button type="button" name="palette3" onClick={ handleClick }>3</button>
        </div>
    )
};

export default PaletteArea;