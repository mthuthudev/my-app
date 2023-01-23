import {useState, useEffect} from 'react'
import noteService from './services/notes'
import './index.css'

function Notification({message}){
  if(message === null) return null
  return(
    <div className='error'>
      {message}
    </div>
  )
}

function Note({note, toggleImportance}){
  const label = note.important ? 'make not important' : 'make important'
  return (<li className='note'>
    {note.content}
    <button onClick={toggleImportance}>{label}</button>
  </li>)
}

function Footer(){
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return(
    <div style={footerStyle}>
      <br />
      <em>Note app, @2K Tech - 2023</em>
    </div>
  )
}

export default function Notes(){
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
      setNotes(response.data)
    })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  
  function addNote(event){
    event.preventDefault()
    if(newNote === ''){
      return
    }
    const noteObj = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObj)
      .then(response => {
        setNotes(notes.concat(noteObj))
        setNewNote('')
      })
  }

  function handleNoteChange(event){
    setNewNote(event.target.value)
  }

  function toggleImportanceOf(id){
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
    .update(id, changedNote)
    .then(response =>{
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(n => 
          <Note key={n.id} note={n} toggleImportance={() => toggleImportanceOf(n.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">Add note</button>
      </form>
      <Footer />
    </div>
  );
}
