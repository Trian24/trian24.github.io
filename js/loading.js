const loading = document.getElementById('progress-bar')

export function Start () {
  console.log('Loading starting')
  loading.style.display = 'flex'
}

export function Stop () {
  console.log('Loading finished')
  loading.style.display = 'none'
}
