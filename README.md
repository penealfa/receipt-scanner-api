# Receipt Scanning and Parsing API

This project provides an API for scanning and parsing receipts using Tesseract.js for Optical Character Recognition (OCR) and Google's Gemini AI for extracting structured data from the receipt text. The API is built using Express.js and Multer for handling file uploads.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/receipt-scanning-api.git
   cd receipt-scanning-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Gemini API key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on the port specified in the `PORT` environment variable (default is 3000).

## Usage

To use the API, send a POST request to the `/scan-receipt` endpoint with an image file of the receipt. The API will return a JSON object containing the parsed receipt data.

### Example Request

```bash
curl -X POST -F "image=@/path/to/your/receipt.jpg" http://localhost:3000/scan-receipt
```

### Example Response

```json
{
  "total": 25.99,
  "business": "Example Store",
  "items": [
    {
      "title": "Item 1",
      "quantity": 1,
      "price": 10.99
    },
    {
      "title": "Item 2",
      "quantity": 2,
      "price": 7.50
    }
  ],
  "tax": 1.99,
  "transaction_timestamp": "2023-10-01T12:34:56Z"
}
```

## API Endpoints

### POST `/scan-receipt`

- **Description:** Upload an image of a receipt to be scanned and parsed.
- **Request Body:**
  - `image` (required): The image file of the receipt.
- **Response:**
  - JSON object containing the parsed receipt data.

## Configuration

- **CORS:** The API is configured to allow cross-origin requests from any domain. You can modify the CORS headers in the `app.use` middleware if needed.
- **Port:** The server listens on the port specified in the `PORT` environment variable (default is 3000).

## Error Handling

- **400 Bad Request:** Returned if no image file is uploaded.
- **500 Internal Server Error:** Returned if there is an error during processing, such as OCR or AI parsing failure.

## Dependencies

- **Express.js:** Web framework for Node.js.
- **Multer:** Middleware for handling multipart/form-data, primarily used for file uploads.
- **Tesseract.js:** OCR library for extracting text from images.
- **Google Generative AI:** AI model for parsing and structuring receipt text.
- **Dotenv:** Loads environment variables from a `.env` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This documentation provides a comprehensive guide to setting up and using the Receipt Scanning and Parsing API. For further assistance, please refer to the official documentation of the dependencies or open an issue in the repository.
