const API_KEY = ['AIzaSyAf0edYw94yUvMuLmEf5CVUw11XrpHT_5U','AIzaSyCGRQ9QiwOsZdbaUG6I0tFIUdsdfdOx9YE' , 'AIzaSyBRG6SMwIu4JrZM_KXJbU_SWL-u_X0ToWQ'] // Replace with your API key
const CHANNEL_ID = 'UCZmAh77ShJkCPUp-Nl0PLOw';  // Replace with your channel ID


document.addEventListener('DOMContentLoaded', () => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('#main'),
      smooth: true
    });
  
    // Observe for changes in the DOM and update Locomotive Scroll
    const observer = new MutationObserver(() => {
      scroll.update();
    });
  
    const config = { childList: true, subtree: true };
    observer.observe(document.querySelector('#main'), config);
  
    // Call update once all content is loaded
    window.addEventListener('load', () => {
      scroll.update();
    });
  });
  
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "330px" )  {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "330px";
    }
}

async function fetchSubscriberCount() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY[getRandomInt(0,3)]}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.items || data.items.length === 0) {
            throw new Error('No channel data found');
        }

        const subscriberCount = data.items[0].statistics.subscriberCount;
        document.getElementById('subscount').innerText = `Subscribers: ${subscriberCount}`;
    } catch (error) {
        console.error('Error fetching subscriber count:', error);
        document.getElementById('subscount').innerText = 'Error fetching subscriber count';
    }
}
async function fetchTotalViews() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY[getRandomInt(0,3)]}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.items || data.items.length === 0) {
            throw new Error('No channel data found');
        }

        const viewCount = data.items[0].statistics.viewCount;
        document.getElementById('viewscount').innerText = `Views: ${viewCount}`;
    } catch (error) {
        console.error('Error fetching total views:', error);
        document.getElementById('viewscount').innerText = 'Error fetching total views';
    }
}
async function fetchShortViews() {
    try {
        const shortsResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${CHANNEL_ID}&maxResults=9&type=video&key=${API_KEY[getRandomInt(0,3)]}`);
        const shortsData = await shortsResponse.json();
        const shorts = shortsData.items;
        const shortsContainer = document.querySelector('.shorts');

        shorts.forEach(async short => {
            const videoId = short.id.videoId;
            const thumbnailUrl = short.snippet.thumbnails.medium.url;
            const title = short.snippet.title;
            const viewsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY[getRandomInt(0,3)]}`);
            const viewsData = await viewsResponse.json();
            const views = viewsData.items[0].statistics.viewCount;
            const shortElement = document.createElement('div');
            shortElement.className = 'short';
            shortElement.innerHTML = `
                    <a href="https://youtube.com/watch?v=${videoId}" target="_blank">
                        <img src="${thumbnailUrl}" alt="${title}">
                        <p>${title}</p>
                        <div class="views">Views: ${views}</div>
                    </a>`;
            shortsContainer.appendChild(shortElement);
        });
    } catch (error) {
        console.error('Error fetching short views:', error);
    }
}

fetchSubscriberCount();
fetchShortViews();
fetchTotalViews();
setInterval(fetchSubscriberCount, 10000); // Update subscriber count every 10 seconds