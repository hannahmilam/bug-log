<template>
      <router-link :to="{ name: 'BugDetail', params: {id: bug.id} }" class="text-white selectable">
       <div class="row card-body ms-5 mt-2 justify-content-between">
          <div class="col-2">
            <h5> {{bug.title}} </h5>
          </div>
          <div class="col-2">
            <h5> {{bug.priority}} </h5>
          </div>
          <div class="col-2">
             <h5 class="clip-text"> {{bug.creator.name}} </h5>
          </div>
          <div class="col-2">
            <h5> {{new Date(bug.updatedAt).toLocaleDateString()}}</h5>
          </div>
          <div class="col-2" v-if="bug.closed === true">
            <i class="mdi mdi-radiobox-marked f-20 text-green"></i>
          </div>
          <div class="col-2" v-else>
            <i class="mdi mdi-radiobox-blank f-20 text-red"></i>
            </div>
          </div>
          </router-link>
</template>

<script>
import { Bug } from '../model/Bug'
export default {
  props: {
    bug: {type: Bug, required: true}
  },
setup(props){

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