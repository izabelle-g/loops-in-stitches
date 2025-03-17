const fileInput = document.getElementById("txtFile");

fileInput.addEventListener("change", handleFileSelection);

function handleFileSelection(event) {
  const file = event.target.files[0];
  
  // Validate file existence and type
  if (!file) {
    showMessage("No file selected. Please choose a file.", "error");
    return;
  }

  // Read the file
  const reader = new FileReader();
  reader.onload = () => {
    const inString = reader.result.toString();
    console.log(inString);
  };
  reader.onerror = () => {
    showMessage("Error reading the file. Please try again.", "error");
  };
  reader.readAsText(file);
}

// Displays a message to the user
function showMessage(message, type) {
  messageDisplay.textContent = message;
  messageDisplay.style.color = type === "error" ? "red" : "green";
}

const submit = document.getElementById('textBtn');

submit.addEventListener("click", () => {
    const entry = document.getElementById('textEntry').value;
    if(entry == "") {
        console.log("No entry found.  Please input in text area.");
    } else{
        console.log(entry);
    }
});

