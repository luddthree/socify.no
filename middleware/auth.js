export default async (event) => {
    try {
      const token = event.req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
      if (!token) {
        // Respond with an unauthorized error if token is invalid or not provided
        event.res.statusCode = 401;
        event.res.end('Unauthorized');
        return;
      }
      // Verify the token here (implement your verification logic)
      const user = await verifyToken(token);
      if (!user) {
        event.res.statusCode = 401;
        event.res.end('Unauthorized');
        return;
      }
      // Add the user to the event context (or any other necessary actions)
    } catch (error) {
      // Handle any errors, such as token verification failures
      event.res.statusCode = 401;
      event.res.end('Unauthorized');
    }
  };
  