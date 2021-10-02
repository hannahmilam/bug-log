<template>
 <div class="container-fluid">
   <div class="row my-3">
     <div class="col-2 offset-10">
      <button class="btn btn-purple">
        Report Bug
        </button>
     </div>
   </div>
   <div class="row justify-content-center mt-4">
     <div class="col-10">
       <div class="card p-3">
         <div class="card-header row ms-5 mt-2 justify-content-between">
          <div class="col-2">
            <h4> Title </h4>
          </div>
          <div class="col-2">
            <h4> Priority </h4>
          </div>
          <div class="col-2">
             <h4> Reported By </h4>
          </div>
          <div class="col-2">
            <h4> Last Updated </h4>
          </div>
          <div class="col-2">
            <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="closed" checked>
            <label class="form-check-label" for="closed"> All Bugs
              <!-- <span v-if="checked">Open Only</span>
              <span v-else>All Bugs</span> -->
            </label>
            </div>
          </div>
        </div>

        
          <Bugs v-for="b in bugs" :key="b.id" :bug="b" />

       </div>
     </div>
   </div>
 </div> 
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'

export default {
setup(){
  onMounted(() => {
      try {
       bugsService.getBugs()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
  return{
    bugs: computed(()=> AppState.bugs)
  }
}
}
</script>

<style scoped lang="scss">

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
