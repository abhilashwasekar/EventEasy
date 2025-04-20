import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RegistrationPage = () => {
  const { eventId } = useParams();
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    prn: "",
    branch: "",
    division: "",
    college: "",
    members: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://eventeasy.onrender.com/api/events/${eventId}`);
        setEventName(res.data.title || "");
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "prn" && !/^\d*$/.test(value)) return;
    if (name === "members" && !/^\d{0,2}$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://eventeasy.onrender.com/api/participation", {
        ...form,
        eventId,
      });
      alert("Registration successful!");
      setForm({
        name: "",
        prn: "",
        branch: "",
        division: "",
        college: "",
        members: "",
      });
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        {loading ? (
          <>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-6 animate-pulse mx-auto" />
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full h-10 mb-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
            <div className="h-10 bg-gray-400 dark:bg-gray-600 rounded w-full animate-pulse" />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
              Register for <span className="text-blue-500">{eventName}</span>
            </h2>

            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <input
              type="text"
              name="prn"
              placeholder="PRN"
              value={form.prn}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <select
              name="branch"
              value={form.branch}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            >
              <option value="">Select Branch</option>
              <option value="Computer">Computer</option>
              <option value="IT">IT</option>
              <option value="ENTC">ENTC</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electronics">Electronics</option>
            </select>

            <select
              name="division"
              value={form.division}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            >
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>

            <input
              type="text"
              name="college"
              placeholder="COLLEGE NAME"
              value={form.college}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <input
              type="text"
              name="members"
              placeholder="MEMBERS"
              value={form.members}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default RegistrationPage;
