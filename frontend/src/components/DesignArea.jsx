import P5Canvas from "./P5Canvas";
import { useState } from 'react';

const DesignArea = (props) => {
    const [toThreads, setToThreads] = useState([]);
    const [threadList, setThreadList] = useState([]);
    let threads = [];
    const handleBack = (e) => { props.update(e.target.name) };
    const handleExport = async () => {
      // TODO: call to supabase
    };      

      
    const getToThreads = (c) => { setToThreads(c) };

    return(
        <div className="designArea">            
            <P5Canvas palettes={props.palettes} emotion={props.emotion} threads={ getToThreads }/>
            <br></br>

            <div className='buttons'>
              <button type="button" name="toHome" className="btnBack" onClick={ handleBack }>Back</button>
              <button type="button" name="toExport" className="btnExport" onClick={ handleExport }>Export</button>
            </div>
        </div>
    )
}

export default DesignArea;