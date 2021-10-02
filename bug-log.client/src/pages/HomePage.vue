<template>
 <div class="container-fluid">
   <div class="row my-3">
     <div class="col-2 offset-10">
      <button class="btn btn-purple" data-bs-toggle="modal" data-bs-target="#report-bug-modal">
        Report Bug
        </button>
     </div>
   </div>
   <div class="row justify-content-center mt-4">
     <div class="col-10">
       <div class="card p-3">
         <div class="card-header row mt-2 justify-content-between">
          <div class="col-2">
            <h4> Title </h4>
          </div>

          <div class="col-2">
            <h4> Priority </h4>
            <button class="btn selectable me-2 text-white" @click="toggleAscending">
            <i class="mdi" :class="ascending ? 'mdi-arrow-up' : 'mdi-arrow-down'"></i>
            </button> 
          </div>

          <div class="col-2">
             <h4> Reported By </h4>
          </div>
          <div class="col-2">
            <h4> Last Updated </h4>
          </div>

          <div class="col-2">
            <h4>Status</h4>
            <div class="form-check form-switch" @click="closedFilter = !closedFilter">
            <input class="form-check-input" type="checkbox" id="closed">
            <label class="form-check-label" for="closed">
            <p v-if="closedFilter">Open Only</p>
            <p v-else>All Bugs</p>
            </label>
            </div>
          </div>
        </div>

        
          <Bugs v-for="b in bugs" :key="b.id" :bug="b" />

       </div>
     </div>
   </div>

<Modal id="report-bug-modal">
   <template #modal-title>
       Report Bug
      </template>
      <template #modal-body>
        <BugForm />
      </template>
</Modal>
 </div> 
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'

export default {
setup(){
  const ascending = ref(true)
  const closedFilter = ref(false)

  function closedFilterFunction(bug) {
      if (closedFilter.value) {
        return bug.closed === false
      }
      return true
    }
    function prioritySorter(a, b) {
      if (ascending.value) {
        return b.priority - a.priority
      }
      return a.priority - b.priority
    }

  onMounted( () => {
     bugsService.getBugs()
    })
    
  return{
    account: computed(() => AppState.account),
    ascending,
    closedFilter,
    bugs: computed(() => AppState.bugs.filter(closedFilterFunction).sort(prioritySorter)),
      toggleAscending() {
      ascending.value = !ascending.value
      }
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
