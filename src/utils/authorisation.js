const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(response) {
  return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.statusText}`)
}

function register(userData) {
  return (
    fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        return checkResponse(response)
      })
  )
}

function authorize(userData) {
  return (
    fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        return checkResponse(response)
      })
  )
}

function getEmail(token) {
  return (
    fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => {
        return checkResponse(response)
      })
  )
}

export { BASE_URL, register, authorize, getEmail };
