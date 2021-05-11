import { defineAbility, createAliasResolver } from '@casl/ability';
// import store from "../store"
const routes = ['/', '/pages', '/stats', '/errors']
const role = 'manager'
// const viewer = store.getters["auth/manger"]
// const editor = store.state.auth.user.pageEditors

const resolveAction = createAliasResolver({
  modify: ['create', 'change']
});

export default defineAbility((can) => {
  if(role === 'admin') return can('manage', 'all')
  
  can('modify', 'editor')
  can('change', 'contentManager')

  for (const iterator of routes) {
    console.log(iterator)
    can('access', iterator)
  }

}, { resolveAction });