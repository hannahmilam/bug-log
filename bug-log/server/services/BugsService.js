import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class BugsService{

  async getBugs(query) {
    const bugs = await dbContext.Bug.find(query).sort('-updatedAt').populate('creator', 'name picture')
    return bugs
  }
  async getBugById(id) {
    const bug = await dbContext.Bug.findById(id).populate('creator', 'name picture')
    if(!bug) {
      throw new BadRequest('Invalid Bug Id')
    }
    return bug
  }
  async createNewBug(body) {
    const bug = await dbContext.Bug.create(body)
    await bug .populate('creator', 'name picture')
    return bug 
  }
  async editBug(bugId, userId, bugData) {
    const bug = await this.getBugById(bugId)
    if(userId !== bug.creatorId.toString()) {
      throw new Forbidden('Not Authorized')
    }
    if(bug.closed === true){
      throw new BadRequest('Already Closed')
    } 
    bug.title  = bugData.title || bug.title
    bug.description = bugData.description || bug.description
    bug.priority = bugData.priority || bug.priority 
    bug.closedDate = bugData.closedDate || bug.closedDate
    await bug.save()
    return bug
  }

  // TODO ask for help regarding "soft delete"
  async closeBug(id, userId) {
    const bug = await this.getBugById(id) 
    if(userId !== bug.creatorId.toString()) {
      throw new Forbidden('Not Authorized')
    }
    
    await bug.update({closed: true})
    return bug
  }

  async getUsersTrackingBug(accountId){
    const user = await dbContext.TrackedBug.findById(accountId).populate('tracker', 'name picture')
    if(!user) {
      throw new BadRequest('Invalid Bug Id')
    }
    return user
  }
  
  async getMyTrackedBugs(accountId) {
    const myTrackedBugs = await dbContext.TrackedBug.find({accountId: accountId}).sort('-bug').populate('tracker', 'creator name')
    return myTrackedBugs
  }

  async addTrackedBug(bugData) {
    const trackedBug = await dbContext.TrackedBug.create(bugData)
    await trackedBug.populate('tracker', 'name picture')
    await trackedBug.populate('bug')
    return trackedBug
  }
  async deleteTrackedBug(trackedBugId, id) {
      const trackedBug = await this.getBugById(id)
      if(id !== trackedBug.creatorId.toString()) {
        throw new Forbidden('Not Authorized')
      }
      await trackedBug.remove()
      return trackedBug
    }

    async getNotesByBugId(bugId) {
      const notes = await dbContext.Note.find({ bugId: bugId }).populate('creator', 'name picture')
      // const notes = await dbContext.Note.find({ query, bugId }).populate('creator', 'name picture')
      // const notes = await dbContext.Note.findById(bugId).populate('creator', 'name picture')
      return notes
    }
  }
export const bugsService = new BugsService()