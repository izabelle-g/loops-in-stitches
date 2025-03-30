const DesignArea = (props) => {
    const handleClick = (e) => { props.update(e.target.name) };

    return(
        <div>
            
            <button type="button" name="toHome" onClick={ handleClick }>Back</button>
            <button type="button" name="toExport" onClick={ handleClick }>Export</button>
        </div>
    )
}

export default DesignArea;

const handleClick = (e) => {
    props.update([e.target.name, e.target.value]);
}