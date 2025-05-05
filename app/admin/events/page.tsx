import tokenService from "@/app/tokenService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const router = useRouter();

  const fetchEvents = async () => {
    try {
      const token = tokenService.getToken();

      if (!token) {
        console.error("No token found. Please log in.");
        setError("Authentication token not found.");
        return;
      }

      const response = await fetch("http://localhost:9090/admin/getAllEvents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch events. Status: ${response.status}`);
      }

      const res = await response.json();
      console.log("Fetched Events:", res.data);

      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else {
        setError("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Could not load events. Please try again later.");
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
      setEvents(events.filter((event) => event.eventId !== id));
    }
  };

  const handleAddEvents = () => {
    console.log("Navigating to AddCarModel page");
    router.push("/admin/events/add_events");
  };

  return (
    <div className="card container">
       <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddEvents}
        >
          Add Event
        </button>
      </div>
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
                <td colSpan={21}>No events available</td>
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
                    {event.eventLink ? (
                      <a href={event.eventLink} target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.eventName} width="50" height="50" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    {event.bannerVideo ? (
                      <video width="100" controls>
                        <source src={event.bannerVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      "No Video"
                    )}
                  </td>
                  <td>{new Date(event.createdAt).toLocaleString()}</td>
                  <td>{new Date(event.updatedAt).toLocaleString()}</td>
                  <td>
                    <FaEdit
                      className="text-warning me-2"
                      onClick={() => handleEditEvent(event.eventId)}
                      style={{ cursor: "pointer" }}
                    />
                    <FaTrash
                      className="text-danger"
                      onClick={() => handleDeleteEvent(event.eventId)}
                      style={{ cursor: "pointer" }}
                    />
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
