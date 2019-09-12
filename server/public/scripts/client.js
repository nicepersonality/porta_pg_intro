$(document).ready(onReady);

function onReady() {
    getMusicData();
    $('#add').on('click', postMusicData);
}

// get artist data from the server
function getMusicData() {
    $("#musicTableBody").empty();
    $.ajax({
        type: 'GET',
        url: '/musicLibrary'
    }).then(function (response) {
        console.log("skjfhsd", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#musicTableBody').append(`
                <tr data-id="${response[i].id}">
                    <td>${response[i].artist}</td>
                    <td>${response[i].track}</td>
                    <td>${response[i].rank}</td>
                    <td>${response[i].published.substring(0,4)}</td>
                    <td><button class="deleteThis">🙅‍</button>&nbsp;<button class="increase" data-direction="increase">👍</button>&nbsp;<button class="decrease" data-direction="decrease">👎</button></td>
                </tr>
            `);
        }
        $('.deleteThis').on('click', deleteBtn);
        $('.increase').on('click', modifyRank);
        $('.decrease').on('click', modifyRank);
    });
}

function deleteBtn() {
    let songId = $(this).parent().parent().data('id');
    console.log('clicky deletey', songId);
    $.ajax({
        type: 'DELETE',
        url: `/musicLibrary/${songId}`
    }).then( function(response) {
        console.log('response from server:', response);
        getMusicData();
    }).catch( function(error) {
        console.log('error from server:', error);
    });
} // end deleteButton

function modifyRank() {
    let thumb = $(this).text();
    let dir = '';
    if (thumb === '👍') { dir = 'increase'; }
    if (thumb === '👎') { dir = 'decrease'; }
    let payloadObject = {
        direction: dir
    }
    let songId = $(this).parent().parent().data('id');
    console.log('modify rank of', songId, payloadObject.direction);  
    $.ajax({
        type: 'PUT',
        url: `musicLibrary/rank/${songId}`,
        data: payloadObject
    }).then( function(response) {
        console.log(response);
        getMusicData();
    }).catch( function(error){
        alert(`error on changing rank: ${error}`);
    });
} // end modifyRank

function postMusicData() {
    let payloadObject = {
        artist: $('#artist').val(),
        track: $('#track').val(),
        rank: $('#rank').val(),
        published: $('#published').val()
    }
    $.ajax({
        type: 'POST',
        url: '/musicLibrary',
        data: payloadObject
    }).then( function (response) {
        $('#artist').val(''),
        $('#track').val(''),
        $('#rank').val(''),
        $('#published').val('')
        getMusicData();
    });
}