async function handleLoginForm(event) {
    event.preventDefault();

    const usernameInput = document.querySelector('#username-login');
    const passwordInput = document.querySelector('#password-login');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        document.location.replace('/dashboard');
    } catch (error) {
        console.error(error);
        alert('Failed to login. Please try again.');
    } finally {
        // Reset form inputs
        usernameInput.value = '';
        passwordInput.value = '';
    }
}

document.querySelector('.login-form').addEventListener('submit', handleLoginForm);
