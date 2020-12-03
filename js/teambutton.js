import * as api from './api.js'
import * as db from './db.js'
import * as loading from './loading.js'

document.addEventListener('DOMContentLoaded', () => {
  loading.Start()
  const urlParams = new URLSearchParams(window.location.search)
  const isFromSaved = urlParams.get('saved')
  const btnSave = document.getElementById('save')

  if (isFromSaved) {
    const item = api.getSavedTeamById()
    console.log(item)
    btnSave.innerHTML = '<i class="large material-icons">delete</i>'
    btnSave.onclick = () => {
      db.deleteSaved(item)
      alert('Tim telah terhapus')
      btnSave.style.display = 'none'
    }
  } else {
    const item = api.getTeambyId()

    btnSave.onclick = function () {
      alert('Tim telah disimpan')
      console.log('Tombol FAB di klik')
      item.then(function (teams) {
        db.saveForLater(teams)
      })
    }
  }
})
