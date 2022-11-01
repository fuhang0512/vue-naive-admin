<template>
  <AppPage :show-footer="true" :style="{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover' }">
    <div class="form-container">
      <div class="left-image-container">
        <img src="@/assets/images/login_banner.webp" w-full alt="login_banner" />
      </div>

      <div class="right-form-container">
        <div class="right-form-container-title">
          <icon-custom-logo class="icon" />
          {{ title }}
        </div>
        <n-form ref="formRef" :model="loginInfo" :show-label="false" size="large">
          <n-form-item path="username">
            <n-input
              v-model:value="loginInfo.username"
              placeholder="请输入用户名"
              :allow-input="noSideSpace"
              :maxlength="20"
              clearable
              @keydown.enter.prevent
              style="height: 44px"
            />
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="loginInfo.password"
              type="password"
              :allow-input="noSideSpace"
              :maxlength="20"
              show-password-on="mousedown"
              placeholder="请输入密码"
              clearable
              @keydown.enter.prevent
              style="height: 44px"
            />
          </n-form-item>

          <!-- <n-form-item path="code" :show-feedback="false"> -->
          <Verify
            mode="pop"
            :captchaType="captchaType"
            :imgSize="{ width: '400px', height: '200px' }"
            ref="verify"
            @success="handleSuccess"
          ></Verify>
          <!-- </n-form-item> -->
        </n-form>
        <div
          @click="onShow"
          class="manual-verification"
          title="点击进行行为验证"
          :style="{ cursor: isVerify ? 'default' : 'pointer' }"
        >
          <div class="verify-radar" v-if="!isVerify">
            <div class="verify-radar-ring"></div>
            <div class="verify-radar-dot"></div>
          </div>
          <div class="verify-radar-success" v-else>
            <n-icon size="24">
              <icon-ph:shield-check-bold />
            </n-icon>
          </div>
          <div class="verify-text">{{ isVerify ? '通过验证' : '点击按钮进行验证' }}</div>
          <div class="verify-text-success" :style="{ width: isVerify ? '100%' : '0' }"></div>
        </div>

        <div class="options-password">
          <!-- (val:boolean) => (isRemember = val) -->
          <n-checkbox :checked="isRemember" label="记住我" :on-update:checked="handleIsRememberChecked" />
          <n-button text> 忘记密码? </n-button>
        </div>

        <div class="login-form-btn">
          <n-button class="login-submit-btn" type="primary" :loading="loginLoading" @click="handleLogin">
            登 录
          </n-button>
          <div class="other-login-btn">
            <n-button text> 使用微信扫码登录 </n-button>
            <n-divider vertical />
            <n-button text> 使用手机号登录 </n-button>
          </div>
        </div>
        <!-- <div mt-20>
          <n-button w-full h-50 rounded-5 text-16 type="primary" :loading="loginLoading" @click="handleLogin">
            登录
          </n-button>
        </div> -->
      </div>
    </div>
  </AppPage>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import api from './api'
import { encryptionLogin, getLocal, removeLocal, setLocal, setSession, setToken } from '@/utils'
import bgImg from '@/assets/images/login_bg.webp'
import { addDynamicRoutes } from '@/router'
import Verify from '@/components/custom/verifition/Verify.vue'

const router = useRouter()
const route = useRoute()
const query = route.query

/* 表单相关 */

const noSideSpace = (value: string) => !value.startsWith(' ') && !value.endsWith(' ')

interface LoginInfo {
  username: string
  password: string
  code: string
}
const loginInfo = ref<LoginInfo>({
  username: '',
  password: '',
  code: '',
})

const isVerify = ref(false)
const formRef = ref()

const localLoginInfo = getLocal('loginInfo') as LoginInfo
if (localLoginInfo) {
  loginInfo.value.username = localLoginInfo.username || ''
  loginInfo.value.password = localLoginInfo.password || ''
}

// clickWord
const captchaType = ref('blockPuzzle')
const verify: any = ref(null)

const onShow = (type: any) => {
  // captchaType.value = type
  if (!isVerify.value) {
    verify.value.show()
  }
}
const handleSuccess = (res: any) => {
  console.log(res)
  console.log('success')
  loginInfo.value.code = res.captchaVerification
  isVerify.value = true
  const isObjectValues = Object.values(loginInfo.value).every((x) => x)
  if (isObjectValues) {
    handleLogin()
  }
}

const title: string = import.meta.env.VITE_APP_TITLE

const isRemember = useStorage('isRemember', false)

// 记住密码
const handleIsRememberChecked = (val: boolean) => {
  isRemember.value = val
}

// 登录
const loginLoading = ref<boolean>(false)
const handleLogin = async () => {
  const { username, password } = loginInfo.value
  if (!username || !password) {
    window.$message?.warning('请输入用户名和密码')
    return
  }
  if (isVerify.value) {
    try {
      loginLoading.value = true
      const encryptionForm = encryptionLogin({
        data: loginInfo.value,
        key: '5c32db7ffd41e1c8',
        param: ['password'],
      })
      const basicAuth = 'Basic ' + window.btoa('biyi:biyi')
      setSession('basicAuth', basicAuth)
      encryptionForm.basicAuth = basicAuth
      const res: any = await api.login(encryptionForm, {
        randomStr: 'blockPuzzle',
        code: encryptionForm.code,
        grant_type: 'password',
      })
      console.log('res', res)
      window.$notification?.success({ title: '登录成功！', duration: 2500 })
      setToken(res.access_token)
      if (isRemember.value) setLocal('loginInfo', { username, password })
      else removeLocal('loginInfo')

      await addDynamicRoutes()
      isVerify.value = false
      if (query.redirect) {
        const path = query.redirect as string
        Reflect.deleteProperty(query, 'redirect')
        router.push({ path, query })
      } else {
        router.push('/')
      }
    } catch (error) {
      isVerify.value = false
      console.error(error)
    }
    loginLoading.value = false
  } else {
    verify.value.show()
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  margin: auto;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 345px;
  border-radius: 10px;
  box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017;
  .left-image-container {
    width: 380px;
    display: none;
    padding: 35px 20px;
    box-sizing: border-box;
    @media (min-width: 768px) {
      display: block;
    }
  }
  .right-form-container {
    width: 360px;
    display: flex;
    flex-direction: column;
    padding: 35px 20px;
    box-sizing: border-box;
    .right-form-container-title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #6a6a6a;
      margin-bottom: 30px;
      .icon {
        margin-right: 30px;
        font-size: 50px;
        color: var(--primary-color);
      }
    }
    // 密码校验
    .manual-verification {
      height: 36px;
      border: 1px solid #000;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #1d1e23;
      border-color: var(--primary-color);
      box-shadow: var(--primary-color) 0px 0px 0.25rem;
      border-radius: 20px;
      padding-left: 10px;
      position: relative;
      overflow: hidden;
      .verify-radar {
        width: 20px;
        height: 20px;
        position: relative;
        margin-right: 5px;
        .verify-radar-ring {
          width: 100%;
          height: 100%;
          background-color: var(--primary-color);
          box-shadow: var(--primary-color) 0px 0px 0px 2px inset;
          position: absolute;
          border-radius: 50%;
          transform: scale(1);
          animation: 1.2s infinite anim-ring;
          background-image: linear-gradient(0, rgba(0, 0, 0, 0) 50%, #fff 50%),
            linear-gradient(0, #fff 50%, rgba(0, 0, 0, 0) 50%);
        }
        .verify-radar-dot {
          width: 100%;
          height: 100%;
          position: absolute;
          border-radius: 50%;
          transform: scale(0.4);
          background-color: var(--primary-color);
          box-shadow: var(--primary-color) 0px 0px 0px 1px inset;
          background-color: var(--primary-color);
        }
      }
      .verify-radar-success {
        display: flex;
        align-items: center;
        margin-right: 5px;
        color: var(--primary-color);
        // margin-top: -1px;
      }
      .verify-text-success {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: rgba(49, 108, 114, 0.2);
      }
    }
    // 记住密码与忘记密码
    .options-password {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
    .login-form-btn {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      .login-submit-btn {
        width: 100%;
        height: 46px;
        border-radius: 5px;
      }
      .other-login-btn {
        color: var(--primary-color);
        margin-top: 10px;
        .n-divider {
          width: 2px;
          background-color: var(--primary-color);
        }
      }
    }
  }
}
@keyframes anim-ring {
  60% {
    transform: scale(0.8);
  }
}
</style>
