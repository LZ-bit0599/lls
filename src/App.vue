<template>
  <div class="app-wrapper">
    <header class="app-header">
      <div class="brand">
        <h1>📚 图书借阅管理系统</h1>
        <p class="subtitle">Vue3 + Vue Router 4 Demo</p>
      </div>
      <nav class="top-nav">
        <router-link to="/" class="nav-link" active-class="active">🏠 首页</router-link>
        <router-link to="/books/list" class="nav-link" active-class="active">📚 图书管理</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="nav-link" active-class="active">🔑 登录</router-link>
        <router-link v-else to="/" class="nav-link user">👤 {{ currentUser?.username }}</router-link>
      </nav>
    </header>
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { isLoggedIn, currentUser } from './stores/auth'
</script>

<style scoped>
.app-wrapper {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.app-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  border-radius: 16px;
  padding: 20px 28px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.brand h1 {
  font-size: 22px;
  color: #fff;
  margin-bottom: 2px;
}

.subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.top-nav {
  display: flex;
  gap: 10px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.nav-link.user {
  background: rgba(255, 255, 255, 0.12);
}

.app-main {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  min-height: 480px;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>