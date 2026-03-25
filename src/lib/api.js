const JSON_HEADERS = { 'Content-Type': 'application/json' }

export async function fetchSiteContent() {
  const response = await fetch('/.netlify/functions/site-content', {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Não foi possível carregar o conteúdo online.')
  }

  return response.json()
}

export async function saveSiteContent(content) {
  const response = await fetch('/.netlify/functions/save-content', {
    method: 'POST',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify({ content }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data?.error || 'Não foi possível salvar o conteúdo online.')
  }

  return data
}

export async function getAdminSession() {
  const response = await fetch('/.netlify/functions/admin-session', {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Não foi possível verificar a sessão do admin.')
  }

  return response.json()
}

export async function loginAdmin(password) {
  const response = await fetch('/.netlify/functions/admin-session', {
    method: 'POST',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify({ password }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data?.error || 'Não foi possível entrar no painel.')
  }

  return data
}

export async function logoutAdmin() {
  const response = await fetch('/.netlify/functions/admin-session', {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Não foi possível encerrar a sessão.')
  }

  return true
}

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/.netlify/functions/upload-image', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data?.error || 'Não foi possível enviar a imagem.')
  }

  return data
}
