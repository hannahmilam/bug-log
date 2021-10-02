import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { bugsService } from "./BugsService";

class NotesService{

  async getNoteById(noteId){
    const note = await dbContext.Note.findById(noteId).populate('creator', 'name picture')
    if(!note) {
      throw new BadRequest('Invalid Note Id')
    }
    return note
  }
  async createNote(body) {
    await bugsService.getBugById(body.bugId)
    const note = await dbContext.Note.create(body)
    await note.populate('creator', 'name picture')
    return note
  }
    async deleteNote(id, userId) {
    const note = await this.getNoteById(id)
    if(userId !== note.creatorId.toString()) {
      throw new Forbidden('Not Authorized')
    }
    await note.remove()
    return note
  }

}
export const notesService = new NotesService()