document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Validate the username and password
      if (username === 'your_username' && password === 'your_password') {
        // Redirect to the home page or any other page after successful login
        window.location.href = 'home.html';
      } else {
        // Display an error message for invalid credentials
        alert('Invalid username or password. Please try again.');
      }
    });
  });
  