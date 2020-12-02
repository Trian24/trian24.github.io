import * as pushn from './pushnotif.js'
register()

function register () {
  registerSW().then(subcsribePush)
}

// REGISTER SERVICE WORKER
function registerSW () {
  return new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js')
          .then(function () {
            const msg = console.log('Pendaftaran ServiceWorker berhasil')
            console.log(msg)
            resolve(msg)
          })
          .catch(function () {
            const msg = console.log('Pendaftaran ServiceWorker gagal')
            console.log(msg)
            reject(msg)
          })
      })
    } else {
      const msg = ('ServiceWorker belum didukung browser ini.')
      console.log(msg)
      reject(msg)
    }
  })
}

function subcsribePush (msg) {
  console.log(`subscribe: ${msg}`)
  // Push Notif
  if (('PushManager' in window)) {
    navigator.serviceWorker.getRegistration().then(function (registration) {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: pushn.urlBase64ToUint8Array('BDVQXucoWTtu3bs2qQL4gWAdjh6czU8bBYvJiwVmtHhAzCVHsDL1IYbdCKhOCHloiylqMPrfE6jbdzQDHd8aRkg')
      }).then(pushn.subscribe).catch(function (e) {
        console.error('Tidak dapat melakukan subscribe ', e.message)
      })
    })
  }
}
