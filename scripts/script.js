async function init() {
    await includeHTML();
    
}

// stops event propagation
function stopPropagation(event) {
    event.stopPropagation();
}

// Fades objekts in with removing d-none and adds opacity transition
function openCardDetails() {
    document.getElementById('card-details-container').classList.remove('d-none');
    setTimeout(() => {
     document.getElementById('card-details-container').classList.remove('fade-out')   
    }, 50);
}

// Fades objekts out with opacity transition and adding d-none
function closeCardDetails() {
    document.getElementById('card-details-container').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('card-details-container').classList.add('d-none')   
       }, 500);

}