import $ from 'jquery'
import "../../../node_modules/materialize-css/dist/js/materialize"

const init = {
  init_all(){
    $(document).ready(()=>{
      $('.button-collapse').sideNav({
        menuWidth: 200, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });

      $('.modal').modal();
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'OK',
        container:undefined,
        closeOnSelect: false // Close upon selecting a date,
      });
      $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        container:undefined,
        ampmclickable: true, // make AM PM clickabletrue
        aftershow: function(){} //Function for after opening timepicker
      });
      $('.materialboxed').materialbox();
    })
  }
}

export default init
