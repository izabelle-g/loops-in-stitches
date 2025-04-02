import { useState } from "react";
import Swatch from "./Swatch";

const PaletteArea = (props) => {
    const [num, setNum] = useState(0);
    const [palette, setPalette] = useState(props.palettes[0]);

    const handleClick = (e) => {
        if(e.target.name == "palette1") setNum(0);
        else if(e.target.name == "palette2") setNum(1);
        else if(e.target.name == "palette3") setNum(2);
        props.curPalette(num);
        setPalette(props.palettes[num]);
    };

    return(
        <div>
            <ul>
                { palette.map( (c, index) => {
                    return <li key={ index }><Swatch colour={c}/></li>
                } ) }
            </ul>

            <button type="button" name="palette1" onClick={ handleClick }>1</button>
            <button type="button" name="palette2" onClick={ handleClick }>2</button>
            <button type="button" name="palette3" onClick={ handleClick }>3</button>
        </div>
    )
};

export default PaletteArea;