<template>
 <form @submit.prevent="reportBug">
  
    <div class="form-group">
      <label for="title" class="sr-only"></label>
      <input type="text"
             class="form-control"
             name="title"
             id="title"
             placeholder="Title"
             v-model="editable.title"
              required
      > 
      </div>

         <div class="form-group">
      <label for="description" class="sr-only"></label>
      <input type="text"
             class="form-control bg-light"
             name="description"
             id="description"
             placeholder="Please describe the bug..."
             v-model="editable.description"
              required
      > 
      </div>

         <div class="form-group">
      <label for="priority" class="sr-only"></label>
      <input type="number"
             class="form-control bg-light"
             name="priority"
             id="priority"
             placeholder="Priority Level 1-5"
             v-model="editable.priority"
              required
      > 
      </div>

      <div>
      <button class="btn btn-primary mt-4" data-bs-dismiss="modal">Report Bug</button>
      </div>

      </form>
</template>

<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'

 export default {
    setup() {
      const editable = ref({})
      watchEffect(() => {
        editable.value = {}
      })
      return {
        bug: computed(() => AppState.bugs),
        editable,
        async reportBug(){
          try {
            const newBug = await bugsService.reportBug(editable.value)
            router.push({ name: 'BugDetail', params: { id: newBug}})
            editable.value = {}
            }
           catch (error) {
            Pop.toast(error.message, 'error')
          }
          
        }
      }
    }
  }
  </script>
<style>

</style>