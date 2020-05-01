

console.log('Hello chrome! ');
const textNode = document.querySelector('[name=input-note]');
const errorTextNode = document.querySelector('#error-text');
const notesContainerNode = document.querySelector('#notes-container');
const searchContainerNode = document.querySelector('#search-container');

textNode.addEventListener('keypress', function(e){
    if (event.keyCode == 13) addNoteToContainer();
})

function addNoteToContainer(){
    errorTextNode.innerText = '';
    searchContainerNode.style.display = 'none';

    const text = textNode.value;
    if (text && text.length > 0) {
        const note = addNewNote();
        // assign the text to note
        note.children[0].children[0].innerText = text;
        textNode.value = '';
        notesContainerNode.appendChild(note);
        saveToLocalStorage();
    } else {
        const errortext = 'Empty Text not allowed';
        errorTextNode.innerText = errortext;
    }
}

function searchNotes(){
    const searchStr = textNode.value;
    const noteBody = document.querySelector('#notes-container');
    const matched = searchNote(searchStr);
    if (matched.length > 0) {
        // drw a search canvas over top of existing notes!
        Array.from(searchContainerNode.children).forEach((note) => {
            searchContainerNode.removeChild(note);
        })
        matched.forEach((note) => {
            searchContainerNode.appendChild(note);
        })
        searchContainerNode.style.display = 'block';
        noteBody.style.display = 'none';
    } else {
        // drw a big canvas over top stating no match found!
    }
}
function removeSearch() {
    console.log('removed bro!');
    const noteBody = document.querySelector('#notes-container');
        Array.from(searchContainerNode.children).forEach((note) => {
            searchContainerNode.removeChild(note);
        })
    searchContainerNode.style.display = 'none';
    noteBody.style.display = '';
}

// function saveToLocalStorage(){
//     localStorage.setItem('myNotes',notesContainerNode.innerHTML);
// }

// function retriveSavedNotes(){
//     const notes = localStorage.getItem('myNotes');
//     if(notes && notes.length > 1) {
//         notesContainerNode.innerHTML = notes;
//     }
// }

// retriveSavedNotes();