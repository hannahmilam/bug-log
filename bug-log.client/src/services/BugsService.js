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
  }
  async closeBug(bugId){
    const res = await api.delete(`api/bugs/${bugId}`)
    AppState.bugs = AppState.bugs.filter(b => b.id !== bugId)
  }

  async editBug(bug) {
    const res = await api.put(`api/bugs/${bug.id}`, bug)
    AppState.bugs = new Bug(res.data)
  }

  async getTrackedBugsByBugId(bugId){
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`)
    AppState.trackedBugs = res.data
  }

  async trackBug(trackedBug){
    const res = await api.post('api/trackedbugs', trackedBug)
    AppState.trackedBugs.push(res.data)
  }

  async getTrackedBugByAccount(){
    const res = await api.get('account/trackedbugs')
    AppState.trackBugs = res.data
  }
  async deleteTrackedBug(trackedBugId){
    const res = await api.delete(`api/trackedbugs/${trackedBugId}`)
    AppState.trackedBugs = AppState.trackedBugs.filter(b => b.id !== trackedBugId)
  }
}
export const bugsService = new BugsService()