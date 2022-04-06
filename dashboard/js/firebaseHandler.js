import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'

const firebaseConfig = {
    apiKey: 'AIzaSyBFUU5HOzaTYr1kcfhwlt52Ad4qbUFMGA4',
    authDomain: 'indoor-location-85a5b.firebaseapp.com',
    projectId: 'indoor-location-85a5b',
    storageBucket: 'indoor-location-85a5b.appspot.com',
    messagingSenderId: '1017883031276',
    appId: '1:1017883031276:web:5163342056d0ee318dd7c9',
    measurementId: 'G-CD3EE81L1H',
}
const firebase = initializeApp(firebaseConfig)
const auth = getAuth()
const globalUser = 'diego'
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('USER', user)
        console.log(user.uid)
        $('#user-email').text(user.email)
    } else {
        console.log('NO USER')
        window.location = '../login/login.html'
    }
})

$('#sign-out').click(function () {
    signOut(auth)
        .then(() => {
            console.log('USER OUT')
            window.location = '../login/login.html'
        })
        .catch((error) => {
            console.log('USER IN')
            // An error happened.
        })
})
