
# Heart Rate Data Processing API

## Project Description

This is a Node.js API that receives, processes, and stores heart rate data asynchronously. The API aggregates heart rate readings into 15-minute intervals, computes the minimum and maximum heart rate during each interval, and returns the processed data.

## Features
- Receives clinical data (including heart rate) as JSON payload.
- Processes and aggregates heart rate readings in 15-minute intervals.
- Provides min and max heart rate for each interval.
- Implements a global error handler for managing all errors in a unified manner.
- Supports streaming for large payloads to avoid memory overload.

---

## Prerequisites

Before starting, make sure you have the following software installed on your machine:

- **Node.js** (version 14.x or above)
- **npm** (comes with Node.js)
  
## Installation Steps

1. **Clone or download the project folder**:
   clone the project from git to local to desired folder.

2. **Navigate to the project root directory**:
   Open a terminal/command prompt, and navigate to the project folder.
   ```bash
   cd path/to/project-root
   ```

3. **Install the dependencies**:
   Once inside the project directory, run the following command to install the required packages:
   ```bash
   npm install
   ```

---

## Running the Server

### Start the server:
Run the following command to start the API server:
```bash
npm start
```

This will start the server on port **3000** by default.

You should see a message in the terminal like:
```bash
Server is running on port 3000
```

---

## Testing the API

You can test the API using **Postman**.

- Open **Postman**.
- Select **POST** as the HTTP method.
- In the URL field, enter the following endpoint:
  http://localhost:3000/api/process-data
  
- In the **Body** tab, select **raw** and **JSON** format.
- Paste the clinical metrics payload (JSON data).
  
Example JSON Payload:
```json
{
   "clinical_data":{
      "HEART_RATE":{
         "uom":"beats/min",
         "data":[
            {
               "on_date":"2020-10-06T06:48:17.503000Z",
               "measurement":"111"
            },
            {
               "on_date":"2020-10-06T06:48:38.065000Z",
               "measurement":"66"
            }
         ]
      }
   }
}
```

- Click **Send** to make the request.

## Error Handling

This API uses a global error handler. If anything goes wrong (like invalid payload, incorrect data type, or server issues), the server will return an appropriate JSON response with an error message and status code.

Example error response:

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Invalid payload format"
}
```

---

## Scripts

- **`npm start`**: Starts the API server.
- **`npm install`**: Installs all required project dependencies.

---

## Project Structure

```plaintext
project-root/
│
├── controllers/
│   └── heartRateController.js    # Contains the logic for handling requests 
│
├── services/
│   └── heartRateService.js       # Contains business logic for processing heart rate data
│
├── streams/
│   └── HeartRateDataStream.js    # Handles incoming heart rate data as a stream
│
├── routes/
│   └── heartRateRoutes.js        # API routes for heart rate processing
│
├── middlewares/
│   ├── compressionMiddleware.js  # Middleware for response compression
│   └── errorHandler.js           # Global error handler middleware
│
├── app.js                        # Main application file
├── server.js                     # Entry point to start the server
└── package.json                  # Project dependencies and scripts
```

---

## Conclusion

With this setup, you can successfully start and test the Node.js API for processing clinical heart rate data in batches using Postman or command line tools. The project includes good error handling and scalability features.

Feel free to reach out for any issues!

