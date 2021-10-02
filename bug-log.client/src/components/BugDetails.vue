<template>
  <div class="card">
    <div class="card-header row justify-content-between">
      <div class="col-2">
       <img :src="bug.creator.picture" height="64" class="rounded-circle" alt="">
      </div>
      <div class="col-3">
        <small class="text-secondary m-0 p-0">Reported By</small>
         <p>{{bug.title}}</p>
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
           <p> <i class="mdi mdi-radiobox-marked f-20 text-green"></i></p>
          </div>
          <div class="col-3" v-else>
            <small class="text-secondary m-0 p-0">Status</small>
           <p> <i class="mdi mdi-radiobox-blank f-20 text-red"></i></p>
            </div>
      </div>
    </div>

    <div class="card-body">
      <p>{{bug.description}}</p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Bug } from '../model/Bug'
import { AppState } from '../AppState'
export default {
  
setup(){
return{
  bug: computed(()=> AppState.bug)
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