<template>
  <div class="container-fluid" v-if="bug">
    <router-link :to="{ name: 'BugDetail', params: {id: bug.id} }" class="text-black selectable">
      <div class="row text-black card-body mt-2 justify-content-between bg-priority" v-if="bug.priority === 5">
        <div class="col-md-2">
          <h5>{{ bug.title }} </h5>
        </div>
        <div class="col-md-2">
          <h5> {{ bug.priority }} </h5>
        </div>

        <div class="col-md-2">
          <h5> {{ new Date(bug.updatedAt).toLocaleDateString() }}</h5>
        </div>
        <div class="col-md-2" v-if="bug.closed === true">
          <i class="mdi mdi-radiobox-marked f-20 text-green"><span class="text-black"> Open</span></i>
        </div>
        <div class="col-md-2" v-else>
          <i class="mdi mdi-radiobox-blank f-20 text-red">
            <span class="text-black"> Closed</span></i>
        </div>
      </div>

      <div class="row text-black card-body mt-2 justify-content-between" v-else>
        <div class="col-md-2">
          <h5> {{ bug.title }} </h5>
        </div>
        <div class="col-md-2">
          <h5> {{ bug.priority }} </h5>
        </div>

        <div class="col-md-2">
          <h5> {{ new Date(bug.updatedAt).toLocaleDateString() }}</h5>
        </div>
        <div class="col-md-2" v-if="bug.closed === true">
          <i class="mdi mdi-radiobox-marked f-20 text-red"> <span class="text-black"> Closed</span></i>
        </div>
        <div class="col-md-2" v-else>
          <i class="mdi mdi-radiobox-blank f-20 text-green"><span class="text-black"> Open</span></i>
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
    bug: { type: Bug, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      trackedBugs: computed(() => AppState.trackedBugs)
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
.bg-priority{
  background: rgba(255, 0, 0, 0.384);
}
</style>
