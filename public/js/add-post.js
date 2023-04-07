// Define the event handler as an async function for easier error handling
async function handleNewFormSubmit(event) {
    event.preventDefault();
  
    // Get the title and content values from the form
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value.trim();
  
    // Send a POST request to the server with the form data
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
  
    // Check if the response was successful and redirect to the dashboard if so
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // Display an error message if the response was not successful
      const errorText = await response.text();
      console.error(`Error submitting form: ${errorText}`);
      alert('An error occurred while submitting the form. Please try again later.');
    }
  }
  
  // Attach the event listener to the form
  const newPostForm = document.querySelector('.new-post-form');
  newPostForm.addEventListener('submit', handleNewFormSubmit);
  