const axios = require("axios");

const Log = require("./logging_middleware/log");

// ✅ ADD TOKEN HERE (copy from log.js)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyb2hpdDA4NzAuYmUyM0BjaGl0a2FyYS5lZHUuaW4iLCJleHAiOjE3Nzc5NjM4NTQsImlhdCI6MTc3Nzk2Mjk1NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImEwYWExMmJhLWI1ZTEtNDM4Ni04YmQ5LWQyZjQwMzc2ZWI4MCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJvaGl0IG1pdHRhbCIsInN1YiI6IjAyODk4OTMyLTBjZDEtNDBmNC04ZmYxLTUxYTRjNTg2MzI0ZiJ9LCJlbWFpbCI6InJvaGl0MDg3MC5iZTIzQGNoaXRrYXJhLmVkdS5pbiIsIm5hbWUiOiJyb2hpdCBtaXR0YWwiLCJyb2xsTm8iOiIyMzEwOTkwODcwIiwiYWNjZXNzQ29kZSI6IkVYZnZEcCIsImNsaWVudElEIjoiMDI4OTg5MzItMGNkMS00MGY0LThmZjEtNTFhNGM1ODYzMjRmIiwiY2xpZW50U2VjcmV0IjoieFpzREFDQ0Z5eUZmV2ZrQyJ9.kRreJKHEc18b7neKKP5zZC3UcGC8u8QBnAaDJWtC2Xc";

// Priority mapping
const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getTopNotifications() {
  try {
    // Logging
    await Log("backend", "info", "service", "Fetching notifications from API");

    // ✅ FIX 1: Add Authorization header
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    let notifications = response.data.notifications;

    // ✅ FIX 2: Correct field names (Type, Timestamp)
    notifications.sort((a, b) => {
      const priorityDiff =
        priorityMap[b.Type] - priorityMap[a.Type];

      if (priorityDiff !== 0) return priorityDiff;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    // Take top 10
    const top10 = notifications.slice(0, 10);

    await Log("backend", "info", "service", "Top 10 notifications processed");

    return top10;

  } catch (error) {
    await Log("backend", "error", "service", "Error fetching notifications");
    console.error("ERROR:", error.message);
    return [];
  }
}

module.exports = getTopNotifications;