export class TrackedBug {
  constructor (bugData = {}){
    this.id = bugData.id
    this.tracker = bugData.tracker
    this.accountId = bugData.accountId
    this.bug = bugData.bug
    // this.tracked = bugData.tracked || false
  }
}