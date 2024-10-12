# Crypto Price Tracker - KoinX Assignment

This is a Node.js application that fetches cryptocurrency data and stores it in a MongoDB database. The application provides several API endpoints for fetching crypto statistics, starting and stopping cron jobs, and calculating the standard deviation of prices.

## Technologies Used

- **Node.js**: JavaScript runtime for building the application.
- **Express**: Web framework for Node.js to handle routing.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **node-cron**: A task scheduler for Node.js to manage cron jobs.

## API Endpoints

### 1. `/stats`

- **Method**: `GET`
- **Query Parameters**:
  - `coin`: Required. The name of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic`).
- **Description**: Fetches the current price, market cap, and 24-hour price change for the specified cryptocurrency.

#### Example Request

```
GET /stats?coin=bitcoin
```

### 2. `/start-cron`

- **Method**: `POST`
- **Description**: Starts a cron job using an external cron job service (e.g., cron-job.org) to fetch cryptocurrency data periodically.

#### Example Request

```
POST /start-cron
```

### 3. `/start-cron-local`

- **Method**: `POST`
- **Description**: Starts a cron job to run locally on the server.

#### Example Request

```
POST /start-cron-local
```

### 4. `/stop-cron`

- **Method**: `POST`
- **Description**: Stops the local cron job that is currently running.

#### Example Request

```
POST /stop-cron
```

### 5. `/deviation`

- **Method**: `GET`
- **Query Parameters**:
  - `coin`: Required. The name of the cryptocurrency for which to calculate the standard deviation of prices.
- **Description**: Returns the standard deviation of the price for the specified cryptocurrency based on the last 100 records stored in the database.

#### Example Request

```
GET /deviation?coin=bitcoin
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/crypto-price-tracker.git
   cd crypto-price-tracker
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and any other environment variables needed:

   ```plaintext
   DB_URI=mongodb://localhost:27017/cryptoData
   CG_API_KEY=your_api_key
   ```

4. Start the application:

   ```bash
   npm start
   ```

## Screenshots

![image](https://github.com/user-attachments/assets/277252ae-a15e-4627-8bd7-86f6dc062b72)
![image](https://github.com/user-attachments/assets/4cf8cade-b19a-4822-a6c1-db54b6a1b07e)
