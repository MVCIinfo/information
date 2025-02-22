const images = [
    'images/01.png',
    'images/02.png',
    'images/03.png',
    'images/04.png',
    'images/05.png',
    'images/06.png',
    'images/07.png',
    'images/08.png',
    'images/09.png',
    'images/10.png',
    'images/11.png',
    'images/12.png',
    'images/13.png',
    'images/14.png',
    'images/15.png',
    'images/16.png',
    'images/17.png',
    'images/18.png',
    'images/19.png',
    'images/20.png',
    'images/21.png',
    'images/22.png',
    'images/23.png',
    'images/24.png',
    'images/25.png',
    'images/26.png',
    'images/27.png',
    'images/28.png',
    'images/29.png',
    'images/30.png',
    'images/31.png',
    'images/32.png',
    'images/33.png',
    'images/34.png',
    'images/35.png',
    'images/36.png',
    'images/37.png',
    'images/38.png',
    'images/39.png',
    'images/40.png',
    'images/41.png',
    'images/42.png',
    'images/43.png',
    'images/44.png',
    'images/45.png',
    'images/46.png',
    'images/47.png',
    'images/48.png',
    'images/49.png',
    'images/50.png',
    'images/51.png',
    'images/52.png',
    'images/53.png',
    'images/54.png',
    'images/55.png',
    'images/56.png',
    'images/57.png',
    'images/58.png',
    'images/59.png',
    'images/60.png',
    'images/61.png',
    'images/62.png',
    'images/63.png',
    'images/64.png',
    'images/65.png',
    'images/66.png',
    'images/67.png',
    'images/68.png',
    'images/69.png',
    'images/70.png',
    'images/71.png',
    'images/72.png',
    'images/73.png',
    'images/74.png',
    'images/75.png',
    'images/76.png',
    'images/77.png',
    'images/78.png',
    'images/79.png',
    'images/80.png',
    'images/81.png',
    'images/82.png',
    'images/83.png',
    'images/84.png',
    'images/85.png',
    'images/86.png',
    'images/87.png',
    'images/88.png',
    'images/89.png',
    'images/90.png',
    'images/91.png',
    'images/92.png',

];
let currentIndex = 0;
let isPlaying = false;
let intervalId;
const imageElement = document.getElementById('image');
const counterElement = document.getElementById('counter');
const prevButton = document.getElementById('prev');
const pauseButton = document.getElementById('pause');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const speedSelect = document.getElementById('speed');
const markersElement = document.getElementById('markers');
const indicatorElement = document.getElementById('indicator');

const colors = {
    0: 'black',
    1: 'red',
    2: 'blue',
    3: 'yellow',
    4: 'green',
    5: 'pink',
    6: 'brown',
    7: 'lightgreen',
    8: 'cyan',
    9: 'orange'
};

const colorIndices = [
    [1, 0], // 初期値は黒
    [9, 5],
    [15, 8],
    [27, 1],
    [69, 4]
//    [30, 5],
//    [40, 8],
//    [73, 9],
//    [80, 6],
//    [91, 4],
//    [100, 0]
];

function showImage(index) {
    imageElement.src = images[index];
    counterElement.textContent = `${index + 1}/${images.length}`;
    updateMarkers(index);
}

function updateMarkers(index) {
    let markers = '';
    for (let i = 0; i < images.length; i++) {
        let color = 'black';
        for (let j = 0; j < colorIndices.length; j++) {
            if (i + 1 >= colorIndices[j][0]) {
                color = colors[colorIndices[j][1]];
            }
        }
        markers += `<span style="color: ${color};" data-index="${i}">|</span>`;
    }
    markersElement.innerHTML = markers;
    indicatorElement.textContent = ' '.repeat(index) + '^' + ' '.repeat(images.length - index - 1);

    // マーカークリックイベントを追加
    document.querySelectorAll('#markers span').forEach(marker => {
        marker.addEventListener('click', (event) => {
            const newIndex = parseInt(event.target.getAttribute('data-index'));
            stopSlideshow();
            currentIndex = newIndex;
            showImage(currentIndex);
        });
    });
}

function startSlideshow() {
    if (!isPlaying) {
        isPlaying = true;
        const fps = parseInt(speedSelect.value);
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 1000 / fps);
    }
}

function stopSlideshow() {
    if (isPlaying) {
        clearInterval(intervalId);
        isPlaying = false;
    }
}

function toggleSlideshow() {
    if (isPlaying) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
}

playButton.addEventListener('click', () => {
    startSlideshow();
});

pauseButton.addEventListener('click', () => {
    if (isPlaying) {
        stopSlideshow();
    } else {
        currentIndex = 0;
        showImage(currentIndex);
    }
});

prevButton.addEventListener('click', () => {
    stopSlideshow();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

nextButton.addEventListener('click', () => {
    stopSlideshow();
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

speedSelect.addEventListener('change', () => {
    if (isPlaying) {
        stopSlideshow();
        startSlideshow();
    }
});

imageElement.addEventListener('click', toggleSlideshow);

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
        case 'Enter':
            toggleSlideshow();
            break;
        case 'ArrowLeft':
            prevButton.click();
            break;
        case 'ArrowRight':
            nextButton.click();
            break;
    }
});

// 初期表示
showImage(currentIndex);