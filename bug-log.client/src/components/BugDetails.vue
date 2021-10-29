<template>
  <div class="card">
    <div class="row" v-if="account.id == bug.creatorId">
      <div class="col-md-1 offset-8">
        <button class="btn create-button text-black pb-3" data-bs-toggle="modal" data-bs-target="#update-bug" v-if="bug.closed === false">
          <i class="mdi mdi-pencil f-10 selectable" title="edit bug"></i>
        </button>
      </div>

      <div class="col-md-2 mt-2">
        <div class="form-check form-switch" v-if="bug.closed === true">
          <input class="form-check-input" type="checkbox" id="closed">
          <label class="form-check-label" for="closed">
            <p>Closed</p>
          </label>
        </div>

        <div class="form-check form-switch" v-else>
          <input class="form-check-input" type="checkbox" id="closed" @click="closeBug(bug.id)">
          <label class="form-check-label" for="closed">
            <p>Open</p>
          </label>
        </div>
      </div>
    </div>
    <div class="card-header mx-0 px-0 row justify-content-between">
      <div class="col-md-2" v-if="bug">
        <img :src="bug.creator?.picture" height="64" class="rounded-circle" alt="">
      </div>
      <div class="col-md-3">
        <small class="m-0 p-0">Reported By</small>
        <p>{{ bug.creator?.name }}</p>
      </div>
      <div class="col-md-2">
        <small class="m-0 p-0">Priority</small>
        <p>{{ bug.priority }}</p>
      </div>
      <div class="col-md-2">
        <small class="m-0 p-0">Last Updated</small>
        <p>{{ new Date(bug.updatedAt).toLocaleDateString() }}</p>
      </div>
      <div class="col-md-3">
        <div class="col-3" v-if="bug.closed === true">
          <small class="m-0 p-0">Status</small>
          <p>Closed <i class="mdi mdi-radiobox-marked f-20 text-green"></i></p>
        </div>
        <div class="col-md-3" v-else>
          <small class="m-0 p-0">Status</small>
          <p>Open <i class="mdi mdi-radiobox-blank f-20 text-red"></i></p>
        </div>
      </div>
    </div>

    <div class="card-body row">
      <h3>{{ bug.title }}</h3>
    </div>

    <div class="card-footer mx-0 px-0 row">
      <div class="col-6">
        <p>{{ bug.description }}</p>
      </div>

      <div class="col-3">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="closed" @click="trackBug">
          <label class="form-check-label" for="closed">
            <!-- TODO add v-if statement so that track bug only shows if you are not already tracking it -->
            <p><i class="mdi mdi-bug"></i> Track Bug</p>
            <!-- <p><i class="mdi mdi-bug"></i> Don't Track Bug</p> -->
          </label>
        </div>
      </div>
    </div>

    <div class="row p-3">
      <p>All users tracking bugs: </p>
      <div class="col-3" v-for="t in trackedBug" :key="t.id" :trackedBug="t">
        <img :src="t.tracker?.picture" height="30" class="rounded-circle" alt="">
        <p>{{ t.tracker?.name }}</p>
      </div>
    </div>
  </div>

  <Modal id="update-bug">
    <template #modal-title>
      Edit Bug Information
    </template>
    <template #modal-body>
      <BugForm :bug="bug" />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, reactive, ref } from '@vue/runtime-core'
import { Bug } from '../model/Bug'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
export default {
  setup() {
    const myTrackedBug = ref(false)
    const route = useRoute()
    return {
      myTrackedBug,
      trackedBug: computed(() => AppState.trackedBugs),
      account: computed(() => AppState.account),
      myTrackedBug: computed(() => AppState.trackedBugs.filter(t => t.accountId === AppState.account.id)),
      bugs: computed(() => AppState.bugs),
      bug: computed(() => AppState.bug),

      async trackBug() {
        try {
          if (this.myTrackedBug.length > 0) {
            await bugsService.deleteTrackedBug(this.myTrackedBug[0].id)
          } else {
            await bugsService.trackBug(route.params.id)
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async closeBug(bugId) {
        try {
          await bugsService.closeBug(bugId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.text-red{
  color: red;
}
.text-green{
  color: green;
}
.card{
  background-color: rgba(2, 2, 2, 0.5);
  color: white;
  box-shadow: 0px 0px 6px #e0dfd7c4;
  backdrop-filter: blur(20px);
}
</style>
