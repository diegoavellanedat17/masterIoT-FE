$("body").submit(function(e) {
    e.preventDefault();
});
const firebaseConfig = {
    apiKey: 'AIzaSyBFUU5HOzaTYr1kcfhwlt52Ad4qbUFMGA4',
    authDomain: 'indoor-location-85a5b.firebaseapp.com',
    projectId: 'indoor-location-85a5b',
    storageBucket: 'indoor-location-85a5b.appspot.com',
    messagingSenderId: '1017883031276',
    appId: '1:1017883031276:web:5163342056d0ee318dd7c9',
    measurementId: 'G-CD3EE81L1H',
}
// initialize empty
$('#main-dashboard').empty()
firebase.initializeApp(firebaseConfig)
db = firebase.firestore()
let type = 'dashboard'
function getUserData() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            const userData = {
                uid: user.uid,
                email: user.email,
                name: user.displayName,
            }
            resolve(userData)
        })
    })
}

function searchStations(userData) {
    db.collection('user_stations')
        .where('user_uid', '==', userData.uid)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                $('#main-dashboard').empty()
                $('#main-dashboard').append(`                        
                <h1 class="h3 mb-0 text-gray-800">Not stations related to this user</h1>`)

                console.log('Not stations related to this user')
            }
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, ' => ', doc.data())
                const userStations = doc.data().stations
                console.log(userStations)
                renderStationsInfo(userStations)
            })
        })
        .catch((error) => {
            console.log('Error getting documents: ', error)
        })
}

function renderStationsInfo(stations) {
    $('#main-dashboard').empty()
    stations.forEach((station) => {
        db.collection('stations')
            .where('name', '==', station)
            .onSnapshot(function (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    const station = doc.data().name
                    const status = doc.data().status

                    let borderColor = 'border-left-secondary'
                    if (status == 'on') {
                        borderColor = 'border-left-success'
                    }
                    if (!$(`#${station}`).length) {
                        $('#main-dashboard').append(`                        
                    <div class="col-xl-3 col-md-6 mb-4" id="${station}" >
                        <div class="card ${borderColor} shadow h-100 py-2" id="${station}-border">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            ${station}</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-uppercase" id="${station}-status-text">${status}</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`)
                    } else {
                        $(`#${station}-border`).removeClass('border-left-secondary border-left-success')
                        $(`#${station}-status-text`).text(status)
                        $(`#${station}-border`).addClass(borderColor)
                    }
                })
            })
    })
}

$('#floor-plane').click(function () {
    $('#main-dashboard').empty()

    $('#main-dashboard').append(`                        
    <div class="col-xl-12 col-md-12 mb-4">
        <div class="card floorplan-background shadow">
        </div>
    </div>`)

    $('.floorplan-background').css('background-image', 'url(../dashboard/img/floorplane.png)')
})

$('#tables').click(function () {
    $('#main-dashboard').empty()
    // render de table
    $('#main-dashboard').append(`
    <div class=" mb-4 col-12">
        <div class="row">
            <div class="col-4"">
                <div class=" tags-info" >
                    <p >TAG1</p>
                    <p id="tag1"></p>
                </div>
            </div>
            <div class=" col-4" >
                <div class=" tags-info">
                    <p>TAG2</p>
                    <p id="tag2"></p>
                </div>
            </div>
            <div class=" col-4" >
                <div class=" tags-info" >
                    <p>TAG3</p>
                    <p id="tag3"></p>
                </div>
            </div>
        </div>
    </div>
    <div class="card shadow mb-4 col-4 ">
        <div class=" col-12  justify-content-center mt-3 mb-3">
            <img src = "../dashboard/img/plano.svg" alt="My Happy SVG"/>
        </div>
    </div>
    <div class="card shadow mb-4 col-8">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Tags History Location</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Tag Name</th>
                                <th>Location Coordinates</th>
                                <th>Time</th>

                            </tr>
                        </thead>

                        <tbody class="table-body"></tbody>
                    </table>
                </div>
            </div>
    </div>
    `)

    getUserData()
        .then((userData) => {
            searchTags(userData)
        })
        .catch((error) => {
            console.error(error)
        })
})

function searchTags(userData) {
    db.collection('user_stations')
        .where('user_uid', '==', userData.uid)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                $('#main-dashboard').empty()
                $('#main-dashboard').append(`                        
                <h1 class="h3 mb-0 text-gray-800">Not Tags related to this user</h1>`)
            }
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, ' => ', doc.data())
                const userTags = doc.data().tags
                renderTags(userTags)
            })
        })
        .catch((error) => {
            console.log('Error getting documents: ', error)
        })
}

function renderTags(userTags) {
    console.log(userTags)
    userTags.forEach((tag) => {
        console.log(tag)
        
        db.collection('tag_location')
            .where('name', '==', tag)
            .orderBy('time', 'desc')
            .limit(5)
            .onSnapshot(function (querySnapshot) {
                let firstFlag = false;
                $(`.${tag}`).remove()
                querySnapshot.forEach((doc) => {
                    
                    const tag = doc.data()
                    if (!firstFlag){
                        $(`#${tag.name}`).empty()
                        $(`#${tag.name}`).append(`${tag.coordinates}`)
                        
                        firstFlag = true;
                    }
                    const timestamp = tag.time.seconds
                    let formatedDate = formatDate(timestamp)
                    console.log(formatedDate)
                    $('.table-body').append(`
                    <tr class = "${tag.name}">
                    <th class="text-uppercase ">${tag.name}</th>
                    <th>${tag.coordinates}</th>
                    <th>${formatedDate}</th>
                </tr>`)
                
                })
            })
    })
}

getUserData()
    .then((userData) => {
        searchStations(userData)
    })
    .catch((error) => {
        console.error(error)
    })

function formatDate(timestamp) {
    const  month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(timestamp * 1000)
    let dataMinutes = date.getMinutes().toString()
    let dataHours= date.getHours().toString()
    let dataSeconds= date.getSeconds().toString()
    if (dataMinutes.toString().length == 1) {
        dataMinutes = "0" + dataMinutes;
    }
    if (dataHours.toString().length == 1) {
        dataHours = "0" + dataHours;
    }
    if (dataSeconds.toString().length == 1) {
        dataSeconds = "0" + dataSeconds;
    }

    const dateValues =
        // date.getFullYear().toString() +
        // '/' +
        month[date.getMonth()] +
        ' ' +
        date.getDate().toString() +
        ' ---- ' +
        dataHours.toString() +
        ':' +
        dataMinutes +
        ':' +
        dataSeconds.toString()
    return dateValues
}
