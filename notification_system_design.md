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





#STAGE 2
# Stage 2 - Database Design

## 1. Database Choice

We will use MongoDB (NoSQL database) because:

* Flexible schema
* Easy to scale
* Fast for read/write operations

---

## 2. Schema Design

Notification:

* id
* studentId
* type (Event, Result, Placement)
* message
* timestamp
* isRead

---

## 3. Problems with Large Data

* Database size increases
* Queries become slow
* High load on server

---

## 4. Solutions

* Use indexing on important fields (studentId, type)
* Use pagination (limit data per request)
* Use sharding for scaling

---

## 5. Sample Query

```js
db.notifications.find({ studentId: 1042 })
```



#STAGE 3
# Stage 3 - Query Optimization

## 1. Given Problem

The query:
SELECT * FROM notifications
WHERE studentId = 1042 AND isRead = false
ORDER BY createdAt ASC;

---

## 2. Issues

* Using SELECT * fetches unnecessary data
* No indexing → slow performance
* Large dataset (millions of records)

---

## 3. Solution

### a) Use Specific Columns

Fetch only required fields instead of *

### b) Add Indexes

Create indexes on:

* studentId
* isRead
* createdAt

---

## 4. Improved Query

SELECT id, message, createdAt
FROM notifications
WHERE studentId = 1042 AND isRead = false
ORDER BY createdAt ASC;

---

## 5. Important Note

Adding indexes on every column is NOT good because:

* Increases storage
* Slows down write operations





#STAGE 4
# Stage 4 - Performance Improvement

## 1. Problem

Notifications are fetched from the database on every request, which increases load and slows down the system.

---

## 2. Solutions

### a) Caching

Use Redis to store frequently accessed notifications and reduce database calls.

### b) Pagination

Fetch limited data per request using limit and page parameters.

### c) Lazy Loading

Load notifications only when needed instead of all at once.

### d) Rate Limiting

Restrict too many API requests from a single user.

---

## 3. Trade-offs

* Caching improves speed but may return slightly outdated data.
* Pagination reduces load but requires multiple requests.



#STAGE 5
# Stage 5 - Scaling Notification System

## 1. Problem

Sending notifications to 50,000 students using a single API request can:

* Overload the server
* Cause delays
* Fail partially if an error occurs

---

## 2. Solution

### a) Use Queue System

Use message queues like RabbitMQ or Kafka to handle large-scale processing.

---

## 3. Improved Flow

1. API receives request
2. Notifications are added to a queue
3. Worker services process the queue
4. Notifications are sent asynchronously

---

## 4. Benefits

* Faster response time
* Better scalability
* Reliable processing (retry on failure)

---

## 5. Additional Improvements

* Bulk processing
* Retry mechanism for failed jobs
* Parallel workers for faster execution





#STAGE 6

