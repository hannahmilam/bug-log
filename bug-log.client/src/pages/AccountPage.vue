<template>
<div class="container-fluid" v-if="account">
   <div class="row justify-content-center mt-4">
     <div class="col-10">
       <div class="card p-3">
         <div class="card-header row mt-2 justify-content-between">
          <div class="col-2">
            <h4> Title </h4>
          </div>

          <div class="col-2">
            <h4> Priority </h4>
          </div>

          <div class="col-2">
            <h4> Updated</h4>
          </div>

          <div class="col-2">
            <h4>Status</h4>
          </div>
        </div>
        
          <TrackedBugs v-for="b in trackedBugs" :key="b.id" :bug="b.bug" />

       </div>
     </div>
   </div>
 </div> 
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'

export default {
setup(){

  onMounted( async () => {
     await bugsService.getTrackedBugByAccount()
    })
    
  return{
    account: computed(()=> AppState.account),
    trackedBugs: computed(()=> AppState.trackedBugs),
    bugs: computed(() => AppState.bugs),
      }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.card{
  background-color: rgba(39, 38, 48, 0.5);
  color: white;
  box-shadow: 0px 0px 6px #e0dfd7c4;
  backdrop-filter: blur(4px);
}

.btn-purple{
        background: linear-gradient(180deg, #e347ff, #7b41e0);
        filter: drop-shadow(0 15px 15px #00a1ff57);
        color: white;
}
</style>
