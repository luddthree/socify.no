// Import your authentication middleware
import authMiddleware from '~/middleware/auth.js';

// Example protected API route using the authentication middleware
export default defineEventHandler(async (event) => {
  // First, run the auth middleware to ensure the request is authenticated
  await authMiddleware(event);

  // Now, implement your protected API logic here
  // For demonstration, let's return a simple JSON response
  return {
    message: 'This is a protected API route. You are authenticated!',
  };
});
