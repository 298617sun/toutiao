<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"/>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
      <span slot="left-icon" class="iconfont icon-shouji"></span>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
      <span slot="left-icon" class="iconfont icon-yanzhengma"></span>
        <template #button>
          <van-count-down v-if="isShowTime" :time="60 * 1000" format="ss s"/>
          <van-button v-else size="small" round class="send-sms-btn" native-type="button" @click="onSendSms">获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block native-type="submit" class="login-btn">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      isShowTime: false,
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    // 登录
    async onSubmit (values) {
      this.$toast.loading({
        message: '登录中',
        forbidClick: true,
        duration: 0
      })
      const { data } = await this.$api.user.login(values)
      this.$toast.success('登录成功')
      this.$store.commit('setUser', data)
      // 获取用户信息
      const userResult = await this.$api.user.getUser()
      this.$store.commit('setUserInfo', userResult.data)

      this.$router.back()
    },
    // 发送验证码
    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return this.$toast({ message: err.message, position: 'top' })
      }
      // 2. 校验成功，请求发送验证码
      await this.$api.user.sendSex(this.user.mobile)
      this.$toast({ message: '发送成功', position: 'top' })
      // 3. 发送验证码成功，显示倒计时
      this.isShowTime = true
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  .van-nav-bar /deep/ .van-icon {
    color: #fff;
  }
  .iconfont{
    font-size: 20px;
    padding: 0 6px;
  }
  .send-sms-btn{
    background: #EDEDED;
    width: 80px;
    height: 23px;
    font-size: 12px;
  }
  .login-btn-wrap{
    margin: 26px 14px;
    .login-btn{
      background: #6db4fb;
      color: #fff;
    }
  }
}
</style>
