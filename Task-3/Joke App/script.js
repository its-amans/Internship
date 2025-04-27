
const jokeElement = document.getElementById('joke');
const loadingElement = document.getElementById('loading');
const newJokeBtn = document.getElementById('new-joke-btn');
const copyJokeBtn = document.getElementById('copy-joke-btn');
const emojiElement = document.querySelector('.emoji');

// Array of emojis to rotate through
const emojis = ['😂', '🤣', '😆', '😅', '🙃', '😄', '😁'];

// Fetch a new joke from the API
async function fetchJoke() {
    // Show loading state
    jokeElement.style.display = 'none';
    loadingElement.style.display = 'block';
    newJokeBtn.disabled = true;

    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        const data = await response.json();
        displayJoke(data.joke);
    } catch (error) {
        displayError();
    }
}

// Display the joke
function displayJoke(joke) {
    // Hide loading, show joke
    loadingElement.style.display = 'none';
    jokeElement.style.display = 'block';
    jokeElement.textContent = joke;
    newJokeBtn.disabled = false;

    // Change emoji for fun
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    emojiElement.textContent = randomEmoji;
}

// Handle errors
function displayError() {
    loadingElement.style.display = 'none';
    jokeElement.style.display = 'block';
    jokeElement.textContent = "Couldn't fetch a joke. Maybe the internet is taking a dad nap? Try again!";
    newJokeBtn.disabled = false;
    emojiElement.textContent = '😴';
}

// Copy joke to clipboard
function copyJoke() {
    navigator.clipboard.writeText(jokeElement.textContent)
        .then(() => {
            // Change button text temporarily
            const originalText = copyJokeBtn.textContent;
            copyJokeBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyJokeBtn.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy joke: ', err);
        });
}

// Event listeners
newJokeBtn.addEventListener('click', fetchJoke);
copyJokeBtn.addEventListener('click', copyJoke);

// Get first joke when page loads
fetchJoke();
