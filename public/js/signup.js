async function handleSignup(event) {
    event.preventDefault();
  
    const usernameInput = document.querySelector('#username-signup');
    const passwordInput = document.querySelector('#password-signup');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
  
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to sign up');
      }
  
      document.location.replace('/dashboard');
    } catch (error) {
      console.error(error);
      alert(error.message || 'Failed to sign up');
      usernameInput.value = '';
      passwordInput.value = '';
    }
  }
  
  document.querySelector('.signup-form').addEventListener('submit', handleSignup);
  