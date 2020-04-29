<template>
  <div class="login">
    <section class="login-wrapper">
      <img class="logo" src="~assets/images/image-brand-logo.png" alt="logo" />
      <form action="#" class="form">
        <h2 class="login-title">欢迎登陆</h2>
        <div class="form-item">
          <sx-icon type="icon-account-number" color="#7D7D7D" />
          <input type="text" placeholder="请输入账号" />
        </div>
        <div class="form-item">
          <sx-icon type="icon-password" color="#7D7D7D" />
          <input type="password" placeholder="请输入密码" />
        </div>
        <sx-button class="button-login">登录</sx-button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.login {
  background-image: url('~assets/images/image-login-bg.jpg');
  background-size: cover;
  width: 100%;
  height: 100vh;
  padding: 4vw;
  &-wrapper {
    height: calc(100vh - 2 * 4vw);
    width: calc(100vw - 2 * 4vw);
    position: relative;
    box-shadow: 0 0 2rem rgba($black, 0.3);
  }
  .logo {
    position: absolute;
    width: 9vw;
    left: 3rem;
    top: 3rem;
  }
  .form {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: $white;
    border-radius: 3px;
    padding: 1rem 0;
    width: get-vw(560px);
    height: get-vw(590px);
    padding: get-vw(75px);
    &-item {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 2px solid #ececec;
      padding-bottom: get-vw(9px);
      .sui-icon {
        width: get-vw(3rem);
        height: get-vw(3rem);
      }
      input {
        flex: 1;
        outline: none;
        border: none;
        margin: 0 get-vw(5px) 0 get-vw(15px);
        @include text($nm-font-weight, get-vw(20px), $color-grey-light-2);
      }
    }
  }
  &-title {
    padding-bottom: 14px;
    border-bottom: 5px solid #3781dc;
    @include text($nm-font-weight, 3rem, $color-grey-light-2);
  }
  .button-login {
    width: 100%;
    height: get-vw(66px);
    font-size: 2rem;
  }
}
</style>
