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
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import { Bug } from '../model/Bug'

 export default {
   props: {
     bug: {
       type: Bug, default: () => new Bug() 
     }
   },
    setup(props) {
      const editable = ref({})
      const route = useRoute()
      watchEffect(() => {
        editable.value = {...props.bug}
      })
      return {
        editable,
        async reportBug(){
          try {
            await bugsService.reportBug(editable.value)
            // router.push({ name: 'BugDetails', params: { id: newBug}})
            editable.value = {}
            }
           catch (error) {
            Pop.toast(error.message, 'error')
            logger.log('report bug', error)
          }
          
        }
      }
    }
  }
  </script>
<style>

</style>