/*!
 * October Sync
 * Copyright(c) Saifur Rahman Mohsin
 * MIT Licensed
 */

const { remote, ipcRenderer } = require('electron')
const { handleForm, closeForm } = remote.require('./setup/setup')
const currentWindow = remote.getCurrentWindow()

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
            $('#submitBtn').attr('disabled', 'disabled');
        } else {
            $('#submitBtn').removeAttr('disabled');
        }
    });
});

submitForm.addEventListener("submit", function (event) {
    event.preventDefault()
    let baseurl = document.getElementById("baseurl").value
    $('#content-confirmation').closest('.control-popup').removeClass('in').popup('setLoading', true)

    $.ajax ({
      url: baseurl,
      success: function (result) {
      }, error: function (error) {
        alert(error.statusText)
        $('#baseurl').val('')
      }, complete: function () {
        $('#content-confirmation').closest('.control-popup').popup('hideLoading')
      }
    });

    // handleForm(currentWindow, baseurl)
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