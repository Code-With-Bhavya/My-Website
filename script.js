const API_KEYS = [
  // 'AIzaSyAf0edYw94yUvMuLmEf5CVUw11XrpHT_5U',
  'AIzaSyCGRQ9QiwOsZdbaUG6I0tFIUdsdfdOx9YE', //working
  'AIzaSyBRG6SMwIu4JrZM_KXJbU_SWL-u_X0ToWQ', //working
  // 'AIzaSyAvymR0iK-HJT3el82J4pqaCCAsLdfGTY8',
  // 'AIzaSyBeetgOLmBUZZyu5mDoqyYHYNu5AOg_ZJw',
  // 'AIzaSyDgfSmkaCtIh0yOdkyDke_vm7yYekxxJII',
  // 'AIzaSyB0mNeefxpygxDi9BHo8az4T7HW2RlDJ5s',
  // 'AIzaSyCFPUfeGgz-ENmUY16qypYHPYj8NglYDT4',
  'AIzaSyAETzrtqnIFQ2VrvDLrWUapoyXN-8k1I50', //working
  // 'AIzaSyC8mo_BZz01zzPFDDas7gixCsnj8I2EXuQ', 
  'AIzaSyBEKVTxfu6eWEdpBYqeOnlbkGRaYUxrpN4',//working
  // 'AIzaSyD0mFcvcsMt9ff0j5JaSK4yH7pisalHGLM'
]; // Replace with your API keys
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
  sidebar.style.width = sidebar.style.width === "330px" ? "0" : "330px";
}

async function fetchYouTubeData() {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEYS[getRandomInt(0, API_KEYS.length)]}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    if (!data.items || data.items.length === 0) throw new Error('No channel data found');

    const stats = data.items[0].statistics;
    const subscriberCount = stats.subscriberCount;
    const viewCountWithoutCommas = stats.viewCount;
    const viewCount = viewCountWithoutCommas.toLocaleString();

    function formatNumber(num) {
      return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();
    }
    document.getElementById('subCount').innerText = `${subscriberCount}`;
    document.getElementById('viewsCount').innerText = `${formatNumber(viewCount)}`;
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    document.getElementById('subCount').innerText = '1,00,000';
    document.getElementById('viewsCount').innerText = '3,00,00,000';
  }
}
async function getChessComRatings(username) {
  try {
    const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
    const data = await response.json();

    if (data.chess_rapid) {
      chess = document.getElementById('chesselo');
      chesselo.innerText = `${data.chess_rapid.last.rating}`;
    }
  } catch (error) {
    chess = document.getElementById('chesselo');
    chesselo.innerText = '1500';

  }
}
async function fetchShortViews() {
  try {
    const shortsResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${CHANNEL_ID}&maxResults=9&type=video&key=${API_KEYS[getRandomInt(0, API_KEYS.length)]}`);
    if (!shortsResponse.ok) throw new Error(`HTTP error! Status: ${shortsResponse.status}`);

    const shortsData = await shortsResponse.json();
    const shorts = shortsData.items;
    const shortsContainer = document.querySelector('.shorts');

    shorts.forEach(async short => {
      const videoId = short.id.videoId;
      const thumbnailUrl = short.snippet.thumbnails.medium.url;
      const title = short.snippet.title;

      const viewsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEYS[getRandomInt(0, API_KEYS.length)]}`);
      if (!viewsResponse.ok) throw new Error(`HTTP error! Status: ${viewsResponse.status}`);

      const viewsData = await viewsResponse.json();
      const viewnum = viewsData.items[0].statistics.viewCount;

      function formatNumber(num) {
        return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();
      }

      const views = formatNumber(viewnum);
      const shortElement = document.createElement('div');
      shortElement.className = 'short';
      shortElement.innerHTML = `
          <a href="https://youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnailUrl}" id='shortimg' alt="${title}">
            <div id='shortcontent'>
              <img src="images/view.png" id='viewicon' alt=''>
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
getChessComRatings('guptabhavya_281208');
fetchYouTubeData();
fetchShortViews();
//rating
function ratingsub() {
  var newDiv = document.createElement('div');
  newDiv.className = 'thankstext';
  var name = document.getElementById('nameent').value;
  var rat = document.getElementById('ratingent').value;
  if (name == '' || rat == '') {
    alert('Please Enter you name or rating before submission..')
    return
  }
  newDiv.innerHTML = `Thanks For submitting your rating ${name}.. Your rating ${rat} has been stored in our local storage and will be displayed in the leaderboard sonn..`;
  document.getElementById('ratingcol').appendChild(newDiv);
  
  const saveData = async () => {
    try {
      const response = await fetch('http://localhost:3000/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, rat }),
      });

      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  saveData();
}



