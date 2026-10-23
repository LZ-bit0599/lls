<template>
  <div class="home">
    <h2>🏠 欢迎来到图书借阅管理系统</h2>
    <p class="intro">这是一个用来学习 Vue Router 4 的 Demo 项目。</p>

    <div class="card-grid">
      <router-link to="/books/list" class="card">
        <div class="card-icon">📚</div>
        <div class="card-title">图书列表</div>
        <div class="card-desc">需要登录才能访问</div>
      </router-link>
      <router-link to="/login" class="card">
        <div class="card-icon">🔑</div>
        <div class="card-title">用户登录</div>
        <div class="card-desc">模拟登录页面</div>
      </router-link>
      <router-link to="/abc" class="card danger">
        <div class="card-icon">❓</div>
        <div class="card-title">测试 404</div>
        <div class="card-desc">访问不存在的路由</div>
      </router-link>
    </div>

    <div class="demo-section">
      <ShoppingList />
    </div>
  </div>
</template>

<script setup>
import ShoppingList from '../components/ShoppingList.vue'
</script>

<style scoped>
.home {
  padding: 24px;
}

h2 {
  font-size: 22px;
  margin-bottom: 8px;
  color: #1f2937;
}

.intro {
  color: #6b7280;
  margin-bottom: 24px;
  font-size: 14px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 28px;
}

.card {
  display: block;
  padding: 20px 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  text-decoration: none;
  color: #1f2937;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card.danger {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.card-icon {
  font-size: 28px;
  margin-bottom: 6px;
}

.card-title {
  font-weight: 600;
  font-size: 15px;
}

.card-desc {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

.demo-section {
  border-top: 2px dashed #e5e7eb;
  padding-top: 20px;
}
</style>