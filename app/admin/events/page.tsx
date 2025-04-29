import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Event {
  eventId: number;
  eventName: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  imageUrl: string;
  category: string;
  organizerName: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
  isFree: boolean;
  ticketPrice: number;
  attendeesCount: number;
  eventLink: string;
  bannerVideo: string;
  createdAt: string;
  updatedAt: string;
}

const EventsTable: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:9090/data/getAllEvents");
      
      // Log the response to check its structure
      console.log("API Response:", response.data);
      
      // Check if the response data is an array or contains the array inside an object
      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else if (response.data && Array.isArray(response.data.events)) {
        setEvents(response.data.events); // Adjust this based on your API response structure
      } else {
        setError("Data format error: Expected an array of events.");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events. Please try again later.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEditEvent = (id: number) => {
    alert(`Edit event with ID: ${id}`);
  };

  const handleDeleteEvent = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      setEvents(events.filter(event => event.eventId !== id));
    }
  };

  return (
    <div className="card container">
      <h4 className="mt-3 mb-3">Events</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>S No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Location</th>
              <th>Category</th>
              <th>Organizer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Free</th>
              <th>Ticket Price</th>
              <th>Attendees</th>
              <th>Event Link</th>
              <th>Image</th>
              <th>Banner</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={20}>No events available</td>
              </tr>
            ) : (
              events.map((event, index) => (
                <tr key={event.eventId}>
                  <td>{index + 1}</td>
                  <td>{event.eventName}</td>
                  <td>{event.description}</td>
                  <td>{event.date}</td>
                  <td>{event.startTime}</td>
                  <td>{event.endTime}</td>
                  <td>{event.location}</td>
                  <td>{event.category}</td>
                  <td>{event.organizerName}</td>
                  <td>{event.contactEmail}</td>
                  <td>{event.contactPhone}</td>
                  <td>{event.status}</td>
                  <td>{event.isFree ? "Yes" : "No"}</td>
                  <td>{event.ticketPrice}</td>
                  <td>{event.attendeesCount}</td>
                  <td>
                    <a href={event.eventLink} target="_blank" rel="noreferrer">View</a>
                  </td>
                  <td>
                    <img src={event.imageUrl} alt={event.eventName} width="50" height="50" />
                  </td>
                  <td>
                    <video width="100" controls>
                      <source src={event.bannerVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </td>
                  <td>{new Date(event.createdAt).toLocaleString()}</td>
                  <td>{new Date(event.updatedAt).toLocaleString()}</td>
                  <td>
                    <FaEdit className="text-warning me-2" onClick={() => handleEditEvent(event.eventId)} />
                    <FaTrash className="text-danger" onClick={() => handleDeleteEvent(event.eventId)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsTable;
