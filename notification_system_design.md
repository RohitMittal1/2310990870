# Notification System Design

## Backend
Node.js + Express with logging middleware

## Logging
Logs are sent to external API with stack, level, package, message

## Routes
/, /test, /error

## Flow
Client → API → Logging Middleware → External API → Response



#Stage 1
# Stage 1 - API Design

## 1. Get All Notifications

GET /notifications

Response:

```json
{
  "id": "string",
  "type": "Event | Result | Placement",
  "message": "string",
  "timestamp": "date"
}
```

---

## 2. Get Notifications by Type

GET /notifications?type=Event

---

## 3. Mark Notification as Read

POST /notifications/:id/read

---

## 4. Create Notification

POST /notifications

Body:

```json
{
  "type": "Event",
  "message": "New event available"
}
```

---

## 5. Headers

Authorization: Bearer token
Content-Type: application/json

---

## 6. Real-time Notifications

We will use WebSockets (Socket.io) to send notifications in real-time.
