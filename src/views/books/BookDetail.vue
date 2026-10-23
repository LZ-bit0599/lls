<template>
  <div class="book-detail">
    <div v-if="book" class="detail-card">
      <div class="cover">📖</div>
      <div class="info">
        <h3>{{ book.name }}</h3>
        <p class="meta">作者：{{ book.author }} · ID：{{ book.id }}</p>
        <p class="meta">
          状态：
          <span class="status" :class="book.available ? 'ok' : 'bad'">
            {{ book.available ? '可借阅' : '已被借出' }}
          </span>
        </p>

        <div class="actions">
          <button
            v-if="book.available"
            @click="borrowBook"
            class="btn-primary"
          >
            立即借阅
          </button>
          <router-link to="/books/list" class="btn-back">← 返回列表</router-link>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <p>❌ 未找到 ID 为 <b>{{ bookId }}</b> 的图书</p>
      <router-link to="/books/list" class="btn-back">← 返回列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const books = [
  { id: 1, name: 'Vue.js 设计与实现', author: '霍春阳', available: true },
  { id: 2, name: 'JavaScript 高级程序设计', author: 'Matthew Frisbie', available: false },
  { id: 3, name: '深入浅出 React 和 Redux', author: '程墨', available: true },
  { id: 4, name: '你不知道的 JavaScript', author: 'Kyle Simpson', available: true },
  { id: 5, name: 'CSS 权威指南', author: 'Eric A. Meyer', available: false }
]

const bookId = computed(() => Number(route.params.id))
const book = computed(() => books.find(b => b.id === bookId.value))

function borrowBook() {
  alert(`📚 成功借阅《${book.value.name}》！`)
  router.push('/books/borrow')
}
</script>

<style scoped>
.detail-card {
  display: flex;
  gap: 24px;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  margin-bottom: 16px;
}

.cover {
  font-size: 72px;
  width: 120px;
  height: 160px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
}

.info h3 {
  font-size: 20px;
  color: #1f2937;
  margin-bottom: 10px;
}

.meta {
  color: #475569;
  font-size: 14px;
  margin-bottom: 6px;
}

.status {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.status.ok {
  background: #dcfce7;
  color: #16a34a;
}

.status.bad {
  background: #fee2e2;
  color: #dc2626;
}

.actions {
  margin-top: 18px;
  display: flex;
  gap: 10px;
}

.btn-primary {
  padding: 8px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-back {
  padding: 8px 20px;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.btn-back:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.not-found {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

.not-found b {
  color: #dc2626;
}
</style>