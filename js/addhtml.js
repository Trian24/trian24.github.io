import * as loading from './loading.js'

export function Home (data) {
  let articleHTML = ''
  articleHTML += `
        <div class="row">
            <div class="col s12">
                <h3 class="header center blue-grey-text">${data.competition.name}</h3>
            </div
            <div class="col s12">
                <h5>Season Start : ${data.season.startDate}</h5>
                <h5>Season End  : ${data.season.endDate}</h5>
            </div
        </div>
        <div class="row">
            <div class="col s12">
    `
  data.standings.forEach(function (group) {
    if (group.type === 'TOTAL') {
      articleHTML += `
                <h5>${group.group}</h5>
                <table class="responsive-table centered striped">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Team Name</th>
                            <th>Played Games</th>
                            <th>Won</th>
                            <th>Draw</th>
                            <th>Lost</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                <tbody>
            `
      group.table.forEach(function (team) {
        articleHTML += `
                    <tr>
                        <td>${team.position}</td>
                        <td>
                            <a href="./team.html?id=${team.team.id}">
                            <img class="responsive-img" style="height:48px; width:48px;" src="${team.team.crestUrl}">
                            <p>${team.team.name}</p>
                            </a>
                        </td>
                        <td>${team.playedGames}</td>
                        <td>${team.won}</td>
                        <td>${team.draw}</td>
                        <td>${team.lost}</td>
                        <td>${team.points}</td>
                    </tr>
                `
      })
      articleHTML += `
                </tbody>
                </table>
            `
    }
  })
  articleHTML += '</table></div></div>'
  document.getElementById('home').innerHTML = articleHTML
  loading.Stop()
}

export function Teams (data) {
  let html = ''
  let imgsrc
  html += `
        <h2 class="header center blue-grey-text">UEFA Champion League Teams</h2>
        <div class="row">
    `
  data.standings.forEach((group) => {
    if (group.type === 'TOTAL') {
      group.table.forEach((table) => {
        const team = table.team
        imgsrc = (team.crestUrl == null) ? './img/no-image.png' : team.crestUrl
        html += `
                <div class="col s12 m4 l3">
                    <a href="./team.html?id=${team.id}">
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${imgsrc}" alt="${team.name} Logo" style="
                                height: 200px;
                                padding: 25px 0; object-fit: contain">
                            </div>
                            <div class="card-content">
                                <span class="center truncate">${team.name}</p>
                            </div>
                        </div>
                    </a>
                </div>
                `
      })
    }
  })
  html += '</div>'
  document.getElementById('teams').innerHTML = html
  loading.Stop()
}

export function SavedTeams (data) {
  let html = ''
  let imgsrc
  html += `
        <h2 class="header center blue-grey-text">Saved Teams</h2>
        <div class="row">
    `
  data.forEach((team) => {
    imgsrc = (team.crestUrl == null) ? './img/no-image.png' : team.crestUrl
    console.log('Tim : ' + team.name + ' IMG : ' + imgsrc)
    html += `
        <div class="col s12 m4 l3">
            <a href="./team.html?id=${team.id}&saved=true">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="responsive-img" src="${imgsrc}" alt="${team.name} Logo" style="
                        height: 200px;
                        padding: 25px 0; object-fit: contain">
                    </div>
                    <div class="card-content">
                        <span class="center truncate">${team.name}</p>
                    </div>
                </div>
            </a>
        </div>
        `
  })
  html += '</div>'
  console.log(document.getElementById('savedteams'))
  document.getElementById('savedteams').innerHTML = html
  loading.Stop()
}

export function TeamId (data) {
  let html = ''
  html += `
    <div class="row">
        <div class="col s12">
            <h3 class="header center blue-grey-text">${data.name}</h3>
        </div>
        <div class="col s12 center">
            <img class="responsive-img " src="${data.crestUrl}">
        </div>
    </div>
    <div class="row">
        <div class="col s12">
        <table class="responsive-table centered striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Country Origin</th>
                </tr>
            </thead>
    `
  data.squad.forEach((players) => {
    html += `
            <tr>
                <td>${players.name}</td>
                <td>${players.position}</td>
                <td>${players.nationality}</td>
            </tr>
        `
  })
  html += '</table></div></div>'
  console.log('Page team id')
  document.getElementById('body-content').innerHTML = html
  console.log('Mengubah page team id')
  loading.Stop()
}

export function SavedTeamId (data) {
  let html = ''
  html += `
    <div class="row">
        <div class="col s12">
            <h3 class="header center blue-grey-text">${data.name}</h3>
        </div>
        <div class="col s12 center">
            <img class="responsive-img " src="${data.crestUrl}">
        </div>
    </div>
    <div class="row">
        <div class="col s12">
        <table class="responsive-table centered striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Country Origin</th>
                </tr>
            </thead>
    `
  data.squad.forEach((players) => {
    html += `
            <tr>
                <td>${players.name}</td>
                <td>${players.position}</td>
                <td>${players.nationality}</td>
            </tr>
        `
  })
  html += '</table></div></div>'
  console.log('Page team id')
  document.getElementById('body-content').innerHTML = html
  console.log('Mengubah page team id')
  loading.Stop()
}
