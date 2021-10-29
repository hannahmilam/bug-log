<template>
  <div class="container-fluid bg-">
    <div class="row my-3">
      <div class="col-md-2 offset-md-10" v-if="account.id">
        <button class="btn btn-purple" data-bs-toggle="modal" data-bs-target="#report-bug-modal">
          Report Bug
        </button>
      </div>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-md-11">
        <div class="card custom-bg p-3">
          <div class="card-header row mt-2 justify-content-between">
            <div class="col-md-2">
              <h4> <b>Title </b></h4>
            </div>

            <div class="col-md-2">
              <h4> <b>Priority </b> </h4>
              <button class="btn selectable me-2" @click="toggleAscending">
                <i class="mdi" :class="ascending ? 'mdi-arrow-up' : 'mdi-arrow-down'"></i>
              </button>
            </div>

            <div class="col-md-2">
              <h4><b> Reported By </b> </h4>
            </div>
            <div class="col-md-2">
              <h4> <b>Last Updated </b></h4>
            </div>

            <div class="col-md-2">
              <h4><b>Status</b></h4>
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
  setup() {
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

    onMounted(() => {
      bugsService.getBugs()
    })

    return {
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
  color: black;
  box-shadow: 0px 0px 6px #d1ecf3c4;
  background: rgba(81, 119, 119, 0.137);
  backdrop-filter: blur(10px);
}

.btn-purple{
        background: linear-gradient(180deg, #e347ff, #7b41e0);
        filter: drop-shadow(0 15px 15px #00a1ff57);
        color: white;
}
</style>
