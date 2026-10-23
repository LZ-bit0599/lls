import { ref } from 'vue'

const TOKEN_KEY = 'library_token'
const USER_KEY = 'library_user'

export const isLoggedIn = ref(!!localStorage.getItem(TOKEN_KEY))
export const currentUser = ref(JSON.parse(localStorage.getItem(USER_KEY) || 'null'))

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) {
        const user = { username, loginAt: Date.now() }
        localStorage.setItem(TOKEN_KEY, 'mock_token_' + Date.now())
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        isLoggedIn.value = true
        currentUser.value = user
        resolve(user)
      } else {
        reject(new Error('用户名或密码不能为空'))
      }
    }, 300)
  })
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  isLoggedIn.value = false
  currentUser.value = null
}