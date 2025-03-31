const DesignArea = (props) => {
    const handleClick = (e) => { props.update(e.target.name) };

    console.log(props.palettes); // these are in hex values btw

    return(
        <div>
            <p>{test}</p>
            <button type="button" name="toHome" onClick={ handleClick }>Back</button>
            <button type="button" name="toExport" onClick={ handleClick }>Export</button>
        </div>
    )
}

export default DesignArea;