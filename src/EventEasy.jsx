import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./components/Card";
import { Button } from "./components/Button";
import ThemeToggle from "./components/ThemeToggle";
import logo from "./assets/images/logo.png";

const EventEasy = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          name: "Tech Fest 2025",
          description: "A grand tech festival featuring hackathons, coding challenges, and workshops.",
          date: "March 10, 2025",
          venue: "MIT Auditorium",
          formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdP0xf5BnBbi3V-c-ffmx2V13LGIqZhxHfVWu-dGxbAmnUMxA/viewform?usp=sharing",
          image: "https://contentstatic.techgig.com/photo/79488789.cms",
        },
        {
          id: 2,
          name: "Cultural Night",
          description: "An evening filled with dance, music, and drama performances.",
          date: "March 15, 2025",
          venue: "Main Stage, MIT Campus",
          formLink: "https://forms.gle/example2",
          image: "https://scontent.fnag6-3.fna.fbcdn.net/v/t39.30808-6/448016782_122146993214229771_8022871440787930086_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=B7WSmQZOX00Q7kNvgEkY2TJ&_nc_oc=AdgyC7XmzncXnd-3fzg41d2bD1a3n4YO0EQ1t9UMtvAJDu57aVklhHQpMmRFa7Jv5MQpYx4zFppif9bV9RrBRcwL&_nc_zt=23&_nc_ht=scontent.fnag6-3.fna&_nc_gid=A3BVxplq8I99aF7rl5jX04e&oh=00_AYCR4PmvUu6EDGhYX52RU1pzlbVuNhtfWiXj45LMihF2Aw&oe=67C4850A",
        },
        {
          id: 3,
          name: "Sports Meet",
          description: "Inter-college sports competition with multiple games and prizes.",
          date: "March 20, 2025",
          venue: "MIT Sports Ground",
          formLink: "https://forms.gle/example3",
          image: "https://img.freepik.com/free-vector/sport-text-with-children-banner-design_1308-132419.jpg?t=st=1740558361~exp=1740561961~hmac=c4ad3034c36683747a66770e3f8658b0e540ec3015bcdd1095a33c23ad6f8694&w=1380",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          {loading ? (
            <div className="animate-pulse w-32 h-32 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
          ) : (
            <img src={logo} alt="EventEasy Logo" className="w-32 h-20 " />
          )}

          {loading ? (
            <div className="animate-pulse w-40 h-10 rounded-md bg-gray-300 dark:bg-gray-700"></div>
          ) : (
            <h1 className="text-3xl font-semibold dark:text-white">EventEasy</h1>
          )}
        </div>

        {loading ? (
          <div className="animate-pulse w-14 h-8 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
        ) : (
          <ThemeToggle />
        )}
      </div>

      {/* Event Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? [...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="animate-pulse rounded-xl h-64 bg-gray-300 dark:bg-gray-700"
              ></motion.div>
            ))
          : events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card now properly toggles with dark mode */}
                <Card className="h-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 border dark:border-gray-700 transition-colors duration-300">
                  <img src={event.image} alt={event.name} className="w-full h-48 object-cover rounded-t-xl" />
                  <CardContent>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{event.name}</h2>
                    <p className="text-gray-500 dark:text-gray-300 mb-4">{event.description}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">📅 Date: {event.date}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">📍 Venue: {event.venue}</p>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-md"
                      onClick={() => window.open(event.formLink, "_blank")}
                    >
                      Register
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default EventEasy;
