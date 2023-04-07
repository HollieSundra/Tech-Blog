async function handleDelete(event) {
    event.preventDefault();
    
    const postId = window.location.pathname.split('/').pop();
    
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        throw new Error('Unable to delete post');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting the post');
    }
  }
  
  document.querySelector('.delete-post-btn').addEventListener('click', handleDelete);
  