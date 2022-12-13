<template>
  <div class="content" v-if="setValue.length">
    <van-cell title="搜索历史">
      <div v-if="isEdit">
        <span @click="$emit('allClear')">全部删除</span>&nbsp;&nbsp;
        <span @click="isEdit = false">完成</span>
      </div>
      <van-icon name="delete" @click="isEdit = true" v-else/>
    </van-cell>
    <van-cell
      v-for="(item,index) in setValue"
      :key="index"
      :title="item"
    >
      <van-icon name="close" @click="$emit('oneSearchValue', index)"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    setValue: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isEdit: false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
