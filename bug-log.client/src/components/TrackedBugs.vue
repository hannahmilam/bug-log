<template>
    <div class="container-fluid" v-if="bug">
      <router-link :to="{ name: 'BugDetail', params: {id: bug.id} }" class="text-white selectable">
       <div class="row card-body mt-2 justify-content-between bg-primary" v-if="bug.priority === 5">
          <div class="col-md-2">
            <h5> {{bug.title}} </h5>
          </div>
          <div class="col-md-2">
            <h5> {{bug.priority}} </h5>
          </div>
      
          <div class="col-md-2">
            <h5> {{new Date(bug.updatedAt).toLocaleDateString()}}</h5>
          </div>
          <div class="col-md-2" v-if="bug.closed === true">
            <i class="mdi mdi-radiobox-marked f-20 text-green"></i>
          </div>
          <div class="col-md-2" v-else>
            <i class="mdi mdi-radiobox-blank f-20 text-red"></i>
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
            <h5> {{new Date(bug.updatedAt).toLocaleDateString()}}</h5>
          </div>
          <div class="col-md-2" v-if="bug.closed === true">
            <i class="mdi mdi-radiobox-marked f-20 text-red"> closed</i>
          </div>
          <div class="col-md-2" v-else>
            <i class="mdi mdi-radiobox-blank f-20 text-green"> Open </i>
            </div>
          </div>
      </router-link>
      </div>

</template>

<script>
import { computed } from '@vue/runtime-core'
import { Bug } from '../model/Bug'
import { AppState } from '../AppState'
export default {
  props: {
    bug: {type: Bug, required: true}
  },
setup(){
return{
  account: computed(()=> AppState.account),
  trackedBugs: computed(()=> AppState.trackedBugs)
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