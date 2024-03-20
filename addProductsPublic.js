const API = 'http://localhost:3000/api/proxy'

function getThisSub(x, id) {
    checkAndRemoveChild(id);
    const api = `${API}/addprodgetcat?category_id=${x}`;
    fetch(api, {
        method : 'GET',
        credentials: "include"
    })
    .then(res => {
        if(res.ok){
            return res.json();
        } else if(res.status === 403) {
            throw new Error('Forbidden');
        } else {
            throw new Error('Request failed');
        }
    })
    .then(data => {
        let newSpan = document.createElement('span');
        if(data.id === 'subcategories') {
            newSpan.setAttribute('id', `thisis${data.depth}`);
            newSpan.innerHTML = data.htmlBody;
            document.getElementById(data.id).appendChild(newSpan);
        }
    })
    .catch(err => {
        if(err instanceof TypeError) {} 
        else if(err.message === 'Forbidden') {
            window.location.href = '/error/forbidden-page';
        }
        else {throw err}
    });
}

function checkAndRemoveChild(id) {
    let childId = parseInt(id) + 1;
    let childOfThis = document.getElementById(`thisis${childId}`);
    if(childOfThis) {
        checkAndRemoveChild(`${childId}`);
        childOfThis.remove();
    }
}

function resetForm() {
    checkAndRemoveChild(0);
    const incval = document.getElementById('incorrectval');
    if(incval){
        incval.remove();
        const submit = document.getElementById('submitbtn');
        submit.disabled = false;
        submit.removeAttribute('style')
        document.getElementById('prodPrice').removeAttribute('style');
        document.getElementById('prodQuantity').removeAttribute('style');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const quantity = document.getElementById('prodQuantity');
    const price = document.getElementById('prodPrice');
    const submit = document.getElementById('submitbtn');

    price.addEventListener('input', () => {
        const incval = document.getElementById('prcdiv').querySelector('#incorrectval');
        if(!isNaN(Number(price.value)) || price.value == "") {
            if(incval){
                incval.remove();
                updateStyles(false, price)
            }
        }
        else if(!incval){
            document.getElementById('prcdiv').appendChild(createErrorMessage())
            updateStyles(true, price)
        }
    });

    quantity.addEventListener('input', () => {
        const incval = document.getElementById('qtydiv').querySelector('#incorrectval');
        if(!isNaN(Number(quantity.value)) || quantity.value == "") {
            if(incval){
                incval.remove();
                updateStyles(false, quantity)
            }
        }
        else {
            submit.disabled = true;
            if(!incval){
                document.getElementById('qtydiv').appendChild(createErrorMessage())
                updateStyles(true, quantity)
            }
        }
    });

    function createErrorMessage() {
        const newDiv = document.createElement('div');
        newDiv.id = 'incorrectval';
        newDiv.style.width = '100%';
        newDiv.style.color = '#ff0010';
        newDiv.style.fontSize = '15px';
        newDiv.innerHTML = 'Incorrect Input!!';
        return newDiv;
    }
    
    function updateStyles(isInvalid, inp) {
        submit.disabled = isInvalid;
        if(isInvalid) submit.setAttribute('style', 'background-color: #9A1B1A;')
        else submit.removeAttribute('style')
        inp.style.border = isInvalid ? '1px solid #ff0010' : 'none';
    }
})