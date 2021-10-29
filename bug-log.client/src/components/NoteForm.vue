<template>
  <div class="card p-0 m-0">
    <div class="card-header">
      <h3>Notes:</h3>
    </div>

    <div class="card-body">
      <form @submit.prevent="createNote">
        <div class="row">
          <div class="col-md-9">
            <div class="form-group">
              <label for="body" class="sr-only"></label>
              <input type="text"
                     class="form-control bg-light"
                     height="100px"
                     width="50px"
                     name="body"
                     placeholder="Drop a note..."
                     v-model="editable.body"
                     required
              >
            </div>
          </div>
          <div class="col-md-3">
            <button class="btn btn-primary mt-4">
              Send Note
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="card-body">
      <Notes v-for="n in note" :key="n.id" :note="n" />
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { notesService } from '../services/NotesService'

export default {
  setup() {
    const editable = ref({})
    return {
      account: computed(() => AppState.account),
      bug: computed(() => AppState.bug),
      note: computed(() => AppState.notes),
      editable,
      async createNote() {
        try {
          editable.value.bugId = AppState.bug.id
          await notesService.createNote(editable.value)
          editable.value = {}
          Pop.toast('Note Added', 'success')
        } catch (error) {
          Pop.toast('unable to create note', 'error')
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
