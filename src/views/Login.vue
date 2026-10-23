<template>
  <div class="login-wrap">
    <div class="login-card">
      <h2>🔑 用户登录</h2>
      <p class="tip">任意用户名密码即可（模拟登录）</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="field">
          <label>用户名</label>
          <input v-model="form.username" placeholder="请输入用户名" autocomplete="username" />
        </div>
        <div class="field">
          <label>密码</label>
          <input v-model="form.password" type="password" placeholder="请输入密码" autocomplete="current-password" />
        </div>

        <div v-if="errorMsg" class="error">{{ errorMsg }}</div>

        <button type="submit" :disabled="loading" class="btn-login">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div class="redirect-hint" v-if="redirect">
        登录后将跳转回：<code>{{ redirect }}</code>
      </div>

      <router-link to="/" class="back-home">← 返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../stores/auth'

const route = useRoute()
const router = useRouter()

const redirect = ref(route.query.redirect || '')
const form = reactive({ username: '', password: '' })
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  errorMsg.value = ''
  loading.value = true
  try {
    await login(form.username, form.password)
    const target = redirect.value || '/'
    console.log('[登录成功] 跳转至 →', target)
    router.replace(target)
  } catch (e) {
    errorMsg.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  padding: 60px 16px;
}

.login-card {
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 14px;
  padding: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 6px;
  color: #1f2937;
}

.tip {
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 24px;
}

.field {
  margin-bottom: 14px;
}

.field label {
  display: block;
  font-size: 13px;
  color: #4b5563;
  margin-bottom: 6px;
  font-weight: 500;
}

.field input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus {
  border-color: #3b82f6;
}

.error {
  background: #fef2f2;
  color: #dc2626;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  margin-bottom: 12px;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-login:hover:not(:disabled) {
  opacity: 0.92;
}

.redirect-hint {
  margin-top: 14px;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
}

.redirect-hint code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  color: #3b82f6;
}

.back-home {
  display: block;
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  color: #6b7280;
  text-decoration: none;
}

.back-home:hover {
  color: #3b82f6;
}
</style>