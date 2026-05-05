const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyb2hpdDA4NzAuYmUyM0BjaGl0a2FyYS5lZHUuaW4iLCJleHAiOjE3Nzc5NjA2ODQsImlhdCI6MTc3Nzk1OTc4NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImFiMzMxMjNkLWFlOTMtNDU3OC04NGMwLTEyNmNhMTIzOTM2NiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJvaGl0IG1pdHRhbCIsInN1YiI6IjAyODk4OTMyLTBjZDEtNDBmNC04ZmYxLTUxYTRjNTg2MzI0ZiJ9LCJlbWFpbCI6InJvaGl0MDg3MC5iZTIzQGNoaXRrYXJhLmVkdS5pbiIsIm5hbWUiOiJyb2hpdCBtaXR0YWwiLCJyb2xsTm8iOiIyMzEwOTkwODcwIiwiYWNjZXNzQ29kZSI6IkVYZnZEcCIsImNsaWVudElEIjoiMDI4OTg5MzItMGNkMS00MGY0LThmZjEtNTFhNGM1ODYzMjRmIiwiY2xpZW50U2VjcmV0IjoieFpzREFDQ0Z5eUZmV2ZrQyJ9.we8PCE1dtuAUUKwxYjAtE5y7vnpb-1H0LaSmLax2GbY";

const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  } catch (err) {
    console.log("Log failed");
  }
};

module.exports = Log;