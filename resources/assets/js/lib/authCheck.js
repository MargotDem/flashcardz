import axios from 'axios'

export function authCheck (checkIfConnected) {
  axios.get('http://localhost:3334/api/user/check')
  .then(response => {
    if (checkIfConnected) {
      if (response.data) {
        // make the menu button visible
        document.getElementById('Menu').style.visibility = 'visible'
        window.location = '#/folders'
      }
    } else {
      if (!response.data) {
        window.location = '/'
      }
    }
    return true
  })
  .catch(error => {
    console.log(error)
  })
}
