import BaseController from "../utils/BaseController";
import { Auth0Provider } from '@bcwdev/auth0provider';
import { bugsService } from "../services/BugsService";
export class BugController extends BaseController{
  constructor(){
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:id', this.getBugById)
      .get('/:id/notes', this.getBugNotes)
      .get('/:bugId/trackedbugs', this.getUsersTrackingBug)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNewBug)
      .put('/:id', this.editBug)
      .delete('/:id', this.closeBug)


        }
        async getBugs(req, res, next) {
          try {
            const bugs = await bugsService.getBugs(req.query)
            res.send(bugs)
          } catch (error) {
            next(error)
          }
        }
        async getBugById(req, res, next) {
          try {
            const bug = await bugsService.getBugById(req.params.id)
            res.send(bug)
          } catch (error) {
            next(error)
          }
        }
        async createNewBug(req, res, next) {
          try {
            req.body.creatorId = req.userInfo.id
            const bug =  await bugsService.createNewBug(req.body)
            res.send(bug)
          } catch (error) {
            next(error)
          }
        }
        async editBug(req, res, next) {
          try {
            const bug = await bugsService.editBug(req.params.id, req.userInfo.id, req.body)
            res.send(bug)
          } catch (error) {
           next(error) 
          }
        }
        async closeBug(req, res, next) {
          try {
            const bug = await bugsService.closeBug(req.params.id, req.userInfo.id)
            res.send(bug)
          } catch (error) {
            next(error)
          }
        }
        async getBugNotes(req, res, next) {
          try {
            const bugNotes = await bugsService.getNotesByBugId(req.params.id)
            // const bugNotes = await bugsService.getNotesByBugId(req.query, req.params.id)
            res.send(bugNotes)
          } catch (error) {
            next(error)
          }
         }
         async getUsersTrackingBug(req, res, next) {
          try {
            const users = await bugsService.getUsersTrackingBug(req.params.bugId)
          } catch (error) {
            next(error)
          }
        }
      }