const JournalInput = () => {
    return(
        <div class="input-container">
            <div class="logo-banner">
                TODO: insert custom logo banner here
            </div>

            <div class="input-area">
                <label for="txtFile">Select a text file to upload: </label>
                <input type="file" id="txtfile" accept=".txt"></input>

                <label for="textEntry">OR type journal entry:</label>
                <textarea id="textEntry"></textarea>
                <input type="button" id="entryBtn" value="Submit Entry"></input>
            </div>
        </div>
    )
};

export default JournalInput;