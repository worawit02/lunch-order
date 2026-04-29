// Service Worker — รับ Push Notification จาก Firebase Cloud Messaging
importScripts('https://cdn.jsdelivr.net/npm/firebase@10.12.2/firebase-app-compat.min.js');
importScripts('https://cdn.jsdelivr.net/npm/firebase@10.12.2/firebase-messaging-compat.min.js');

firebase.initializeApp({
  apiKey:            'AIzaSyBdF96EhRNEKvE5tYnVLxggeuXcK5q_X7Q',
  authDomain:        'lunch-order-eeb0e.firebaseapp.com',
  databaseURL:       'https://lunch-order-eeb0e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId:         'lunch-order-eeb0e',
  storageBucket:     'lunch-order-eeb0e.firebasestorage.app',
  messagingSenderId: '183169767893',
  appId:             '1:183169767893:web:3ec009512cdec2a58c455c'
});

var messaging = firebase.messaging();

// รับ push notification ขณะที่ browser ปิดหรือแอปอยู่ background
messaging.onBackgroundMessage(function(payload) {
  var title = payload.notification.title || 'Gourmet Hub';
  var body  = payload.notification.body  || 'มีออร์เดอร์ใหม่';
  self.registration.showNotification(title, {
    body:  body,
    icon:  'https://cdn.jsdelivr.net/npm/@ant-design/icons-svg@4.4.2/inline-namespaced/outlined/coffee.svg',
    badge: 'https://cdn.jsdelivr.net/npm/@ant-design/icons-svg@4.4.2/inline-namespaced/outlined/coffee.svg',
    tag:   'lunch-order',
    data:  payload.data || {}
  });
});

// คลิก notification → เปิดหน้าเว็บ
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      if (list.length > 0) { return list[0].focus(); }
      return clients.openWindow(self.location.origin + '/lunch-order/');
    })
  );
});
