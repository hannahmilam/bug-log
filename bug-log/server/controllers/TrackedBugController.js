import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
import BaseController from "../utils/BaseController";

export class TrackedBugController extends BaseController{
  constructor(){
    super('api/trackedbugs')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.addTrackedBug)
    .delete('/:id', this.deleteTrackedBug)
  }
  async addTrackedBug(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const trackedBug = await bugsService.addTrackedBug(req.body)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }
  async deleteTrackedBug(req, res, next) {
    try {
      const bug = await bugsService.deleteTrackedBug(req.params.id, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}