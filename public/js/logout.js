// Sends a request to log out the current user.

async function logout() {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
  
      // Redirect to home page after successful logout
      document.location.replace('/');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  
  // Attach logout event listener to logout button
  document.querySelector('#logout').addEventListener('click', logout);
  