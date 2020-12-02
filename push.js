const webPush = require('web-push')

const vapidKeys = {
  publicKey: 'BDVQXucoWTtu3bs2qQL4gWAdjh6czU8bBYvJiwVmtHhAzCVHsDL1IYbdCKhOCHloiylqMPrfE6jbdzQDHd8aRkg',
  privateKey: 'E734hhtk9GtCu-me5mgRWR3bCk5rxH64508fvMXMsTY'
}

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/cq5SM_Aw1lA:APA91bHSPmfoPPr8T9L3rBu7ob6RrK55Nl-nrzTU5_R5pcThSEM66C_jkBSDsdJbLp4j5A8r4LZNPJH0m4fuovl5wXowMMjIgXpmh1BsPlz9682GS5Yce7S-jtajK6JAIEJrSy_LDCbO',
  keys: {
    p256dh: 'BJiK8RasWw4Or+zf3v3vStbCrtLDK5egOQWzx2IwVy0Pv8PqHzHzXyjdai0876yrxqtWTjtLpxspdwB3+amnn0M=',
    auth: 'lHuK8tbsnojg6nKEjhxEog=='
  }
}
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!'

const options = {
  gcmAPIKey: '72718609554',
  TTL: 60
}
webPush.sendNotification(
  pushSubscription,
  payload,
  options
)
