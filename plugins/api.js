import Vue from 'vue'
import api from './resource'
import * as resources from './resource/resources'

const API_URL = `https://api.alhinds.com/api/baby`

Vue.use(api, {
   resources,
   endpoint: API_URL
})
