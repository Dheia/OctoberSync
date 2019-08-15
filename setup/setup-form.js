/*!
 * October Sync
 * Copyright(c) Saifur Rahman Mohsin
 * MIT Licensed
 */

const { remote, ipcRenderer } = require('electron')
const { handleForm, closeForm } = remote.require('./setup/setup')
const currentWindow = remote.getCurrentWindow()
const alert = require('sweetalert')
const modal = require('./modal.js')
const popup = require('./popup.js')
const submitForm = document.getElementById("setup-form")
const preCloseBtn = document.getElementById("pre-close-btn")
const closeBtn = document.getElementById("close-btn")

$(document).ready(function() {
    $('#baseurl').keyup(function() {

        var empty = false;
        $('#baseurl').each(function() {
            if ($(this).val().length == 0) {
                empty = true;
            }
        });

        if (empty) {
            $('#submitBtn').attr('disabled', 'disabled')
        } else {
            $('#submitBtn').removeAttr('disabled')
        }
    });
});

submitForm.addEventListener("submit", function (event) {
    event.preventDefault()
    let baseUrl = document.getElementById("baseurl").value
    let apiUrl = baseUrl + '/api/v1/sync/status'
    $('#content-confirmation').closest('.control-popup').removeClass('in').popup('setLoading', true)

    $.getJSON(apiUrl, function(result) {
      console.log(result)
    }).done(function () {
      swal('Success', 'Successful configuration! Starting sync now...', 'success')
      .then(() => {
        handleForm(currentWindow, baseUrl)
      })
    }).fail(function (jqXHR, exception) {
      var msg = ''
      if (jqXHR.status === 0) {
          msg = 'Not connected.'
      } else if (jqXHR.status == 404) {
          msg = 'The requested page could not be found.'
      } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error.'
      } else if (exception === 'parsererror') {
          msg = 'Malformed response from the server.'
      } else if (exception === 'timeout') {
          msg = 'Connectivity issue occured.'
      } else if (exception === 'abort') {
          msg = 'The request has been aborted.'
      } else {
          msg = jqXHR.responseJSON.errors[0].message
      }
      swal('Error', msg, 'error')
      $('#baseurl').val('')
    }).always(function () {
        $('#content-confirmation').closest('.control-popup').popup('hideLoading')
    });
});
preCloseBtn.addEventListener("click", function (event) {
    $('#content-confirmation')
            .modal(null, this)
            .one('hide', function () {
                $this.is(':visible') && $this.focus()
            })
});
closeBtn.addEventListener("click", function (event) {
    closeForm(currentWindow)
});