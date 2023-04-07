// Define a function to handle the "create post" button click event
async function handleCreatePostButtonClick(event) {
    // Prevent the default behavior of the button (e.g. page reload)
    event.preventDefault();
    
    // Redirect the user to the new post creation page
    document.location.replace('/dashboard/new');
  }
  
  // Find the "create post" button in the document and attach a click event listener to it
  const createPostButton = document.querySelector('#create-new-post');
  createPostButton.addEventListener('click', handleCreatePostButtonClick);
  