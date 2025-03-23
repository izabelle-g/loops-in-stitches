import NLPCloudClient from "nlpcloud";

const fileInput = document.getElementById("txtFile");
const submit = document.getElementById('textBtn');
const url = "https://api.nlpcloud.io/v1/finetuned-llama-3-70b/sentiment"; // TODO: hide later
const key = "63f2ca79ed66dacb420f1203e35293132c61f0be"; // TODO: hide later

// handle journal entry input and analyze emotions
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

async function seAnalysis (entry) {
    try {
        const response = await client.sentiment(entry);
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}


