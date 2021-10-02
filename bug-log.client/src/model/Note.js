export class Note {
  constructor(noteData){
    this.body = noteData.body
    this.creator = noteData.creator
    this.creatorId = noteData.creatorId
    this.bugId = noteData.bugId
    this.id = noteData.id
  }
}