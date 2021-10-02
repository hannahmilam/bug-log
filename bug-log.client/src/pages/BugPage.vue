<template>
  <div class="container-fluid">
    <div class="row my-4 justify-content-center">
      <div class="col-10">
        <BugDetails />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'

export default {
setup(){
  const route = useRoute()
  onMounted(() => {
      try {
       bugsService.getBugById(route.params.id)
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

