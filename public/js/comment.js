async function commentFormHandler(event) {
    event.preventDefault();
  
    const commentText = document.querySelector('textarea[name="comment-body"]').value.trim();
    const postId = window.location.pathname.split('/').pop();
  
    if (commentText) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ post_id: postId, comment_text: commentText }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        const { statusText } = response;
        alert(`Error: ${statusText}`);
      }
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  
