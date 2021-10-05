<template>
<div class="row rounded pt-3">
  <img :src="note.creator.picture" height="45px" class="rounded-circle" alt="">
    <p>
  {{note.creator.name}}
  </p>
</div>
<div class="row notes pt-3">
  <div class="col-md-11">
<p>
  {{note.body}}
</p>
  </div>
  <div class="col-md-1" v-if="account.id == note.creatorId">
    <i class="mdi mdi-delete selectable" @click="deleteNote()"></i>
  </div>
</div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Note } from '../model/Note'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    note: {type: Note, required: true}
  },
setup(props){
  return{
    account: computed(()=> AppState.account),
    async deleteNote(){
      try {
      const yes = await Pop.confirm('Are you sure you want to delete?')
      if(!yes)
      {
      return
      } await notesService.deleteNote(props.note.id)
    } catch (error) {
    Pop.toast(error.message, 'error')
  }
}
}
}

}
</script>


<style scoped lang="scss">
.notes{
  background-color: rgba(2, 2, 2, 0.5);
  backdrop-filter: blur(20px);
}
</style>