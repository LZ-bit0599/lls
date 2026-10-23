<template>
  <div class="borrow">
    <h3>📖 借阅记录</h3>
    <p class="desc">最近的借阅历史</p>

    <div v-if="records.length === 0" class="empty">
      暂无借阅记录
    </div>

    <ul v-else class="record-list">
      <li v-for="r in records" :key="r.id" class="record">
        <div class="book-info">
          <div class="name">{{ r.bookName }}</div>
          <div class="author">{{ r.author }}</div>
        </div>
        <div class="time">
          <div class="borrow">借出：{{ formatTime(r.borrowAt) }}</div>
          <div class="due" :class="{ overdue: isOverdue(r.dueAt) }">
            应还：{{ formatTime(r.dueAt) }}
            <span v-if="isOverdue(r.dueAt)" class="tag">已逾期</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const records = ref([
  { id: 1, bookName: 'JavaScript 高级程序设计', author: 'Matthew Frisbie', borrowAt: '2026-09-01', dueAt: '2026-10-01' },
  { id: 2, bookName: 'CSS 权威指南', author: 'Eric A. Meyer', borrowAt: '2026-09-15', dueAt: '2026-10-15' }
])

function formatTime(t) {
  return t
}

function isOverdue(t) {
  return new Date(t) < new Date('2026-10-23')
}
</script>

<style scoped>
.borrow h3 {
  font-size: 18px;
  margin-bottom: 4px;
  color: #1f2937;
}

.desc {
  color: #6b7280;
  font-size: 13px;
  margin-bottom: 16px;
}

.empty {
  text-align: center;
  color: #9ca3af;
  padding: 40px;
  background: #f8fafc;
  border-radius: 10px;
  font-size: 14px;
}

.record-list {
  list-style: none;
}

.record {
  display: flex;
  justify-content: space-between;
  padding: 16px 18px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: box-shadow 0.2s;
}

.record:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.name {
  font-weight: 600;
  color: #1f2937;
  font-size: 15px;
}

.author {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

.time {
  text-align: right;
  font-size: 12px;
  color: #6b7280;
}

.time .due.overdue {
  color: #dc2626;
  font-weight: 500;
}

.tag {
  display: inline-block;
  background: #fee2e2;
  color: #dc2626;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 11px;
  margin-left: 6px;
}
</style>