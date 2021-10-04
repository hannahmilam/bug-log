<template>
  <div class="card">
    <div class="row">
      <div class="col-1 offset-10" v-if="account.id == bug.creatorId">
        <button class="btn create-button text-black pb-3" data-bs-toggle="modal" data-bs-target="#update-bug">
            <i class="mdi mdi-pencil f-10 selectable"></i>
            </button>
      </div>
    </div>
    <div class="card-header row justify-content-between">
      <div class="col-2" v-if="bug">
        <!-- <img :src="bug.creator.picture" height="64" class="rounded-circle" alt=""> -->
      </div>
      <div class="col-3">
        <small class="text-secondary m-0 p-0">Reported By</small>
         <!-- <p>{{bug.creator.name}}</p> -->
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
         <div class="col-2" v-if="bug.closed === true">
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
      <div class="col-8">
      <p>{{bug.description}}</p>
      </div>
      
      <!-- <div class="col-2">
           <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="closed">
            <label class="form-check-label" for="closed">
            <p v-if="tracked"><i class="mdi mdi-bug"></i> Don't Track Bug</p>
            <p v-else><i class="mdi mdi-bug"></i> Track Bug</p>
            </label>
            </div>
      </div>  -->

      <!-- <div class="col-2" v-if="b in trackedBug" :key="b.id" :trackedBug="b">
        <img :src="trackedBug.creator.picture" height="30px" class="rounded-circle" alt="">
      </div> -->
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
import { computed } from '@vue/runtime-core'
import { Bug } from '../model/Bug'
import { AppState } from '../AppState'
export default {
  
setup(){
return{
  bug: computed(()=> AppState.bug),
  account: computed((()=> AppState.account))
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