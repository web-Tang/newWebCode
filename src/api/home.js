import axios from 'axios'
const debug = process.env.NODE_ENV == 'production'

export function get(num) {
  const url = debug ? 'http://47.112.***.***:80/api/article/list' : 'http://localhost:8000/api/article/list'
  const data = Object.assign({}, {
    num
  })
  const p = new Promise(
    (resolve, reject) => {
      axios.get(url, {
        params: data
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.error(err)
      })
    }
  )

  return p
}

export function getdetail(id) {
  const url = debug ? 'http://47.112.***.***:80/api/article/detail' : 'http://localhost:8000/api/article/detail'
  const data = Object.assign({}, {
    id
  })
  const p = new Promise(
    (resolve, reject) => {
      axios.get(url, {
        params: data
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.error(err)
      })
    }
  )

  return p
}

export function getbaners() {
  const url = debug ? 'http://47.112.***.***:80/api/file/banerslist' : 'http://localhost:8000/api/file/banerslist'
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
