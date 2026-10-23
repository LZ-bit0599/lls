<template>
  <div class="book-list">
    <h3>📋 图书列表</h3>
    <p class="desc">点击书名可查看详情</p>

    <div class="search-bar">
      <input v-model="keyword" placeholder="搜索图书..." class="search" />
      <span class="count">共 {{ filteredBooks.length }} 本</span>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>书名</th>
          <th>作者</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in filteredBooks" :key="book.id">
          <td>{{ book.id }}</td>
          <td>
            <router-link :to="`/books/detail/${book.id}`" class="book-link">
              {{ book.name }}
            </router-link>
          </td>
          <td>{{ book.author }}</td>
          <td>
            <span class="status" :class="book.available ? 'ok' : 'bad'">
              {{ book.available ? '可借' : '已借出' }}
            </span>
          </td>
          <td>
            <router-link :to="`/books/detail/${book.id}`" class="btn-sm">查看</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const keyword = ref('')

const books = ref([
  { id: 1, name: 'Vue.js 设计与实现', author: '霍春阳', available: true },
  { id: 2, name: 'JavaScript 高级程序设计', author: 'Matthew Frisbie', available: false },
  { id: 3, name: '深入浅出 React 和 Redux', author: '程墨', available: true },
  { id: 4, name: '你不知道的 JavaScript', author: 'Kyle Simpson', available: true },
  { id: 5, name: 'CSS 权威指南', author: 'Eric A. Meyer', available: false }
])

const filteredBooks = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  if (!k) return books.value
  return books.value.filter(b =>
    b.name.toLowerCase().includes(k) || b.author.toLowerCase().includes(k)
  )
})
</script>

<style scoped>
.book-list h3 {
  font-size: 18px;
  margin-bottom: 4px;
  color: #1f2937;
}

.desc {
  color: #6b7280;
  font-size: 13px;
  margin-bottom: 16px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.search {
  padding: 8px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  width: 240px;
}

.search:focus {
  border-color: #3b82f6;
}

.count {
  font-size: 12px;
  color: #6b7280;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.table th,
.table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.table th {
  background: #f8fafc;
  color: #475569;
  font-weight: 600;
  font-size: 13px;
}

.book-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.book-link:hover {
  text-decoration: underline;
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

.btn-sm {
  padding: 4px 10px;
  background: #dbeafe;
  color: #2563eb;
  text-decoration: none;
  border-radius: 6px;
  font-size: 12px;
}

.btn-sm:hover {
  background: #bfdbfe;
}
</style>