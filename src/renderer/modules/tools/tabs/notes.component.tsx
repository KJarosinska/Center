import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Notes, { Note } from "Renderer/modules/tools/tabs/notes-ui.component"
import { Dispatch } from "Renderer/store"
import { NoteCallback } from "Renderer/models/notes/notes"

const mapStateToProps = (state: RootModel) => {
  return state.notes
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newNote: (note: NoteCallback) => dispatch.notes.createNewNote(note),
  saveNote: (note: Note) => dispatch.notes.saveNote(note),
})

export default connect(mapStateToProps, mapDispatchToProps as Dispatch)(Notes)
