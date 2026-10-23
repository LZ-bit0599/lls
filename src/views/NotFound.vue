<template>
  <div class="not-found">
    <div class="code">404</div>
    <div class="msg">页面不存在</div>
    <p class="hint">你访问的路径 <code>{{ $route.fullPath }}</code> 没有找到</p>
    <div class="actions">
      <router-link to="/" class="btn">返回首页</router-link>
      <router-link to="/books/list" class="btn ghost">图书列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 20px;
}

.code {
  font-size: 96px;
  font-weight: 800;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.msg {
  font-size: 20px;
  color: #1f2937;
  margin-top: 8px;
  margin-bottom: 16px;
}

.hint {
  color: #6b7280;
  font-size: 14px;
}

.hint code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  color: #f5576c;
}

.actions {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  padding: 10px 22px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
}

.btn.ghost {
  background: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}
</style>