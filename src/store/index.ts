import { defineStore } from "pinia"
import { ref } from "vue"

export const usestoreConfig = defineStore('storeConfig',()=> {
    const someState = ref('hello pinia')
    return { someState }
  },{
    persist: true,
  },)