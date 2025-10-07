const notescontainer = document.querySelector(".notescontainer");
const createbtn = document.querySelector(".btn");

// Load notes from localStorage safely
function shownotes() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes && storedNotes !== "null") {
        notescontainer.innerHTML = storedNotes;
    } else {
        notescontainer.innerHTML = "";
    }

    // Attach keyup event to existing notes
    document.querySelectorAll(".input-box").forEach(note => {
        note.onkeyup = () => updatestorage();
    });
}
shownotes();

// Update localStorage
function updatestorage() {
    localStorage.setItem("notes", notescontainer.innerHTML);
}

// Create a new note
createbtn.addEventListener("click", () => {
    let inputbox = document.createElement("p");
    let img = document.createElement("img");
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable", "true");
    img.src = "trash.png";

    // Append image first, then add to container
    inputbox.appendChild(img);
    notescontainer.appendChild(inputbox);

    // Save when typing in the new note
    inputbox.onkeyup = () => {
        updatestorage();
    };

    // Save immediately after creating
    updatestorage();
});

// Handle clicks on notes container
notescontainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        // Delete note
        e.target.parentElement.remove();
        updatestorage();
    }
});

// Handle Enter key for line breaks
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
