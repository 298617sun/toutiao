<template>
  <div class="content" v-if="list[0] !== null">
    <van-cell v-for="(item,index) in list" :key="index" icon="search" @click="$emit('clickToSearch',item)">
       <!--  -->
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      list: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.getSuggestion(value)
      }
    }
  },
  methods: {
    async getSuggestion (value) {
      const { data } = await this.$api.search.getSuggestion({ q: value })
      this.list = data.options
    },
    // 配对内容高亮
    highlight (text) {
      const highlightStr = `<span class="active">${this.value}</span>`
      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const ref = new RegExp(this.value, 'gi')
      console.log(text.replace(ref, highlightStr))
      return text.replace(ref, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .active{
  color: #3296fa;
}
</style>
