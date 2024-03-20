function clearForm(idarr){
    idarr.forEach(element => {
        document.getElementById(element).value = '';
    });
}