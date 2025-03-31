const DesignArea = (props) => {
    const handleClick = (e) => { props.update(e.target.name) };

    console.log(props.analysis);

    return(
        <div>
            <button type="button" name="toHome" onClick={ handleClick }>Back</button>
            <button type="button" name="toExport" onClick={ handleClick }>Export</button>
        </div>
    )
}

export default DesignArea;