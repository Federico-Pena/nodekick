const pMessagge = document.getElementById('message')
const API_URL = 'http://localhost:1234'
const getData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/route1`)
    const data = await response.json()
    pMessagge.innerHTML = data.message
  } catch (error) {
    pMessagge.innerHTML = 'Error getting message'
  }
}
getData()
