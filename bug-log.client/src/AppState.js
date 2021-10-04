import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
   /**@type {import('.model/Bug.js').Bug[]} */
  bugs: [],
  bug: [],
  trackedBugs: [],
   /**@type {import('.model/Note.js').Note[]} */
  notes: []
})
