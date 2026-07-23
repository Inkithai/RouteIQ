# RouteIQ API Documentation v2.0

## Base URL
`http://localhost:5000/api`

## Authentication Routes (`/api/auth`)
- `POST /signup`: Register new customer, driver, or admin account.
- `POST /login`: Authenticate and receive JWT token.
- `GET /me`: Get authenticated user profile (Header: `Authorization: Bearer <TOKEN>`).

## Bus Management Routes (`/api/buses`)
- `GET /`: Get all buses in fleet.
- `GET /:id`: Get specific bus details.
- `POST /`: Add new bus (Admin role required).
- `PATCH /:id/location`: Stream real-time GPS coordinates and speed.
- `PUT /:id`: Update bus details (Admin role required).
- `DELETE /:id`: Remove bus (Admin role required).

## Booking Routes (`/api/bookings`)
- `GET /seats?routeId=<ID>&travelDate=<DATE>`: Get booked seats for a route.
- `POST /`: Reserve seats and create confirmed ticket.
- `GET /my`: Fetch current user's booking history.
- `GET /`: Get all bookings across system (Admin role required).
- `PATCH /:id/cancel`: Cancel active booking.

## Telemetry & WebSocket Events (`Socket.IO`)
- `updateBusLocation`: Real-time emission containing `{ busId, latitude, longitude, speedKmph, status }`.
- `driverLocationUpdate`: Inbound driver telemetry broadcast event.
