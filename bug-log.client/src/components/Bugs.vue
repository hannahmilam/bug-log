<template>
      <router-link :to="{ name: 'BugDetail', params: {id: bug.id} }" class=" text-black selectable">
       <div class="row card-body mt-2 justify-content-between bg-priority" v-if="bug.priority === 5">
          <div class="col-md-2">
            <h5> {{bug.title}} </h5>
          </div>
          <div class="col-md-2">
            <h5> {{bug.priority}} </h5>
          </div>
          <div class="col-md-2">
             <h5 class="clip-text"> {{bug.creator.name}} </h5>
          </div>
          <div class="col-md-2">
            <h5> {{new Date(bug.updatedAt).toLocaleDateString()}}</h5>
          </div>
          <div class="col-md-2" v-if="bug.closed === true">
            <i class="mdi mdi-radiobox-marked f-20 text-red"><span class="text-black"> Closed</span></i>
          </div>
          <div class="col-md-2" v-else>
            <i class="mdi mdi-radiobox-blank f-20 text-green"><span class="text-black"> Open</span></i>
            </div>
          </div>

          <div class="row card-body mt-2 justify-content-between" v-else>
          <div class="col-md-2">
            <h5> {{bug.title}} </h5>
          </div>
          <div class="col-md-2">
            <h5> {{bug.priority}} </h5>
          </div>
          <div class="col-md-2">
             <h5 class="clip-text"> {{bug.creator.name}} </h5>
          </div>
          <div class="col-md-2">
            <h5> {{new Date(bug.updatedAt).toLocaleDateString()}}</h5>
          </div>
          <div class="col-md-2" v-if="bug.closed === true">
            <i class="mdi mdi-radiobox-marked f-20 text-red"><span class="text-black"> Closed</span></i>
          </div>
          <div class="col-md-2" v-else>
            <i class="mdi mdi-radiobox-blank f-20 text-green"><span class="text-black"> Open</span></i>
            </div>
          </div>
          </router-link>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Bug } from '../model/Bug'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
export default {
  props: {
    bug: {type: Bug, required: true}
  },
setup(props){
return{
  account: computed(()=> AppState.account),
}
}

}
</script>

<style scoped lang='scss'>
.text-red{
  color: red;
}
.text-green{
  color: green;
}
.card-body{
  box-shadow: 0 4px 2px -2px rgba(128, 128, 128, 0.438);
}
.bg-priority{
  background: rgba(255, 0, 0, 0.384);
}
</style>