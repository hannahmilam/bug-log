import { AppState } from "../AppState"
import { Bug } from "../model/Bug"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BugsService{

  async getBugs(){
    const res = await api.get('api/bugs')
    AppState.bugs = res.data.map(b => new Bug(b))
  }
  async getBugById(bugId){
    const res = await api.get(`api/bugs/${bugId}`)
    AppState.bug = new Bug(res.data)
  }
  async reportBug(bug){
    const res = await api.post('api/bugs', bug)
    AppState.bugs.push(new Bug(res.data))
    return res.data.id
  }
  async closeBug(bugId){
    const res = await api.delete(`api/bugs/${bugId}`)
    logger.log('closed res', res)
    AppState.bug = new Bug(res.data)
    
  }

  async editBug(bug) {
    if(AppState.bugs.closed === false){
      const res = await api.put(`api/bugs/${bug.id}`, bug)
      AppState.bugs = new Bug(res.data)
    } else {
      throw new Error('You cannot edit bug if it is closed')
    }
  }

  async getTrackedBugsByBugId(bugId){
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`)
    AppState.trackedBugs = res.data
  }

  async trackBug(bugId){
    const trackedBug = {}
    trackedBug.bugId = bugId
    const res = await api.post('api/trackedbugs', trackedBug)
    AppState.trackedBugs.push(res.data)
  }

  async deleteTrackedBug(bugId) {
  const trackedBug = {}
  trackedBug.bugId = bugId
  const res = await api.delete('api/trackedbugs/:trackedBugId', trackedBug)
  AppState.trackedBugs = AppState.trackedBugs.filter(b => b.id !== bugId)
  }

  async getTrackedBugByAccount(query = ''){
    logger.log('tracked bugs', AppState.trackedBugs)
    const res = await api.get('account/trackedbugs' + query)
    AppState.trackedBugs = res.data
  }
  async deleteTrackedBug(trackedBugId){
    const res = await api.delete(`api/trackedbugs/${trackedBugId}`)
    AppState.trackedBugs = AppState.trackedBugs.filter(b => b.id !== trackedBugId)
  }
}
export const bugsService = new BugsService()