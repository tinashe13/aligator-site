
const modal = document.getElementById('warningModal');
const closeModal = document.getElementById('closeModal');
const acceptWarning = document.getElementById('acceptWarning');
const floatingButton = document.getElementById('floatingButton');


// Close the modal when the close button is clicked
closeModal.onclick = function () {
    modal.style.display = 'none';
};

// Close the modal when the "I Understand" button is clicked
acceptWarning.onclick = function () {
    modal.style.display = 'none';
};

// Close the modal when clicking outside the modal content
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};




// Show the modal when the floating button is clicked
floatingButton.onclick = function () {
    modal.style.display = 'flex';
};

// Close the modal when the close button is clicked
closeModal.onclick = function () {
    modal.style.display = 'none';
};

// Close the modal when the "I Understand" button is clicked
acceptWarning.onclick = function () {
    modal.style.display = 'none';
};

// Close the modal when clicking outside the modal content
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};


