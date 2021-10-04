import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
   /**@type {import('.model/Bug.js').Bug[]} */
  bugs: [],
  bug: {},
   /**@type {import('.model/TrackedBug.js').TrackedBug[]} */
  trackedBugs: [],
  trackedBug: [],
   /**@type {import('.model/Note.js').Note[]} */
  notes: []
})
