import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/trackedbugs', this.getMyTrackedBugs)
  }
  
  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getMyTrackedBugs(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const trackedBugs = await bugsService.getMyTrackedBugs(req.userInfo.id)
      res.send(trackedBugs)
    } catch (error) {
      next(error)
    }
  }
}
