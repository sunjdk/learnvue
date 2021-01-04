<template>
  <div class="a">
    a组件
  </div>
</template>
<script>
//  常量声明
const value = { msg: 'Hello World!' }

//  引入外部资源
// import someThing from 'SomeThing';
export default {
  name: 'A',
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      //  常量
      value,
      //  状态
      flag: true,
      //  变量
      list: []
    }
  },
  computed: {},
  watch: {},
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
<style lang="scss" scoped>
.a {
 background:red;
}
</style>
