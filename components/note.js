
const editNoteText = (note) => {
    // performs actions for editing note
    const noteTextNode = note.children[0].children[0]; 
    const noteInputNode = note.children[0].children[1];
    const text = noteTextNode.innerText;
    noteTextNode.style.display = 'none';
    noteInputNode.style.display = '';
    noteInputNode.value = text;
    noteInputNode.onkeypress = (event) => {
        event.cancelBubble = true;
        if (event.keyCode == 13) {
            const inputText = event.target.value;
            noteInputNode.value = '';
            noteInputNode.style.display = 'none';
            noteTextNode.innerText = inputText;
            noteTextNode.style.display = ''
        }
    }
}

const addNewNote = () => {
    // Creates a new node
    const note = document.createElement('DIV');
    note.className = 'note';
    const noteBody =  document.createElement('DIV');
    noteBody.className = 'note-body';
    const para = document.createElement('P');
    para.innerText = 'type your note here'
    const inpt = document.createElement('INPUT');
    inpt.style.display = 'none';
    const innerDiv = document.createElement('DIV');
    innerDiv.className = 'note-buttons';

    const spnEdit = document.createElement('SPAN');
    spnEdit.innerText = 'Edit';
    spnEdit.onclick = () => editNoteText(note);
    const spnAdd = document.createElement('SPAN');
    spnAdd.innerText = 'New Note';
    spnAdd.onclick = () => addSubNote(note);

    innerDiv.appendChild(spnEdit);
    innerDiv.appendChild(spnAdd);
    noteBody.appendChild(para);
    noteBody.appendChild(inpt);
    noteBody.appendChild(innerDiv);
    note.appendChild(noteBody);

    return note;
}

const addSubNote = (rootNote) => {
    // takes a root note, create a new note and append the note to it.
    // append the sub note to parent note
    const newNote = addNewNote();
    rootNote.append(newNote);
    //saveToLocalStorage();
}

const searchNote = (str) => {
    // goes from root note to all child note and searches for text, returns matched notes
    const matchedNotes = Array.from(document.querySelectorAll('.note-body > p')).filter((note) => note.innerText.toLowerCase().includes(str.toLowerCase()))
    return matchedNotes.length < 1 ? [] : matchedNotes.map((notePara) => notePara.parentNode.cloneNode(true));
}


