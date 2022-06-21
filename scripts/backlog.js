// Fades objekts in with removing d-none and adds opacity transition
function openBacklogCardDetails() {
    document.getElementById('card-details-container').classList.remove('d-none');
    setTimeout(() => {
     document.getElementById('card-details-container').classList.remove('fade-out')   
    }, 50);
}

// Fades objekts out with opacity transition and adding d-none
function closeBacklogCardDetails() {
    document.getElementById('card-details-container').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('card-details-container').classList.add('d-none')   
       }, 500);

}