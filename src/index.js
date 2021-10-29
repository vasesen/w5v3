// index.js
import { createApp } from 'vue';
import App from './App.vue';
import {
  create,
  NButton,
  NLayout,
  NCard,
  NGradientText,
  NLoadingBarProvider
} from 'naive-ui'

const naive = create({
  components: [NButton,NLayout,NCard,NGradientText, NLoadingBarProvider]
})

const app = createApp(App)
app.use(naive)
app.mount('#app')