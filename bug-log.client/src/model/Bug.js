export class Bug {
  constructor (bugData = {}){
    this.id = bugData.id
    this.closed = bugData.closed
    this.title = bugData.title
    this.description = bugData.description
    this.priority = bugData.priority
    this.updatedAt = bugData.updatedAt
    this.creator = bugData.creator
    this.creatorId = bugData.creatorId
  }
}