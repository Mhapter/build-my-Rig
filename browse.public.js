document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('search')) {
        while(document.getElementById('prodName')) {
            let search = document.getElementById('prodName').innerHTML;
            let text = document.getElementById('searchQ').value;
            console.log(text);
            //const newSpan = document.createElement('span');
            search.replace(text, '<span style="color: red; background-color: yellow;">' + text + '</span>')
            //console.log(newSpan); '<span style="color: red; background-color: yellow;">' + search[i] + '</span>'
            console.log(search);
            document.getElementById('prodName').innerHTML = search;
            document.getElementById('prodName').id = 'done';
        }
    }
})