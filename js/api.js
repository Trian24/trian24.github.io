/* eslint-disable camelcase */
import * as addHTML from './addhtml.js'
import * as db from './db.js'
import * as loading from './loading.js'

const base_url = 'https://api.football-data.org/v2/'
const api_key = '1ff68d3cf51149119262508cfbfa6b9c'
const id_league = '2001'
const options = {
  method: 'GET',
  headers: {
    'X-Auth-Token': api_key
  }
}
console.log('api.js loaded')

export function getStanding () {
  if ('caches' in window) {
    caches.match(base_url + `competitions/${id_league}/standings`)
      .then(function (response) {
        if (response) {
          response.json()
            .then(addHTML.Home)
            .then(loading.Stop())
        }
      })
  }

  fetch(base_url + `competitions/${id_league}/standings`, options)
    .then(status)
    .then(json)
    .then(addHTML.Home)
    .then(loading.Stop())
    .catch(error)
}

export function getTeams () {
  if ('caches' in window) {
    caches.match(base_url + `competitions/${id_league}/standings`)
      .then(function (response) {
        if (response) {
          response.json()
            .then(addHTML.Teams)
            .then(loading.Stop())
        }
      })
  }

  fetch(base_url + `competitions/${id_league}/standings`, options)
    .then(status)
    .then(json)
    .then(addHTML.Teams)
    .then(loading.Stop())
    .catch(error)
}

export function getTeambyId () {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')
    if ('caches' in window) {
      caches.match(base_url + `teams/${idParam}`)
        .then(function (response) {
          if (response) {
            response.json().then((data) => {
              addHTML.TeamId(data)
              resolve(data)
            })
          }
        })
        .then(loading.Stop())
    }

    fetch(base_url + `teams/${idParam}`, options)
      .then(status)
      .then(json)
      .then((data) => {
        addHTML.TeamId(data)
        resolve(data)
      })
      .then(loading.Stop())
      .catch(error)
  })
}

export function getSavedTeam () {
  db.getAll()
    .then((teams) => {
      console.log(teams)
      addHTML.SavedTeams(teams)
    })
    .then(loading.Stop())
}

export function getSavedTeamById () {
  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id')
  db.getById(idParam)
    .then((data) => {
      console.log(data)
      addHTML.SavedTeamId(data)
    })
    .then(loading.Stop())
  return idParam
}

export function status (response) {
  if (response.status !== 200) {
    console.log('Error : ' + response.status)
    return Promise.reject(new Error(response.statusText))
  } else {
    console.log('Mengambil data API')
    return Promise.resolve(response)
  }
}

export function json (response) {
  console.log('Mengubah data dari bentuk Json')
  return response.json()
}

export function error (error) {
  console.log('Error : ' + error)
}
