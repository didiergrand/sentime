function resetForm(){
    document.getElementById('answer').style.display = 'none';
    document.getElementById('question').style.display = 'block';
    document.getElementById('url').value = '';
}

function handleSubmit(event) {
    event.preventDefault()

    const baseURL = "/summary";
    const url = document.getElementById('url').value; //url inserted by user
    const sentences = document.getElementById('sentences').value; //url inserted by user

    fetch(baseURL, { //sends the user's URL to the server for the API to use
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: url, sentences: sentences})
    })
    .then(res => res.json()) //translate response obj to json:
    .then(function (res) { //posts the retrieved data to the webpage

        document.getElementById('summary').innerHTML = res.summary;    
        document.getElementById('answer').style.display = 'block';
        document.getElementById('question').style.display = 'none';
    })
    .catch((error) => {
        console.log("error : ", error);
    })

}

export { resetForm }
export { handleSubmit }