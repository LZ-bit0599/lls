<template>
  <div class="shopping-list">
    <div class="input-bar">
      <input
        v-model="newItem"
        @keyup.enter="addItem"
        placeholder="输入要买的东西，回车添加..."
        class="item-input"
      />
      <button @click="addItem" class="btn-add">添加</button>
    </div>

    <div v-if="items.length === 0" class="empty-tip">
      清单是空的，快去添加点什么吧 ✨
    </div>

    <ul v-else class="items">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="item"
        :class="{ done: item.done }"
      >
        <label class="checkbox-wrap">
          <input type="checkbox" v-model="item.done" />
          <span class="checkmark"></span>
        </label>
        <span class="item-name">{{ item.name }}</span>
        <button class="btn-del" @click="removeItem(index)">删除</button>
      </li>
    </ul>

    <footer v-if="items.length > 0" class="footer">
      <span>
        共 <b>{{ items.length }}</b> 项，已完成
        <b>{{ doneCount }}</b> 项
      </span>
      <button
        v-if="doneCount > 0"
        @click="clearDone"
        class="btn-clear"
      >
        清除已完成
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const newItem = ref('')
const items = ref([
  { id: 1, name: '牛奶', done: false },
  { id: 2, name: '鸡蛋', done: true },
  { id: 3, name: '面包', done: false }
])

let nextId = 4

const doneCount = computed(() => items.value.filter(i => i.done).length)

function addItem() {
  const name = newItem.value.trim()
  if (!name) return
  items.value.push({ id: nextId++, name, done: false })
  newItem.value = ''
}

function removeItem(index) {
  items.value.splice(index, 1)
}

function clearDone() {
  items.value = items.value.filter(i => !i.done)
}
</script>

<style scoped>
.shopping-list {
  padding: 24px;
}

.input-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.item-input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.item-input:focus {
  border-color: #43e97b;
}

.btn-add {
  padding: 10px 20px;
  background: #43e97b;
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
}

.btn-add:hover {
  opacity: 0.9;
}

.btn-add:active {
  transform: scale(0.96);
}

.empty-tip {
  text-align: center;
  color: #9ca3af;
  padding: 32px 0;
  font-size: 14px;
}

.items {
  list-style: none;
  max-height: 360px;
  overflow-y: auto;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.2s;
}

.item:hover {
  background: #f9fafb;
}

.item.done .item-name {
  text-decoration: line-through;
  color: #9ca3af;
}

.checkbox-wrap {
  position: relative;
  cursor: pointer;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

.checkbox-wrap input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  inset: 0;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  transition: all 0.2s;
}

.checkbox-wrap input:checked ~ .checkmark {
  background: #43e97b;
  border-color: #43e97b;
}

.checkbox-wrap input:checked ~ .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.item-name {
  flex: 1;
  font-size: 15px;
  color: #1f2937;
}

.btn-del {
  padding: 4px 10px;
  background: transparent;
  border: 1px solid #fca5a5;
  color: #ef4444;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-del:hover {
  background: #ef4444;
  color: white;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  font-size: 13px;
  color: #6b7280;
}

.btn-clear {
  padding: 6px 12px;
  background: #fef3c7;
  color: #92400e;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.btn-clear:hover {
  background: #fde68a;
}
</style>