// Se crea el archivo de configuracion para realizar la autenticacion por medio de firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'

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

const formulario = document.forms['form-register']
const authForm = document.forms['form-auth']
const forgotForm = document.forms['form-forgot']

forgotForm.addEventListener('submit', olvidar_contrasena)
formulario.addEventListener('submit', createUser)
authForm.addEventListener('submit', authenticateUser)

function createUser(event) {
    event.preventDefault()
    const email = formulario['email'].value
    const password = formulario['password'].value
    const name = formulario['name'].value

    if (!email || !name || !password) {
        swal({
            title: 'Warning',
            text: 'You must fill all the fields',
            icon: 'warning',
        })
    } else {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log('user credentials ', userCredentials)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                swal({
                    title: 'Error',
                    text: error.message,
                    icon: 'warning',
                })
            })
    }
}

function authenticateUser(event) {
    event.preventDefault()
    const password = authForm['password'].value
    const username = authForm['username'].value

    const auth = getAuth()
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log('USER', user)
        })
        .catch((error) => {
            swal({
                title: 'Error',
                text: error.message,
                icon: 'warning',
            })
        })
}

function olvidar_contrasena(event) {
    var auth = firebase.auth()
    event.preventDefault()
    const email = forgotForm['email-address'].value

    auth.sendPasswordResetEmail(email)
        .then(function () {
            swal({
                title: 'Check',
                text: 'An email has been sent',
                icon: 'success',
            })
            // Email sent.
        })
        .catch(function (error) {
            alert(error)
            console.log(error)
        })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location = '../dashboard/index.html'
    }
})
// tengo un objeto mirando si hay o no autenticacion, si la hay abre lo otro
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         //window.location = 'personalDashboard.html'; //After successful login, user will be redirected to home.html
//         console.log('Usuario permitido')
//         window.location = '../client/client.html' //After successful login, user will be redirected to home.html
//     }
// })
