import { AppState } from "../AppState"
import { api } from "./AxiosService"
import {Note} from '../model/Note'
import { logger } from "../utils/Logger"

class NotesService{
async createNote(note){
const res = await api.post('api/notes', note)
AppState.notes.unshift(new Note(res.data))
logger.log('create a note', note)
}

async getNotes(bugId) {
  const res = await api.get(`api/bugs/${bugId}/notes`)
  AppState.notes = res.data.map(n => new Note(n))
  logger.log('get notes', AppState.notes)
}
async deleteNote(noteId) {
  const res = await api.delete(`api/notes/${noteId}`)
  AppState.notes = AppState.notes.filter(n => n.id !== noteId)
}
}

export const notesService = new NotesService()