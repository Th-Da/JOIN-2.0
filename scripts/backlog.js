function openBacklogCardDetails() {
    document.getElementById('card-details-container').classList.remove('d-none');
    setTimeout(() => {
     document.getElementById('card-details-container').classList.remove('fade-out')   
    }, 50);
}

function closeBacklogCardDetails() {
    document.getElementById('card-details-container').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('card-details-container').classList.add('d-none')   
       }, 500);

}

function stopPropagation(event) {
    event.stopPropagation();
}