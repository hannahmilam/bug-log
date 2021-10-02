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
  async deleteBug(bugId){
    const res = await api.delete(`api/bugs/${bugId}`)
    AppState.bugs = AppState.bugs.filter(b => b.id !== bugId)
  }
}
export const bugsService = new BugsService()