const PaletteArea = () => {
    const handleClick = (e) => {
        if(e.target.name == "next") {

        } else if(e.target.name == "prev") {
            
        }
    };

    // refresh palette with next or different palette
    const handleChange = () => {

    };

    return(
        <div>
            <button type="button" name="next" onClick={ handleClick }>Next</button>
            <button type="button" name="prev" onClick={ handleClick }>Back</button>
        </div>
    )
};

export default PaletteArea;