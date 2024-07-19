document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('title');
    const idInput = document.getElementById('boardgameid');
    const imageInput = document.getElementById('imageurl');
    const resultsDiv = document.getElementById('autocomplete-results');

    let timeoutId;

    function debounce(func, delay) {
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    async function fetchImageUrl(thingId) {
        const url = `https://www.boardgamegeek.com/xmlapi2/thing?id=${thingId}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, 'application/xml');
            const item = xml.querySelector('item');

            if (item) {
                const image = item.querySelector('image');
                return image ? image.textContent : 'No image available';
            } else {
                throw new Error('Item not found');
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            return 'Error fetching image';
        }
    }

    async function fetchBoardGameSuggestions(query) {
        if (query.length < 2) {
            resultsDiv.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${encodeURIComponent(query)}`);
            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, 'application/xml');
            const items = xml.querySelectorAll('item');

            resultsDiv.innerHTML = '';

            for (const item of items) {
                const name = item.querySelector('name').getAttribute('value');
                const id = item.getAttribute('id');
                const div = document.createElement('div');
                div.textContent = name;
                div.dataset.id = id;
                div.classList.add('autocomplete-item');

                div.addEventListener('click', async () => {
                    const imageUrl = await fetchImageUrl(id);
                    console.log(imageUrl);
                    input.value = name;
                    idInput.value = id;
                    imageInput.value = imageUrl;
                    resultsDiv.innerHTML = '';
                });

                resultsDiv.appendChild(div);
            }

        } catch (error) {
            console.error('Error fetching board game data:', error);
            resultsDiv.innerHTML = '<div class="error-message">Error fetching data</div>';
        }
    }

    const debouncedFetch = debounce(fetchBoardGameSuggestions, 300);

    input.addEventListener('input', () => {
        debouncedFetch(input.value);
    });

    document.addEventListener('click', (e) => {
        if (!resultsDiv.contains(e.target) && e.target !== input) {
            resultsDiv.innerHTML = '';
        }
    });
});
