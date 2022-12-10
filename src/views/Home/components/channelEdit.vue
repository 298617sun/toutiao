<template>
  <div>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '93%' }"
    >
    <div class="content">
      <div class="channel-item">
        <div class="title">
          <span>我的频道</span>
          <van-button @click="isEdit = !isEdit" type="danger" plain round size="mini">{{isEdit ? '编辑' : '完成'}}</van-button>
        </div>
        <div class="item-content">
          <div class="item-btn" v-for="(item, index) in myChannels" :key="item.id" @click="delMyChannels(item,index)">
            <van-icon name="close" class="del-icon" v-if="index !== 0 && isEdit"/>
            <span :class="active === index ? 'active' : ''">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="channel-item">
        <div class="title">
          <span>频道推荐</span>
        </div>
        <div class="item-content">
          <div class="item-btn" v-for="item in recommendChannels" :key="item.id" @click="addToMyChannels(item)">
            <van-icon name="plus"/>&nbsp;{{item.name}}
          </div>
        </div>
      </div>
    </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  props: {
    channels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      show: true,
      isEdit: true
    }
  },
  computed: {
    myChannels () {
      return this.channels
    },
    ...mapState(['allChannel', 'user']),
    // 频道推荐
    recommendChannels () {
      return this.allChannel.filter(item => {
        return !this.channels.find(item1 => {
          return item1.id === item.id
        })
      })
    }
  },
  methods: {
    isShow () {
      this.isEdit = true
      this.show = true
    },
    // 向我的频道中添加
    addToMyChannels (item) {
      this.myChannels.push(item)
      // 持久化存储
      if (this.user) {
        this.$api.channel.addMyChannel({
          id: item.id,
          seq: this.myChannels.length
        })
      } else {
        localStorage.setItem('MYCHANNELS', JSON.stringify(this.myChannels))
      }
    },
    // 点我的频道（删除或者进入）
    delMyChannels (item, index) {
      if (this.isEdit) {
        // 持久化存储
        if (this.user) {
          this.$api.channel.delMyChannel(item.id)
        } else {
          this.myChannels.splice(index, 1)
          localStorage.setItem('MYCHANNELS', JSON.stringify(this.myChannels))
        }
      } else {
        this.$emit('update:active', index)
        this.show = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  margin: 31px 11px 0;
  .channel-item{
    .title{
      display: flex;
      justify-content: space-between;
      padding: 23px 0 24px 0;
      font-size: 16px;
      color: #333333;
      button{
        width: 50px;
      }
    }
    .item-content{
      display: flex;
      flex-wrap: wrap;
      .item-btn{
        position: relative;
        width: 80px;
        height: 43px;
        line-height: 43px;
        text-align: center;
        background: #F4F5F6;
        margin-right: 11px;
        margin-bottom: 14px;
        font-size: 14px;
        .active{
          color: #ee0a24;
        }
        &:nth-child(4n){
          margin-right: 0
        }
        .del-icon{
          position: absolute;
          right: -4px;
          top: -7px;
        }
      }
    }
  }
}
</style>
