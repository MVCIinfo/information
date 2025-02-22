const images = [
    'images/image01.png',
    'images/image02.png',
    'images/image03.png',
    'images/image04.png',
    'images/image05.png',
    'images/image06.png',
    'images/image07.png',
    'images/image08.png',
    'images/image09.png',
    'images/image10.png',
    'images/image11.png',
    'images/image12.png',
    'images/image13.png',
    'images/image14.png',
    'images/image15.png',
    'images/image16.png',
    'images/image17.png',
    'images/image18.png',
    'images/image19.png',
    'images/image20.png',
    'images/image21.png',
    'images/image22.png',
    'images/image23.png',
    'images/image24.png',
    'images/image25.png',
    'images/image26.png',
    'images/image27.png',
    'images/image28.png',
    'images/image29.png',
    'images/image30.png',
    'images/image31.png',
    'images/image32.png',
    'images/image33.png',
    'images/image34.png',
    'images/image35.png',
    'images/image36.png',
    'images/image37.png',
    'images/image38.png',
    'images/image39.png',
    'images/image40.png',
    'images/image41.png',
    'images/image42.png',
    'images/image43.png',
    'images/image44.png',
    'images/image45.png',
    'images/image46.png',
    'images/image47.png',
    'images/image48.png',
    'images/image49.png',
    'images/image50.png',
    'images/image51.png',
    'images/image52.png',
    'images/image53.png',
    'images/image54.png',
    'images/image55.png',
    'images/image56.png',
    'images/image57.png',
    'images/image58.png',
    'images/image59.png',
    'images/image60.png',
    'images/image61.png',
    'images/image62.png',
    'images/image63.png',
    'images/image64.png',
    'images/image65.png',
    'images/image66.png',
    'images/image67.png',
    'images/image68.png',
    'images/image69.png',
    'images/image70.png',
    'images/image71.png',
    'images/image72.png',
    'images/image73.png',
    'images/image74.png',
    'images/image75.png',
    'images/image76.png',
    'images/image77.png',
    'images/image78.png',
    'images/image79.png',
    'images/image80.png',
    'images/image81.png',
    'images/image82.png',
    'images/image83.png',
    'images/image84.png',
    'images/image85.png',
    'images/image86.png',
    'images/image87.png',
    'images/image88.png',
    'images/image89.png',
    'images/image90.png',
    'images/image91.png',
    'images/image92.png',

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