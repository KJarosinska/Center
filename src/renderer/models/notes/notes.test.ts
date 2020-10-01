import { init } from "@rematch/core"
import selectPlugin from "@rematch/select"
import notes from "Renderer/models/notes/notes"
import { Note } from "Renderer/modules/tools/tabs/notes.component"
import { notesSeed, todaysNote } from "App/seeds/notes"

const storeConfig = {
  models: { notes },
  plugins: [selectPlugin()],
  redux: {
    initialState: {
      notes: notesSeed,
    },
  },
}

let store = init(storeConfig)

beforeEach(() => {
  store = init(storeConfig)
})

const testContent = "test-content"
const testDate = new Date("2020-07-21T13:08:02.733Z")

test("properly fires callback", () => {
  const mockCb = jest.fn()
  store.dispatch.notes.createNewNote(mockCb)
  expect(mockCb).toBeCalled()
})

test("properly saves new note", () => {
  const currentNewestNote = store.getState().notes.notesList[0]
  const currentNotesCount = store.getState().notes.notesList.length
  store.dispatch.notes.createNewNote()
  expect(store.getState().notes.notesList[0]).not.toMatchObject(
    currentNewestNote
  )
  expect(store.getState().notes.notesList.length).toBe(currentNotesCount + 1)
})

test("properly saves modified note", () => {
  const noteId = store.getState().notes.notesList[0].id
  const findById = ({ id }: Note) => id === noteId
  expect(store.getState().notes.notesList.find(findById)!.content).not.toBe(
    testContent
  )
  store.dispatch.notes.saveNote({
    id: noteId,
    content: testContent,
    date: testDate,
  })
  expect(store.getState().notes.notesList.find(findById)!.content).toBe(
    testContent
  )
})

test("properly removes notes", () => {
  const noteId = store.getState().notes.notesList[0].id
  expect(
    store.getState().notes.notesList.find(({ id }) => id === noteId)
  ).toBeDefined()

  store.dispatch.notes.removeNotes([noteId])

  expect(
    store.getState().notes.notesList.find(({ id }) => id === noteId)
  ).toBeUndefined()
})

test("properly removed multiple notes", () => {
  const ids = store
    .getState()
    .notes.notesList.slice(0, 3)
    .map(({ id }) => id)

  expect(store.getState().notes.notesList.length).toBe(
    notesSeed.notesList.length
  )

  store.dispatch.notes.removeNotes(ids)

  expect(store.getState().notes.notesList.length).toBe(
    notesSeed.notesList.length - ids.length
  )
})

test("today's note is at the beginning of the list by default, after toggle is placed at the last place in the list", () => {
  const state = store.getState()
  const notesList = store.select.notes.sortedList(state)
  expect(state.notes.sortDescending).toBeTruthy()
  expect(todaysNote).toMatchObject(notesList[0])

  store.dispatch.notes.toggleSortOrder()

  const stateAfterToggle = store.getState()
  const notesListAfterToggle = store.select.notes.sortedList(stateAfterToggle)
  expect(stateAfterToggle.notes.sortDescending).toBeFalsy()
  expect(todaysNote).toMatchObject(
    notesListAfterToggle[notesListAfterToggle.length - 1]
  )
})
