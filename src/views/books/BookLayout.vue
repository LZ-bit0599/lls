<template>
  <div class="book-layout">
    <aside class="sidebar">
      <div class="logo">📚 图书管理</div>
      <nav>
        <router-link to="/books/list" class="nav-item" active-class="active">
          📋 图书列表
        </router-link>
        <router-link to="/books/borrow" class="nav-item" active-class="active">
          📖 借阅记录
        </router-link>
      </nav>
    </aside>

    <main class="main-area">
      <header class="top-bar">
        <div class="breadcrumb">
          <router-link to="/">首页</router-link>
          <span>/</span>
          <span class="current">{{ $route.meta.title }}</span>
        </div>
        <div class="user-info">
          <span>👤 {{ currentUser?.username || '未登录' }}</span>
          <button @click="handleLogout" class="btn-logout">退出</button>
        </div>
      </header>

      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logout, currentUser } from '../../stores/auth'

const router = useRouter()

function handleLogout() {
  if (confirm('确定要退出登录吗？')) {
    logout()
    router.replace('/login')
  }
}
</script>

<style scoped>
.book-layout {
  display: flex;
  min-height: 520px;
}

.sidebar {
  width: 200px;
  background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
  padding: 20px 0;
  flex-shrink: 0;
}

.logo {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 12px;
}

nav {
  display: flex;
  flex-direction: column;
}

.nav-item {
  padding: 12px 20px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  border-left: 3px solid transparent;
  transition: all 0.2s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border-left-color: #38bdf8;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.breadcrumb {
  font-size: 13px;
  color: #64748b;
  display: flex;
  gap: 8px;
  align-items: center;
}

.breadcrumb a {
  color: #3b82f6;
  text-decoration: none;
}

.breadcrumb .current {
  color: #1f2937;
  font-weight: 500;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #475569;
}

.btn-logout {
  padding: 5px 12px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.btn-logout:hover {
  background: #fecaca;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>