export function Start () {
  console.log('Loading starting')
  const loading = document.getElementById('loading-container')
  loading.style.display = 'flex'
}

export function Stop () {
  console.log('Loading finished')
  const loading = document.getElementById('loading-container')
  loading.style.display = 'none'
}
