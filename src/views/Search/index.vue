<template>
  <div class="content">
    <van-sticky>
      <!-- 搜索 -->
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          background="#3296FA"
          @focus="isResultShow = false"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </van-sticky>
    <!-- 内容 -->
    <search-content v-if="isResultShow" :value="value"></search-content>
    <!-- 提示 -->
    <search-tips v-else-if="value" :value="value" @clickToSearch="clickToSearch"></search-tips>
    <!-- 历史 -->
    <search-history v-else :setValue="setValue" @allClear="allClear" @oneSearchValue="oneSearchValue"></search-history>
  </div>
</template>

<script>
import SearchContent from './components/searchContent.vue'
import SearchHistory from './components/searchHistory.vue'
import SearchTips from './components/searchTips.vue'
export default {
  name: 'SearchIndex',
  components: { SearchContent, SearchHistory, SearchTips },
  data () {
    return {
      value: '',
      isResultShow: false, // 控制搜索结果的展示
      setValue: JSON.parse(localStorage.getItem('SEARCHVALUE')) || []
    }
  },
  watch: {
    setValue () {
      localStorage.setItem('SEARCHVALUE', JSON.stringify(this.setValue))
    }
  },
  methods: {
    onSearch (val) {
      const index = this.setValue.indexOf(val)
      if (index !== -1) {
        this.setValue.splice(index, 1)
      }
      this.setValue.unshift(val)
      if (this.setValue.length > 6) {
        this.setValue.splice(6)
      }
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    clickToSearch (clickValue) {
      this.value = clickValue
      this.isResultShow = true
    },
    // 清除全部历史记录
    allClear () {
      this.setValue = []
    },
    // 清除一个历史记录
    oneSearchValue (index) {
      this.setValue.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  .van-search{
    padding-bottom: 6px;
    padding-top: 6px;
  }
  .van-search__action{
    color: #fff;
  }
}
</style>
