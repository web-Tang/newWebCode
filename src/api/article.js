import axios from 'axios'
const debug = process.env.NODE_ENV == 'production'

export function get (lei,num) {
  const url = debug ? 'http://47.112.***.***:80/api/article/list' : 'http://localhost:8000/api/article/list'
  const data = Object.assign({}, {
    lei,
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

export function getdetail (id) {
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

export function getcomments (id) {
  const url = debug ? 'http://47.112.***.***:80/api/article/comments' : 'http://localhost:8000/api/article/comments'
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

export function postcomments (comments) {
  const url = debug ? 'http://47.112.***.***:80/api/article/postcomments' : 'http://localhost:8000/api/article/postcomments'
  const p = new Promise(
    (resolve, reject) => {
      axios.post(url, comments).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.error(err)
      })
    }
  )

  return p
}

export function addhit (id, num) {
  const url = debug ? 'http://47.112.***.***:80/api/article/addhit' : 'http://localhost:8000/api/article/addhit'
  // console.log(id, num)
  const data = Object.assign({}, {
    id,
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

export function addgood (id, idstr, num) {
  const url = debug ? 'http://47.112.***.***:80/api/article/addgood' : 'http://localhost:8000/api/article/addgood'
  // console.log(id, num)
  const data = Object.assign({}, {
    id,
    idstr,
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

export function addlike (id, idstr, num) {
  const url = debug ? 'http://47.112.***.***:80/api/article/addlike' : 'http://localhost:8000/api/article/addlike'
  // console.log(id, num)
  const data = Object.assign({}, {
    id,
    idstr,
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

export function subgood (id, idstr, num) {
  const url = debug ? 'http://47.112.***.***:80/api/article/subgood' : 'http://localhost:8000/api/article/subgood'
  // console.log(id, num)
  const data = Object.assign({}, {
    id,
    idstr,
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

export function sublike (id, idstr, num) {
  const url = debug ? 'http://47.112.***.***:80/api/article/sublike' : 'http://localhost:8000/api/article/sublike'
  // console.log(id, num)
  const data = Object.assign({}, {
    id,
    idstr,
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

