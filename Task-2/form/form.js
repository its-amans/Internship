
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Reset previous error styles
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        let isValid = true;
        
        // Name validation
        if (name === '') {
            document.getElementById('name').parentElement.classList.add('error');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailRegex.test(email)) {
            document.getElementById('email').parentElement.classList.add('error');
            isValid = false;
        }
        
        // Message validation
        if (message === '') {
            document.getElementById('message').parentElement.classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // Form is valid - you would typically send data to server here
            alert('Form submitted successfully!');
            this.reset();
        } else {
            // Add error message or styling
            const errorGroups = document.querySelectorAll('.error');
            errorGroups.forEach(group => {
                const errorElement = group.querySelector('input, textarea');
                errorElement.style.borderColor = 'red';
            });
        }
    });