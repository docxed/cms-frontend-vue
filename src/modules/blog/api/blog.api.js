export default function useBlogAPI() {
  const create = async (payload) => {
    const res = await $http.post('/blog', payload)
    return res.data
  }
  const getAll = async (params) => {
    const res = await $http.get('/blog', { params })
    return res.data
  }
  const update = async (id, payload) => {
    const res = await $http.put(`/blog/${id}`, payload)
    return res.data
  }
  const remove = async (id) => {
    const res = await $http.delete(`/blog/${id}`)
    return res.data
  }

  return { create, getAll, update, remove }
}
