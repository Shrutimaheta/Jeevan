
import { useState, useEffect } from "react";

interface CalendarModalProps {
  eventDetails: {
    title: string;
    description: string;
    date: string;
  };
  onDelete?: () => void;
  onClose?: () => void;
  onAddEvent?: (eventTitle: string) => void;
  onCancelAdd?: () => void;
  isAddMode?: boolean;
}

const CalendarModal = ({ 
  eventDetails, 
  onDelete, 
  onClose, 
  onAddEvent, 
  onCancelAdd, 
}: CalendarModalProps) => {
  const [eventTitle, setEventTitle] = useState("");

  // Initialize modals when component mounts
  useEffect(() => {
    // Ensure Bootstrap is available
    if (typeof window !== 'undefined' && (window as any).bootstrap) {
      const eventModal = document.getElementById("event_modal");
      const addModal = document.getElementById("add_new");
      
      if (eventModal) {
        // @ts-ignore
        new (window as any).bootstrap.Modal(eventModal);
      }
      
      if (addModal) {
        // @ts-ignore
        new (window as any).bootstrap.Modal(addModal);
      }
    }
  }, []);

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    
    // Close the modal using Bootstrap hide
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
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    
    // Close the modal using Bootstrap hide
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
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() && onAddEvent) {
      onAddEvent(eventTitle);
      setEventTitle("");
      
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
    if (onCancelAdd) {
      onCancelAdd();
    }
    setEventTitle("");
    
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
  };

  return (
    <>
      {/* Add Event */}
      <div className="modal fade" id="add_new">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="text-dark modal-title fw-bold">Add Event</h4>
              <button
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancelAdd}
              >
                <i className="ti ti-circle-x-filled" />
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Event Name <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="Enter event name"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-light me-2"
                data-bs-dismiss="modal"
                onClick={handleCancelAdd}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleAddEvent}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add Event */}
      {/* Start Event */}

      {/* Start Event */}
      <div className="modal fade" id="event_modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="text-dark modal-title fw-bold">Event Detail</h4>
              <button
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <i className="ti ti-circle-x-filled" />
              </button>
            </div>
            <div className="modal-body">
              <h6 className="mb-1" >{eventDetails.title}</h6>
              <p className="mb-3" >
                {eventDetails.description || "No description available"}
              </p>
              <span className="fw-semibold mb-1 d-block" >Event Date</span>
              <p className="mb-0" >{eventDetails.date}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Event */}

      {/* End Event */}
    </>
  );
};

export default CalendarModal;
