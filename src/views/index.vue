<template>
    <n-layout embedded content-style="padding: 24px;">
      <n-card>
        <div v-for="item in state.msg" :key="item.index">
          <n-gradient-text type="danger">　{{item}} </n-gradient-text>
        </div>
        <div class="footer">
          <p>测试 css 代码压缩</p>
        </div>
      </n-card>
    </n-layout>
</template>
<script setup>
import { reactive, onMounted } from "vue";
//import { useLoadingBar } from "naive-ui";

const state = reactive({
  msg: [
    '《沪杭车中》',
    '匆匆匆！催催催！',
　　'一卷烟，一片山，',
　　'几点云影，一道水，',
　　'一条桥，一支橹声，',
　　'一林松，一丛竹，',
　　'红叶纷纷;',
　　'艳色的田野，艳色的秋景，',
　　'梦境似的分明，',
　　'模糊，消隐——',
　　'催催催！',
　　'是车轮还是光阴？',
　　'催老了秋容，',
　　'催老了人生！',
  ],
})

onMounted(() => {
  //useLoadingBar().finish()
});
</script>
<style scoped lang="less">
  .footer{
    width: 100;
    height: 64px;
    background: rosybrown;
    p{
      font-size: 24px;
    }
  }
</style>