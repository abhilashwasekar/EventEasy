import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://eventeasy.onrender.com/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddOrUpdateSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      if (editId) {
        await axios.put(`https://eventeasy.onrender.com/api/events/${editId}`, data);
        handleAddOrUpdateSuccess("Event updated successfully!");
      } else {
        await axios.post("https://eventeasy.onrender.com/api/events", data);
        handleAddOrUpdateSuccess("Event added successfully!");
      }

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        image: null,
      });
      setEditId(null);
      fetchEvents();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date?.slice(0, 10) || "",
      location: event.location,
      image: null,
    });
    setEditId(event._id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://eventeasy.onrender.com/api/events/${id}`);
      handleAddOrUpdateSuccess("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          {editId ? "Update Event" : "Add Event"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {events.map((event) => (
          <div key={event._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-xl font-bold dark:text-white">{event.title}</h3>
            <p className="dark:text-gray-300">{event.description}</p>
            <p className="dark:text-gray-300">{event.date?.slice(0, 10)}</p>
            <p className="dark:text-gray-300">{event.location}</p>
            {event.image && (
              <img
                src={`https://eventeasy.onrender.com${event.image}`}
                alt={event.title}
                className="mt-2 rounded max-h-64 object-cover"
              />
            )}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(event)}
                className="bg-yellow-500 px-3 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="bg-red-600 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center animate-fade-in max-w-md w-full">
            <h2 className="text-xl font-bold text-green-600 mb-2">Success!</h2>
            <p className="text-gray-800 dark:text-gray-200 text-base">{successMessage}</p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
