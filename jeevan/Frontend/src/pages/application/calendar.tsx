import CommonFooter from "../../components/common-footer/commonFooter";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../routes/all_routes";
import CalendarModal from "./calendarModal";
import { Draggable } from "@fullcalendar/interaction";

// External events data
const externalEvents = [
  { id: 1, title: "Meeting", className: "calendar-event-meeting bg-soft-info", badgeClass: "badge bg-soft-info" },
  { id: 2, title: "Office", className: "calendar-event-office bg-soft-secondary", badgeClass: "badge bg-soft-secondary" },
  { id: 3, title: "Hiring", className: "calendar-event-hiring bg-soft-success", badgeClass: "badge bg-soft-success" },
  { id: 4, title: "Holiday", className: "calendar-event-holiday bg-soft-pink", badgeClass: "badge bg-soft-pink" },
  { id: 5, title: "Employee", className: "calendar-event-employee bg-soft-warning", badgeClass: "badge bg-soft-warning" },
];

// Event data interface
interface EventData {
  id?: string;
  title?: string;
  start?: string;
  className?: string;
  description?: string;
}

// Custom hook for calendar functionality
const useCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Team Meeting",
      start: "2025-07-21",
      className: "calendar-event-meeting badge bg-soft-info",
    },
    {
      id: "2",
      title: "Team Sync-up",
      start: "2025-07-19",
      className: "calendar-event-office badge bg-soft-secondary",
    },
    {
      id: "3",
      title: "Hiring for HR",
      start: "2025-07-24",
      className: "calendar-event-hiring badge bg-soft-success",
    },
    {
      id: "4",
      title: "Holiday",
      start: "2025-07-27",
      className: "calendar-event-holiday badge bg-soft-pink",
    },
  ]);

  const [show, setShow] = useState(false);
  const [eventData, setEventData] = useState<EventData>({});
  const [isEditable, setIsEditable] = useState(false);

  const createNewEvent = () => {
    // Get current date only (no time)
    const today = new Date().toISOString().split('T')[0];
    
    setEventData({
      title: "",
      start: today,
      className: "calendar-event-meeting",
    });
    setIsEditable(true);
    setShow(true);
    
    // Show the Add Event modal
    const modal = document.getElementById("add_new");
    if (modal) {
      // @ts-ignore
      const bsModal = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
      bsModal.show();
    }
  };

  const onCloseModal = () => {
    setShow(false);
    setEventData({});
    setIsEditable(false);
  };

  const onAddEvent = (eventData: EventData) => {
    // Determine badge class based on event type
    let badgeClass = "badge bg-soft-info"; // default
    if (eventData.className?.includes("calendar-event-hiring") || eventData.className?.includes("bg-soft-success")) {
      badgeClass = "badge bg-soft-success";
    } else if (eventData.className?.includes("calendar-event-office") || eventData.className?.includes("bg-soft-secondary")) {
      badgeClass = "badge bg-soft-secondary";
    } else if (eventData.className?.includes("calendar-event-holiday") || eventData.className?.includes("bg-soft-pink")) {
      badgeClass = "badge bg-soft-pink";
    } else if (eventData.className?.includes("calendar-event-employee") || eventData.className?.includes("bg-soft-warning")) {
      badgeClass = "badge bg-soft-warning";
    }
    
    const newEvent = {
      id: Date.now().toString(),
      title: eventData.title || "",
      start: eventData.start || "",
      className: `${eventData.className || "calendar-event-meeting"} ${badgeClass}`,
    };
    setEvents([...events, newEvent]);
    onCloseModal();
  };

  const onUpdateEvent = (eventData: EventData) => {
    setEvents(
      events.map((event) =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      )
    );
    onCloseModal();
  };

  const onRemoveEvent = (eventData: EventData) => {
    setEvents(events.filter((event) => event.id !== eventData.id));
    onCloseModal();
  };

  const onEventClick = (info: any) => {
    setEventData({
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      className: info.event.classNames?.includes('calendar-event-') ? 
        info.event.classNames.split(' ').find((cls: string) => cls.startsWith('calendar-event-')) : 
        "calendar-event-meeting",
    });
    setIsEditable(false);
    setShow(true);
    
    // Show the Bootstrap modal
    const modal = document.getElementById("event_modal");
    if (modal) {
      // @ts-ignore
      const bsModal = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
      bsModal.show();
    }
  };


  const onDateClick = (info: any) => {
    setEventData({
      title: "",
      start: info.dateStr,
      className: "calendar-event-meeting",
    });
    setIsEditable(true);
    setShow(true);
    
    // Show the Add Event modal
    const modal = document.getElementById("add_new");
    if (modal) {
      // @ts-ignore
      const bsModal = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
      bsModal.show();
    }
  };

  const onDrop = (info: any) => {
    const title = info.draggedEl.getAttribute('data-title') || info.draggedEl.innerText;
    
    // Find the className that starts with 'calendar-event-' to determine the color
    const className = info.draggedEl.className.split(' ').find((cls: string) => cls.startsWith('calendar-event-'));
    
    // Determine badge class based on event type
    let badgeClass = "badge bg-soft-info"; // default
    if (className?.includes("calendar-event-hiring")) {
      badgeClass = "badge bg-soft-success";
    } else if (className?.includes("calendar-event-office")) {
      badgeClass = "badge bg-soft-secondary";
    } else if (className?.includes("calendar-event-holiday")) {
      badgeClass = "badge bg-soft-pink";
    } else if (className?.includes("calendar-event-employee")) {
      badgeClass = "badge bg-soft-warning";
    }
    
    const newEvent = {
      id: Date.now().toString(),
      title: title,
      start: info.dateStr,
      className: `${className || "calendar-event-meeting"} ${badgeClass}`,
    };
    setEvents([...events, newEvent]);
  };

  const onEventDrop = (info: any) => {
    setEvents(
      events.map((event) =>
        event.id === info.event.id
          ? { ...event, start: info.event.startStr }
          : event
      )
    );
  };

  return {
    events,
    show,
    eventData,
    isEditable,
    createNewEvent,
    onCloseModal,
    onAddEvent,
    onUpdateEvent,
    onRemoveEvent,
    onEventClick,
    onDateClick,
    onDrop,
    onEventDrop,
  };
};

const Calendar = () => {
  const {
    createNewEvent,
    eventData,
    events,
    isEditable,
    onAddEvent,
    onCloseModal,
    onDateClick,
    onDrop,
    onEventClick,
    onEventDrop,
    onRemoveEvent,
  } = useCalendar();

  const calendarRef = useRef(null);
  const externalEventsEle = useRef<HTMLDivElement | null>(null);
  const draggableInstance = useRef<Draggable | null>(null);

  const handleAddEvent = (eventTitle: string) => {
    if (eventTitle.trim()) {
      // Determine badge class based on event type
      let badgeClass = "badge bg-soft-info"; // default
      if (eventData.className?.includes("calendar-event-hiring") || eventData.className?.includes("bg-soft-success")) {
        badgeClass = "badge bg-soft-success";
      } else if (eventData.className?.includes("calendar-event-office") || eventData.className?.includes("bg-soft-secondary")) {
        badgeClass = "badge bg-soft-secondary";
      } else if (eventData.className?.includes("calendar-event-holiday") || eventData.className?.includes("bg-soft-pink")) {
        badgeClass = "badge bg-soft-pink";
      } else if (eventData.className?.includes("calendar-event-employee") || eventData.className?.includes("bg-soft-warning")) {
        badgeClass = "badge bg-soft-warning";
      }
      
      const newEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventData.start || "",
        className: `${eventData.className || "calendar-event-meeting"} ${badgeClass}`,
      };
      
      // Add the event using the hook function
      onAddEvent(newEvent);
      
      // Close the modal using Bootstrap hide
      const modal = document.getElementById("add_new");
      if (modal) {
        // @ts-ignore
        const bsModal = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
        bsModal.hide();
        
        // Remove backdrop manually if needed
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        
        // Remove modal-open class from body
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    }
  };

  const handleCancelAdd = () => {
    // Close the modal using Bootstrap hide
    const modal = document.getElementById("add_new");
    if (modal) {
      // @ts-ignore
      const bsModal = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
      bsModal.hide();
      
      // Remove backdrop manually if needed
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      
      // Remove modal-open class from body
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    // Reset form using the hook function
    onCloseModal();
  };

  useEffect(() => {
    if (externalEventsEle.current) {
      draggableInstance.current = new Draggable(externalEventsEle.current, {
        itemSelector: '.external-event',
        eventData: function (eventEl: any) {
          return {
            title: eventEl.getAttribute('data-title') || eventEl.innerText,
            classNames: eventEl.getAttribute('data-class'),
            // Use the className for styling instead of data-color
            className: eventEl.className.split(' ').find((cls: string) => cls.startsWith('calendar-event-')),
          }
        },
      })
    }

    return () => {
      if (draggableInstance.current) {
        draggableInstance.current.destroy()
      }
    }
  }, []);

  // Fix accessibility issues for FullCalendar elements
  useEffect(() => {
    const fixCalendarAccessibility = () => {
      // Add aria-labels to all role="img" elements in FullCalendar
      const roleImgElements = document.querySelectorAll('[role="img"]');
      roleImgElements.forEach((element) => {
        if (!element.getAttribute('aria-label')) {
          if (element.classList.contains('fc-icon-chevron-left')) {
            element.setAttribute('aria-label', 'Previous month');
          } else if (element.classList.contains('fc-icon-chevron-right')) {
            element.setAttribute('aria-label', 'Next month');
          } else if (element.classList.contains('fc-icon-chevron-up')) {
            element.setAttribute('aria-label', 'Previous week');
          } else if (element.classList.contains('fc-icon-chevron-down')) {
            element.setAttribute('aria-label', 'Next week');
          }
        }
      });

      // Add aria-labels to navigation buttons
      const prevButton = document.querySelector('.fc-prev-button');
      const nextButton = document.querySelector('.fc-next-button');
      const todayButton = document.querySelector('.fc-today-button');
      
      if (prevButton && !prevButton.getAttribute('aria-label')) {
        prevButton.setAttribute('aria-label', 'Previous month');
      }
      
      if (nextButton && !nextButton.getAttribute('aria-label')) {
        nextButton.setAttribute('aria-label', 'Next month');
      }
      
      if (todayButton && !todayButton.getAttribute('aria-label')) {
        todayButton.setAttribute('aria-label', 'Go to today');
      }
    };

    // Run after component mounts and after a short delay to ensure FullCalendar is rendered
    const timer = setTimeout(fixCalendarAccessibility, 100);
    
    // Also run when the calendar view changes
    const calendarElement = document.getElementById('calendar');
    if (calendarElement) {
      const observer = new MutationObserver(fixCalendarAccessibility);
      observer.observe(calendarElement, { childList: true, subtree: true });
      
      return () => {
        clearTimeout(timer);
        observer.disconnect();
      };
    }
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ========================
              Start Page Content
          ========================= */}
      <div className="page-wrapper">
        {/* Start Content */}
        <div className="content">
          {/* Page Header */}
          <div className="d-flex align-items-center justify-content-between gap-2 mb-4 flex-wrap">
            <div className="breadcrumb-arrow">
              <h4 className="mb-1">Calendar</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Applications</Link>
                  </li>
                  <li className="breadcrumb-item active">Calendar</li>
                </ol>
              </div>
          </div>
          </div>
          {/* End Page Header */}
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-3 col-lg-4 d-flex">
                  <div className="flex-fill">
                    <div className="card">
                      <div className="card-body">
                        <div>
                          <button
                            className="btn btn-primary btn-lg w-100 mb-3"
                            onClick={createNewEvent}
                          >
                            <i className="ti ti-square-rounded-plus me-1" />
                            Create Event{" "}
                          </button>
                          <div
                            className="accordion accordion-flush custom-accordion calendar-accordion"
                            id="accordionFlushExample"
                          >
                            <div className="accordion-item">
                              <h2 className="accordion-header mb-0">
                                <button
                                  className="accordion-button fw-semibold p-0"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseOne"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseOne"
                                >
                                  Events
                                </button>
                              </h2>
                              <div
                                id="flush-collapseOne"
                                className="accordion-collapse collapse show"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div ref={externalEventsEle}>
                                  <div className="d-flex flex-column mt-3">
                                    {externalEvents.map((event) => (
                                      <div
                                        key={event.id}
                                        className={`external-event fc-event text-body border rounded border-light fw-medium d-flex align-items-center p-2 calendar-external-event ${event.className} ${event.badgeClass}`}
                                        data-class=" text-body border rounded border-light fw-medium"
                                        data-title={event.title}
                                      >
                                        <div className="me-2 calendar-event-circle" />
                                        <span className="calendar-event-text">
                                          {event.title}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 d-flex">
                  <div id="calendar" className="flex-fill">
                    <FullCalendar
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                      ]}
                      initialView="dayGridMonth"
                      headerToolbar={{
                        start: "today,prev,next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay",
                      }}
                      buttonText={{
                        today: "Today",
                        prev: "‹",
                        next: "›",
                        month: "Month",
                        week: "Week",
                        day: "Day"
                      }}
                      slotMinTime="06:00:00"
                      slotMaxTime="22:00:00"
                      slotDuration="00:30:00"
                      slotLabelInterval="01:00:00"
                      allDaySlot={true}
                      eventClick={onEventClick}
                      dateClick={onDateClick}
                      drop={onDrop}
                      eventDrop={onEventDrop}
                      ref={calendarRef}
                      events={events}
                      editable={true}
                      selectable={true}
                      droppable={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Content */}
        {/* Start Footer */}
        <CommonFooter />
        {/* End Footer */}
      </div>
      {/* ========================
              End Page Content
          ========================= */}
      <CalendarModal 
        eventDetails={{
          title: eventData.title || "",
          description: eventData.description || "",
          date: eventData.start || "",
        }}
        onDelete={() => {
          onRemoveEvent(eventData);
          // Close the modal after deleting
          const modal = document.getElementById("event_modal");
          if (modal) {
            // @ts-ignore
            const bsModal = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
            bsModal.hide();
            
            // Remove backdrop manually if needed
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            }
            
            // Remove modal-open class from body
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
          }
        }}
        onClose={() => {
          onCloseModal();
          // Close the modal
          const modal = document.getElementById("event_modal");
          if (modal) {
            // @ts-ignore
            const bsModal = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
            bsModal.hide();
            
            // Remove backdrop manually if needed
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            }
            
            // Remove modal-open class from body
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
          }
        }}
        onAddEvent={handleAddEvent}
        onCancelAdd={handleCancelAdd}
        isAddMode={isEditable}
      />
    </>
  );
};

export default Calendar;
