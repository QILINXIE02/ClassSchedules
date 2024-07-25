document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      editable: true,
      headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      dateClick: function(info) {
          var title = prompt('Enter Event Title:');
          var calendarApi = info.view.calendar;

          calendarApi.unselect(); // clear date selection

          if (title) {
              calendarApi.addEvent({
                  title: title,
                  start: info.dateStr,
                  allDay: true
              });
          }
      },
      eventClick: function(info) {
          if (confirm('Are you sure you want to delete this event?')) {
              info.event.remove();
          }
      }
  });

  calendar.render();
});
