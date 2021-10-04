<template>
  <div class="card">
    <div class="row" v-if="account.id == bug.creatorId">
      <div class="col-1 offset-8">
        <button class="btn create-button text-black pb-3" data-bs-toggle="modal" data-bs-target="#update-bug" v-if="bug.closed === false">
            <i class="mdi mdi-pencil f-10 selectable" title="edit bug"></i>
            </button>
            </div>
           
             <div class="col-2 mt-2" >
              <div class="form-check form-switch" v-if="bug.closed === true">
            <input class="form-check-input" type="checkbox" id="closed">
            <label class="form-check-label" for="closed">
              <p>Closed</p>
            </label>
            </div>

             <div class="form-check form-switch" v-else>
            <input class="form-check-input" type="checkbox" id="closed" @click="closeBug(bug.id)">
            <label class="form-check-label" for="closed">
              <p>Open</p>
            </label>
            </div>
           </div>

    </div>
    <div class="card-header row justify-content-between">
      <div class="col-2" v-if="bug">
        <img :src="bug.creator?.picture" height="64" class="rounded-circle" alt="">
      </div>
      <div class="col-3">
        <small class="text-secondary m-0 p-0">Reported By</small>
         <p>{{bug.creator?.name}}</p>
      </div>
      <div class="col-2">
         <small class="text-secondary m-0 p-0">Priority</small>
        <p>{{bug.priority}}</p>
      </div>
      <div class="col-2">
        <small class="text-secondary m-0 p-0">Last Updated</small>
        <p>{{new Date(bug.updatedAt).toLocaleDateString()}}</p>
      </div>
      <div class="col-3">
         <div class="col-3" v-if="bug.closed === true">
           <small class="text-secondary m-0 p-0">Status</small>
           <p>Closed <i class="mdi mdi-radiobox-marked f-20 text-green"></i></p>
          </div>
          <div class="col-3" v-else>
            <small class="text-secondary m-0 p-0">Status</small>
           <p>Open <i class="mdi mdi-radiobox-blank f-20 text-red"></i></p>
            </div>
      </div>
    </div>

    <div class="card-body row">
      <h3>{{bug.title}}</h3>
    </div>

    <div class="card-footer row">
      <div class="col-6">
      <p>{{bug.description}}</p>
      </div>
      
      <div class="col-3">
           <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="closed" @click="trackBug">
            <label class="form-check-label" for="closed">
            <p v-if="trackedBug.tracked"><i class="mdi mdi-bug"></i> Don't Track Bug</p>
            <p v-else><i class="mdi mdi-bug"></i> Track Bug</p>
            </label>
            </div>
      </div> 

      <!-- NOT WORKING... NEED TO FIXME -->
       <!-- <div class="col-3">
        <img :src="trackedBug.tracker?.picture" height="30px" class="rounded-circle" alt="">
        <p>{{trackedBug.tracker?.name}}</p>
      </div>-->
    </div>
  </div> 

  <Modal id="update-bug">
    <template #modal-title>
      Edit Bug Information
    </template>
    <template #modal-body>
      <BugForm :bug="bug" />
    </template>
  </Modal>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { Bug } from '../model/Bug'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
export default {
  setup(){
    const route = useRoute()
return{
  trackedBug: computed(()=> AppState.trackedBugs),
  bugs: computed(()=> AppState.bugs),
  bug: computed(()=> AppState.bug),
  account: computed((()=> AppState.account)),
  async trackBug(){
    await bugsService.trackBug(route.params.id)
  },
  async deleteTrackedBug(){
    await bugsService.deleteTrackedBug(route.params.id)
  },
  async closeBug(bugId){
      await bugsService.closeBug(bugId)
  }
}
}
}
</script>

<style>
.text-red{
  color: red;
}
.text-green{
  color: green;
}
</style>