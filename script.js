const apiKey = "e0477fb469ec46f0a1bae4faf8df2f14";

const searchNews = document.querySelector(".searchNews");
const searchBtn = document.querySelector(".search-Btn");
const searchResults = document.querySelector(".box-container");

async function fetchNews(query = 'latest') {
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&q=${query}&pageSize=6&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}

function displayNews(articles) {
    searchResults.innerHTML = "";
    articles.forEach(article => {
        const box = document.createElement('div');
        box.classList.add("box");

        const image = document.createElement('img');
        image.src = article.urlToImage || 'placeholder.jpg'; // Use a placeholder image if urlToImage is null
        image.alt = article.title;

        const title = document.createElement('h5');
        title.classList.add("head-Line");
        title.textContent = article.title;

        const description = document.createElement('p');
        description.classList.add("paragraph");
        description.textContent = article.description;

        box.appendChild(image);
        box.appendChild(title);
        box.appendChild(description);

        searchResults.appendChild(box);
    });
}

searchBtn.addEventListener("click", async () => {
    const query = searchNews.value.trim();
    if (query) {
        const articles = await fetchNews(query);
        displayNews(articles);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const articles = await fetchNews();
    displayNews(articles);
});
