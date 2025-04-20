import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://eventeasy.onrender.com/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err))
      .finally(() => setLoading(false));
  }, []);

  const openModal = (event) => setSelectedEvent(event);
  const closeModal = () => setSelectedEvent(null);

  const handleRegister = (eventId) => {
    navigate(`/register/${eventId}`);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Upcoming Events
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md animate-pulse"
            >
              <div className="bg-gray-300 dark:bg-gray-700 h-48 w-full mb-4 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-400 dark:bg-gray-600 rounded w-1/2 mt-auto"></div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => openModal(event)}
            >
              {event.image && (
                <img
                  src={`https://eventeasy.onrender.com${event.image}`}
                  alt={event.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h2 className="text-xl font-semibold dark:text-white">
                {event.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {event.description.length > 100
                  ? event.description.slice(0, 100) + "..."
                  : event.description}
              </p>
              <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                📍 {event.location}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRegister(event._id);
                }}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for full event details */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-[95%] max-h-[90vh] overflow-auto relative animate-zoomIn shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 dark:text-white text-xl font-bold hover:text-red-500"
            >
              ✖
            </button>

            {selectedEvent.image && (
              <img
                src={`https://eventeasy.onrender.com${selectedEvent.image}`}
                alt={selectedEvent.title}
                className="w-full max-h-[60vh] object-contain rounded-t"
              />
            )}

            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {selectedEvent.title}
              </h2>

              <div className="text-gray-700 dark:text-gray-300 space-y-2">
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {selectedEvent.description}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(selectedEvent.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {selectedEvent.location}
                </p>

                {/* Optional fields if you have them in your backend */}
                {selectedEvent.organizer && (
                  <p>
                    <span className="font-semibold">Organizer:</span>{" "}
                    {selectedEvent.organizer}
                  </p>
                )}
                {selectedEvent.contact && (
                  <p>
                    <span className="font-semibold">Contact:</span>{" "}
                    {selectedEvent.contact}
                  </p>
                )}
                {selectedEvent.rules && (
                  <div>
                    <p className="font-semibold">Rules:</p>
                    <ul className="list-disc list-inside">
                      {selectedEvent.rules.split("\n").map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="text-center">
                <button
                  onClick={() => handleRegister(selectedEvent._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
