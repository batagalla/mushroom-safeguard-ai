
# Mushroom SafeGuard Backend

This is the backend server for the Mushroom SafeGuard application, which provides API endpoints for user authentication, image analysis, feedback management, and user management.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin_password
   ```

4. Create an uploads folder:
   ```
   mkdir uploads
   ```

## Running the Server

### Development Mode
```
npm run dev
```

### Production Mode
```
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Images
- `POST /api/images/upload` - Upload an image
- `POST /api/images/analyze/:id` - Analyze an image
- `GET /api/images` - Get all images for the current user
- `GET /api/images/:id` - Get a specific image
- `DELETE /api/images/:id` - Delete an image

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback (admin only)
- `GET /api/feedback/user` - Get feedback by current user
- `GET /api/feedback/image/:imageId` - Get feedback for a specific image
- `PUT /api/feedback/:id/status` - Update feedback status (admin only)
- `DELETE /api/feedback/:id` - Delete feedback

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user details
- `DELETE /api/users/:id` - Delete a user (admin only)

## File Structure

- `server.js` - Entry point of the application
- `models/` - Database models
- `routes/` - API routes
- `middleware/` - Custom middleware
- `config/` - Configuration files
- `utils/` - Utility functions
- `uploads/` - Temporary storage for file uploads
