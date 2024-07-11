const API_KEY = ['AIzaSyAf0edYw94yUvMuLmEf5CVUw11XrpHT_5U','AIzaSyCGRQ9QiwOsZdbaUG6I0tFIUdsdfdOx9YE' , 'AIzaSyBRG6SMwIu4JrZM_KXJbU_SWL-u_X0ToWQ' , 'AIzaSyAvymR0iK-HJT3el82J4pqaCCAsLdfGTY8' , 'AIzaSyBeetgOLmBUZZyu5mDoqyYHYNu5AOg_ZJw' , 'AIzaSyDgfSmkaCtIh0yOdkyDke_vm7yYekxxJII' , 'AIzaSyB0mNeefxpygxDi9BHo8az4T7HW2RlDJ5s' , 'AIzaSyCFPUfeGgz-ENmUY16qypYHPYj8NglYDT4' , 'AIzaSyAETzrtqnIFQ2VrvDLrWUapoyXN-8k1I50' , 'AIzaSyC8mo_BZz01zzPFDDas7gixCsnj8I2EXuQ' , 'AIzaSyBEKVTxfu6eWEdpBYqeOnlbkGRaYUxrpN4' , 'AIzaSyD0mFcvcsMt9ff0j5JaSK4yH7pisalHGLM'] // Replace with your API key
const CHANNEL_ID = 'UCZmAh77ShJkCPUp-Nl0PLOw';


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
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY[getRandomInt(0, API_KEY.length)]}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.items || data.items.length === 0) {
            throw new Error('No channel data found');
        }

        const subscriberCount = data.items[0].statistics.subscriberCount;
        document.getElementById('subCount').innerText = `${subscriberCount}`;
    } catch (error) {
        console.error('Error fetching subscriber count:', error);
        document.getElementById('subCount').innerText = '1,00,000';
    }
}
async function fetchTotalViews() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY[getRandomInt(0, API_KEY.length)]}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.items || data.items.length === 0) {
            throw new Error('No channel data found');
        }

        const viewCountwihtoutcommas = data.items[0].statistics.viewCount;
        viewCount = viewCountwihtoutcommas.toLocaleString();
        document.getElementById('viewsCount').innerText = `${viewCount}`;
    } catch (error) {
        console.error('Error fetching total views:', error);
        document.getElementById('viewsCount').innerText = '3,00,00,000';
    }
}
async function fetchShortViews() {
    try {
        const shortsResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${CHANNEL_ID}&maxResults=9&type=video&key=${API_KEY[getRandomInt(0,API_KEY.length)]}`);
        const shortsData = await shortsResponse.json();
        const shorts = shortsData.items;
        const shortsContainer = document.querySelector('.shorts');

        shorts.forEach(async short => {
            const videoId = short.id.videoId;
            const thumbnailUrl = short.snippet.thumbnails.medium.url;
            const title = short.snippet.title;
            const viewsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY[getRandomInt(0,3)]}`);
            const viewsData = await viewsResponse.json();
            const viewnum = viewsData.items[0].statistics.viewCount;
            function formatNumber(num) {
                if (num >= 1000) {
                    return (num / 1000).toFixed(1) + 'K';
                }
                return num.toString();
            };
            const views = formatNumber(viewnum);
            const shortElement = document.createElement('div');
            shortElement.className = 'short';
            shortElement.innerHTML = `
                    <a href="https://youtube.com/watch?v=${videoId}" target="_blank">
                        <img src="${thumbnailUrl}" id='shortimg' alt="${title}">
                        <div id='shortcontent'>
                            <img src="view.png" id='viewicon' alt=''>
                            <span class="views"> ${views}</span>
                        </div>
                        <p class='shorttitle'>${title}</p>
                        
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
