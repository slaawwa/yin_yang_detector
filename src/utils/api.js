
const BASE_URL = '/yin_yang_detector/'

const callApi = async (url = '', opts = {}) => {
  const r = await fetch(`${BASE_URL}${url}`, {
    ...opts,
  })
  return await r.json()
}

const api = {
  version: async () => {
    const r = await callApi('/api.json')
    return r?.version ? `v${r.version}` : 'N/A'
  }
}

export default api