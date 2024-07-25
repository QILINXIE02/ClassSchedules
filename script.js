document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendarSection = document.getElementById('calendar-section');
    var eventsSection = document.getElementById('events-section');
    var settingsSection = document.getElementById('settings-section');
    var eventList = document.getElementById('event-list');

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
                var event = calendarApi.addEvent({
                    title: title,
                    start: info.dateStr,
                    allDay: true
                });

                addEventToList(event);
            }
        },
        eventClick: function(info) {
            if (confirm('Are you sure you want to delete this event?')) {
                info.event.remove();
                removeEventFromList(info.event);
            }
        }
    });

    calendar.render();
    showSection('calendar'); // Initialize by showing the calendar section

    // Add event listeners for sidebar navigation
    document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1); // remove the #
            showSection(sectionId);
        });
    });

    function showSection(sectionId) {
        // Hide all sections
        calendarSection.classList.remove('active');
        eventsSection.classList.remove('active');
        settingsSection.classList.remove('active');

        // Construct the ID for the selected section
        const sectionElement = document.getElementById(sectionId + '-section');

        if (sectionElement) {
            sectionElement.classList.add('active');
        } else {
            console.error(`Section with ID ${sectionId}-section does not exist.`);
        }
    }

    function addEventToList(event) {
        const li = document.createElement('li');
        li.textContent = event.title + ' - ' + event.start.toLocaleDateString();
        li.dataset.eventId = event.id;
        eventList.appendChild(li);
    }

    function removeEventFromList(event) {
        const eventId = event.id;
        const eventItems = eventList.querySelectorAll('li');

        eventItems.forEach(item => {
            if (item.dataset.eventId === eventId) {
                eventList.removeChild(item);
            }
        });
    }
});
