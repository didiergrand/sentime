import { validURL } from './validUrl'

function resetForm(){
    document.getElementById('urlerror').style.display = 'none';
    document.getElementById('answer').style.display = 'none';
    document.getElementById('question').style.display = 'block';
    document.getElementById('url').value = '';
}
function handleSubmit(event) {
    event.preventDefault()

    const baseURL = "/sentime";
    const url = document.getElementById('url').value; 
    const lang = document.getElementById('lang').value; 
    if(validURL(url)){
        fetch(baseURL, { 
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: url, lang: lang})
        })
        .then(res => res.json()) 
        .then(function (res) { 
            let score_tagStr = res.score_tag;
            switch(res.score_tag) {
               case "P+": {
                score_tagStr = "Strong positive";
                    break;
               }
               case "P": {
                score_tagStr = "Positive";
                    break;
               }
               case "NEU": {
                score_tagStr = "Neutral";
                    break;
               }
               case "N": {
                score_tagStr = "Negative";
                    break;
               }
               case "N+": {
                score_tagStr = "Strong negative";
                    break;
               }
               default: {
                score_tagStr = "Without polarity";
                    break;
               }
            }

            let subjectivityStr = res.subjectivity;
            switch(res.subjectivity) {
               case "OBJECTIVE": {
                subjectivityStr = "Objective";
                    break;
               }
               default: {
                subjectivityStr = "Subjective";
                    break;
               }
            }

            let ironyStr = res.irony;
            switch(res.irony) {
               case "NONIRONIC": {
                ironyStr = "Nonironic";
                    break;
               }
               default: {
                ironyStr = "Ironic";
                    break;
               }
            }   

            document.getElementById('sentimezed_url').innerHTML = "<a href="+url+" target='_blank'>"+url+"</a>";    
            document.getElementById('score_tag').innerHTML = score_tagStr;    
            document.getElementById('subjectivity').innerHTML = subjectivityStr;    
            document.getElementById('irony').innerHTML = ironyStr;    
            

            document.getElementById('answer').style.display = 'block';
            document.getElementById('question').style.display = 'none';
        })
        .catch((error) => {
            console.log("error : ", error);
        })
    } else {
        document.getElementById('urlerror').style.display = 'block';
    }

}

export { resetForm }
export { handleSubmit }