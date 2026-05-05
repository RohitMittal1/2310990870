# Notification System Design

## Backend
Node.js + Express with logging middleware

## Logging
Logs are sent to external API with stack, level, package, message

## Routes
/, /test, /error

## Flow
Client → API → Logging Middleware → External API → Response