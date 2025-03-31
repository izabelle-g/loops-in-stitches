import { useState } from "react";

const PaletteArea = (props) => {
    const [palette, setPalette] = useState(0);

    const handleClick = (e) => {
        if(e.target.name == "palette1") setPalette = 0;
        else if(e.target.name == "palette2") setPalette = 1;
        else if(e.target.name == "palette3") setPalette = 2;
    };

    return(
        <div>
            <ul>
                {/* TODO: add the li iteration here */}
                <Swatch palette={ props.palettes[palette] }></Swatch>
            </ul>

            <button type="button" name="palette1" onClick={ handleClick }>1</button>
            <button type="button" name="palette2" onClick={ handleClick }>2</button>
            <button type="button" name="palette3" onClick={ handleClick }>3</button>
        </div>
    )
};

export default PaletteArea;