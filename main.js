const notesContainer=document.getElementById("app");
const addNoteButton = document.querySelector(".add-note");
//use query selector mthod so that first instance or first propert of the button is only targeted



getNotes().forEach(note=>{
    const noteElement=createNoteElement(note.id,note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
})

function getNotes(){

    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}


function saveNotes(notes){
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes))
}
addNoteButton.addEventListener("click",()=> addNotes());


function createNoteElement(id,content){

    const element=document.createElement("textarea");
    element.classList.add("note");
    element.value=content;
    element.placeholder="Empty Sticky Note";

    element.addEventListener("change",()=>{
        updateNote(id,element.value);
    })

    element.addEventListener("dblclick",()=>{
        const doDelete=confirm("are you sure you want to delete this sticky note?")

        if(doDelete){
            deleteNote(id,element)
        }
    });


    return element;
}


function addNotes(){

    const notes=getNotes();
    const noteObject={
        id: Math.floor(Math.random()*10000),
        content:" "
    };
    const noteElement=createNoteElement(noteObject.id,noteObject.content);
    notesContainer.insertBefore(noteElement,addNoteButton);
     
    notes.push(noteObject);
    saveNotes(notes);
}


function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];
  
    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
  
    saveNotes(notes);
    notesContainer.removeChild(element);
  } 