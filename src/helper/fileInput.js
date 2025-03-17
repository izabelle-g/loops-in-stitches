const fileInput = document.getElementById("txtFile");
const submit = document.getElementById('textBtn');
const key = "07a4207b0f75eed05b31957cb1d2d16bc3bc7ce5"; // TODO: hide this
const model = "finetuned-llama-3-70b";

submit.addEventListener("click", () => {
    let textIn = document.getElementById('textEntry').value;
    const fileIn = fileInput.files[0];

    if(textIn == "" && fileIn == undefined) {
        console.log("No entry found.  Please enter journal entry.");
    } else if(textIn != "" && fileIn == undefined) {
        seAnalysis(textIn);
        textIn = "";
    } else if(fileIn != undefined && textIn == "") {
        const reader = new FileReader();
        reader.onload = () => {
            let inString = reader.result.toString();
            seAnalysis(inString);
        };
        reader.onerror = () => {
            console.log("Error reading the file.  Please try again.");
        }
        reader.readAsText(fileIn);
    }
});

function seAnalysis (entry) { //TODO: CHANGE TO IMPORT THINGY LOOK AT YOUR GITHUB
    const NLPCloudClient = require('nlpcloud');
    const client = new NLPCloudClient(model, key, true);
    
    client.sentiment({
        text: entry,
        target: ''
    }).then( (resp) => {
        console.log(resp.data);
    }).catch( (err) => {
        console.error(err.response.status);
        console.error(err.response.data.detail);
    });
}


