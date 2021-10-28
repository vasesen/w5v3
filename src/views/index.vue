<template>
  <div>
    {{state.msg}}
  </div>
</template>
<script setup>
  import { reactive } from '@vue/reactivity';

  const state = reactive({
    msg:'vue3 demo'
  })
</script>