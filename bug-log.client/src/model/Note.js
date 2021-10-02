export class Note {
  constructor(noteData){
    this.body = noteData.body
    this.creator = noteData.creator
    this.creatorId = noteData.creatorId
    this.bug = noteData.bug
    this.bugId = noteData.bugId
  }
}