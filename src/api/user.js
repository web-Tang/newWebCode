import axios from 'axios'
const debug = process.env.NODE_ENV == 'production'
//登陆
export function login(FormData) {
  const url = debug ? 'http://47.112.***.***:80/api/user/login' : 'http://localhost:8000/api/user/login'
  const p = new Promise(
    (resolve, reject) => {
      axios.post(url, FormData).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.error(err)
      })
    }
  )

  return p
}
//注册
export function signup(FormData) {
  const url = debug ? 'http://47.112.***.***:80/api/user/signup' : 'http://localhost:8000/api/user/signup'
  const p = new Promise(
    (resolve, reject) => {
      axios.post(url, FormData).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.error(err)
      })
    }
  )

  return p
}

//检验登陆状态
export function getSession() {
  const url = debug ? 'http://47.112.***.***:80/api/user/getSession' : 'http://localhost:8000/api/user/getSession'
  const p = new Promise(
    (resolve, reject) => {
      axios.get(url).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.error(err)
      })
    }
  )

  return p
}

//退出登陆
export function logOut() {
  const url = debug ? 'http://47.112.***.***:80/api/user/logout' : 'http://localhost:8000/api/user/logout'
  const p = new Promise(
    (resolve, reject) => {
      axios.post(url).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.error(err)
      })
    }
  )

  return p
}
//更新头像
export function upavatar(param) {
  const url = debug ? 'http://47.112.***.***:80/api/user/updata/avatar' : 'http://localhost:8000/api/user/updata/avatar'
  const p = new Promise(
    (resolve, reject) => {
      axios.post(url, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.error(err)
      })
    }
  )

  return p
}

export function upname(param) {
  const url = debug ? 'http://47.112.***.***:80/api/user/updata/name' : 'http://localhost:8000/api/user/updata/name'
  const p = new Promise(
    (resolve, reject) => {
      axios.post(url, param, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.error(err)
      })
    }
  )

  return p
}
