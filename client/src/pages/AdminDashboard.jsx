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

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/events/${editId}`, data);
      } else {
        await axios.post("http://localhost:5000/api/events", data);
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
      image: null, // Do not pre-fill image field
    });
    setEditId(event._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
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
                src={`http://localhost:5000${event.image}`}
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
    </div>
  );
};

export default AdminDashboard;
