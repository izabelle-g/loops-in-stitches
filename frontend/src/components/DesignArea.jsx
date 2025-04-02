import P5Canvas from "./P5Canvas";

const DesignArea = (props) => {
    const handleBack = (e) => { props.update(e.target.name) };
    const handleExport = () => {

    };

    return(
        <div className="designArea">            
            <P5Canvas palettes={props.palettes} emotion={props.emotion}/>
            <br></br>

            <div className='buttons'>
              <button type="button" name="toHome" className="btnBack" onClick={ handleBack }>Back</button>
              <button type="button" name="toExport" className="btnExport" onClick={ handleExport }>Export</button>
            </div>
        </div>
    )
}

export default DesignArea;