let sharedState = globalThis.__LECTOR_QR_SHARED_STATE__

if (!sharedState) {
  sharedState = globalThis.__LECTOR_QR_SHARED_STATE__ = {
    value: '',
    updatedAt: '',
  }
}

const ROOM_NAME = 'lector-principal'

module.exports = async function handler(request, response) {
  const sendJson = (statusCode, payload) => {
    response.statusCode = statusCode
    response.setHeader('Content-Type', 'application/json')
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey, x-client-info')
    response.end(JSON.stringify(payload))
  }

  if (request.method === 'OPTIONS') {
    response.statusCode = 204
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey, x-client-info')
    response.end()
    return
  }

  try {
    if (request.method === 'GET') {
      sendJson(200, {
        value: sharedState.value,
        updatedAt: sharedState.updatedAt,
        room: ROOM_NAME,
      })
      return
    }

    if (request.method === 'POST') {
      const body = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body || {})
      const value = typeof body.value === 'string' ? body.value.trim() : ''

      if (!value) {
        sendJson(400, { error: 'Missing value' })
        return
      }

      sharedState.value = value
      sharedState.updatedAt = new Date().toISOString()

      sendJson(200, {
        ok: true,
        value: sharedState.value,
        updatedAt: sharedState.updatedAt,
        room: ROOM_NAME,
      })
      return
    }

    sendJson(405, { error: 'Method not allowed' })
  } catch (error) {
    sendJson(500, { error: error.message || 'Internal error' })
  }
}
