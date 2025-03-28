import { useState } from 'react';

const JournalInput = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [disableText, setDisableText] = useState(false);
    const [disableFile, setDisableFile] = useState(false);

    const fileToString = (e) => {
        const fileIn = e.target.files[0];

        if(fileIn != undefined) {
            const reader = new FileReader();
            setDisableText(true);

            reader.onload = () => {
                setText(reader.result.toString());
            };
            reader.onerror = () => {
                console.log("Error reading the file.  Please try again.");
            };

            reader.readAsText(fileIn);
        } else if(fileIn == undefined) setDisableText(false);
    };

    const handleText = (e) => {
        if(e.target.value != '') {
            setDisableFile(true);
            setText(e.target.value);
        }   else if(e.target.value == '') setDisableFile(false);
    };

    const analyze = async () => {
        // ensure no empty requests are sent
        if(text === '') return;

        try {
            const res = await fetch("/api/analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            // throw error if encountered error in fetching the analysis
            if(!res.ok) throw new Error("Failed to perform analysis.");

            const data = await res.json();
            setResult(data); // TODO: generate colour palette
        } catch(err) {
            console.error("Error fetching sentiment:", err);
            setResult({ err: "Failed to analyze text" });
        }
        console.log(result); // for testing TODO: remove
    };

    return(
        <div className="input-container">
            <div className="logo-banner">
                TODO: insert custom logo banner here
            </div>

            <div className="input-area">
                <label htmlFor="txtfile">Select a text file to upload:</label>
                <input type="file" id="txtfile" name="txtfile" accept=".txt" onChange={ fileToString } disabled={ disableFile }></input>

                <h3>OR</h3>
                <textarea name="textEntry" id="textEntry" placeholder="Enter journal entry here..." onChange={ handleText } disabled={ disableText }></textarea>
                <button type="button" name="toSubmit" onClick={ analyze }>Submit Entry</button>
            </div>
        </div>
    )
};

export default JournalInput;