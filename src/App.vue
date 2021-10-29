// App.vue
<template>
<n-loading-bar-provider>
  <layout/>
</n-loading-bar-provider>
  
</template>
<script setup>
import Layout  from './views/index.vue'
import { reactive,onMounted } from 'vue';

  const state = reactive({
    msg:'vue3 demo'
  })

  const longestPalindrome = function(s) {
    let arr = s.split('')
    let sum = [] ,j= 1
    for(let i = 0;i<arr.length;i++){
        if(arr[i]===arr[i+1]){
            j++
        }else{
            sum.push(j)
            j = 1
        }
    }
    let sums =[]
    sum.forEach(i=>sums.push(2 * Math.floor(i/2)))
    let x = sums.reduce((cur,pre)=>cur+pre)
    if(x<arr.length){
      return x+1
    }
    return x
};

onMounted(()=>{
  longestPalindrome("abccccdd")
})
</script>
<style scoped lang="less">
</style>