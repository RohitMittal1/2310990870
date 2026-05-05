import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/top-notifications")
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Top Notifications</h1>

      {notifications.length === 0 ? (
        <p>Loading...</p>
      ) : (
        notifications.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{item.Type}</h3>
            <p>{item.Message}</p>
            <small>{item.Timestamp}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default App;