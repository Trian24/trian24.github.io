/* eslint-disable no-undef */
console.log('db.js loaded')

const dbPromised = idb.open('football-app', 1, function (upgradeDb) {
  const teamObjectStore = upgradeDb.createObjectStore('teams', {
    keyPath: 'id'
  })
  teamObjectStore.createIndex('team_name', 'team_name', { unique: false })
})

export function saveForLater (team) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction('teams', 'readwrite')
      const store = tx.objectStore('teams')
      console.log(team)
      store.put(team)
      return tx.complete
    })
    .then(function () {
      console.log('Tim berhasil di simpan.')
    })
}

export function deleteSaved (item) {
  dbPromised.then(function (db) {
    const tx = db.transaction('teams', 'readwrite')
    const store = tx.objectStore('teams')
    store.delete(parseInt(item))
    return tx.complete
  }).then(function () {
    console.log('Item deleted')
  })
}

export function getAll () {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction('teams', 'readonly')
        const store = tx.objectStore('teams')
        return store.getAll()
      })
      .then(function (teams) {
        resolve(teams)
      })
      .catch((error) => { console.log('Error : ' + error) })
  })
}

export function getById (id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        console.log('mencari di idb id: ' + id)
        const tx = db.transaction('teams', 'readonly')
        const store = tx.objectStore('teams')
        return store.get(parseInt(id))
      })
      .then(function (team) {
        resolve(team)
      })
  })
}
