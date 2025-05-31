I’m saving the README now. Here it is ready for you to add to your project:

# 🐝 BeeTrail Field Logger API

A backend service that powers the BeeTrail Field Logger App — enabling beekeepers to log hive placements, manage crop flowering calendars, and discover nearby pollination opportunities using geo-location.

---

## 🧰 Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **Postman** for testing

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/beetrail-api.git
cd beetrail-api
2. Install Dependencies
bash

npm install
3. Configure Environment Variables
Create a .env file:

ini

PORT=5000
MONGO_URI=mongodb://localhost:27017/beetrail
4. Start the Server
bash

npm run dev
The server will start on http://localhost:5000.

🚀 API Endpoints
🔸 Add Hive Log
POST /api/hives

json

{
  "hiveId": "HIVE004",
  "datePlaced": "2025-04-08",
  "latitude": 28.7041,
  "longitude": 77.1025,
  "numColonies": 5
}
🔸 Get Hive Logs
GET /api/hives

Optional query params: startDate, endDate, page, limit

🔸 Add Crop Calendar Entry
POST /api/crops

json

{
  "name": "Sunflower",
  "floweringStart": "2025-04-10",
  "floweringEnd": "2025-04-25",
  "latitude": 26.9124,
  "longitude": 75.7873,
  "recommendedHiveDensity": 5
}
🔸 Nearby Crop Opportunities
GET /api/crops/nearby

Query params:
latitude (required), longitude (required), radius (optional, default 100km), date (optional, default today)

🧪 Sample Data
Use Postman to POST these sample crops (near Agra) for testing /api/crops and /api/crops/nearby:

json

{
  "name": "Sunflower",
  "floweringStart": "2025-05-01",
  "floweringEnd": "2025-06-15",
  "latitude": 27.1767,
  "longitude": 78.0081,
  "recommendedHiveDensity": 5
}
(Additional sample data in Postman collection)

⚠️ Edge Cases Handled
Validates unique hive IDs

Latitude/Longitude range checks

Empty responses for no nearby crops

Overlapping flowering windows

🎁 Bonus Features (Optional)
User authentication with roles (beekeeper, admin)

Sync tokens for offline support

CSV export for logs

Swagger/OpenAPI docs

Admin dashboard UI

📁 Project Structure
bash

.
├── controllers/
├── models/
├── routes/
├── utils/
├── .env
├── server.js
└── README.md



postman-link

https://documenter.getpostman.com/view/28862573/2sB2qgdy14
```
