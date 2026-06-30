const SUPABASE_URL = 'https://nchfongntpnbhlnmuwpr.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_bHfu1gBERonn2ATMM5nYdw_X65P0Esu'
const ROOM_NAME = 'lector-principal'

module.exports = async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.status(204).setHeader('Access-Control-Allow-Origin', '*').setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS').setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey, x-client-info').end()
    return
  }

  const room = ROOM_NAME
  const baseUrl = `${SUPABASE_URL}/rest/v1/scan_state`
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  }

  try {
    if (request.method === 'GET') {
      const url = `${baseUrl}?select=value&id=eq.${encodeURIComponent(room)}&limit=1`
      const supabaseResponse = await fetch(url, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Accept: 'application/json',
        },
      })

      const data = await supabaseResponse.json()
      response.status(supabaseResponse.ok ? 200 : supabaseResponse.status).setHeader('Access-Control-Allow-Origin', '*').json({
        value: Array.isArray(data) && data[0] ? data[0].value : '',
      })
      return
    }

    if (request.method === 'POST') {
      const body = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body || {})
      const value = typeof body.value === 'string' ? body.value.trim() : ''

      if (!value) {
        response.status(400).setHeader('Access-Control-Allow-Origin', '*').json({ error: 'Missing value' })
        return
      }

      const upsertResponse = await fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          id: room,
          value,
          updated_at: new Date().toISOString(),
        }),
      })

      const payload = await upsertResponse.json().catch(() => ({}))
      response.status(upsertResponse.ok ? 200 : upsertResponse.status).setHeader('Access-Control-Allow-Origin', '*').json(payload)
      return
    }

    response.status(405).setHeader('Access-Control-Allow-Origin', '*').json({ error: 'Method not allowed' })
  } catch (error) {
    response.status(500).setHeader('Access-Control-Allow-Origin', '*').json({ error: error.message || 'Internal error' })
  }
}
