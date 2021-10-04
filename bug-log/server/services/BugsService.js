import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import {logger } from '../utils/Logger'

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


  async getUsersbyTrackingBugId(id){
    const users = await dbContext.TrackedBug.find({ bugId: id }).populate('tracker', 'name picture')
    // await dbContext.TrackedBug.find({ trackedBugId: id}).populate('tracker', 'name picture')
    if(!users) {
      throw new BadRequest('Invalid Bug Id')
    }
    return users
  }

  async getTrackedBugsByUser(userId) {
    const trackedBug = await dbContext.TrackedBug.find({accountId: userId}).populate('bug').populate('tracker', 'picture name')
    return trackedBug
  }
  
  async getMyTrackedBugs(accountId) {
    const myTrackedBugs = await dbContext.TrackedBug.find({ accountId: accountId}).sort('-tracked').populate('bug')
    return myTrackedBugs
  }
  async getTrackedBugById(id) {
    const bug = await dbContext.TrackedBug.findById(id).populate('tracker', 'name picture')
    if(!bug) {
      throw new BadRequest('Invalid Bug Id')
    }
    return bug
  }
 
  // STILL WORKING ON THIS ADD TRACKED BUG TO PASS THE FINAL POSTMAN REQUIREMENT...
  async addTrackedBug(userId, bugData) {
    let users = await this.getUsersbyTrackingBugId(bugData.bugId)
    if (users.filter(u => u.accountId === userId).length > 0) {
      throw new BadRequest("Unable To Track Bug Twice")
    }
    const trackedBug = await dbContext.TrackedBug.create(bugData)
    await trackedBug.populate('tracker', 'name picture')
    await trackedBug.populate('bug')
    return trackedBug
  }
  async deleteTrackedBug(id, userId) {
      const bug = await this.getTrackedBugById(id)
      if(userId !== bug.accountId.toString()) {
        throw new Forbidden('Not Authorized')
      }
      await bug.remove()
      return bug
    }

    async getNotesByBugId(bugId) {
      const notes = await dbContext.Note.find({ bugId: bugId }).populate('creator', 'name picture')
      return notes
    }
  }
export const bugsService = new BugsService()