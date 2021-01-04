<template>
  <div class="orders">
    Orders组件
  </div>
</template>
<script>

//  引入外部资源
// import someThing from 'SomeThing';
export default {
  name: 'Orders',
  data() {
    return {
      list: []
    }
  },
  methods: {
    test() {
      console.log('Hello World!')
    }
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {}
}
</script>
<style lang="less" scoped>
.orders {
  background: red;
}
</style>
