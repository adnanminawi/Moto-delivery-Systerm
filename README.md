MotoTaxi 

A real-time motorcycle-taxi booking platform, Connecting customers to the nearest available driver in seconds, replacing a manual WhatsApp-based dispatch workflow.

Features

Customer:

Book a ride with just a name and phone number — no account required.
Set pickup and destination on an interactive map.
Live tracking of the assigned driver's position.

Driver

Log in with phone + password.
Go online/offline and stream live GPS location.
Receive ride requests with a 15-second accept/reject window.

Admin

Live map of all drivers (online, busy, offline).
Driver management: create drivers, view status.
Daily orders and basic operational stats.

How ride assignment works:
1.Customer submits a booking, ride enters searching state.
2.The server computes the Haversine distance from the pickup point to every online driver and targets the nearest one.
3.The driver gets the request with a 15s timeout, on reject/timeout the next nearest driver is assgined.
4.On accept, the ride moves through assigned to en_route to completed (or cancelled / no_driver_found).
