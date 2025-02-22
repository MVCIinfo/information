const images = [
    'images/image00.png',
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
    'images/image35.png'
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

function displayRandomImages() {
    let leftImage = getRandomImage();
    let rightImage = getRandomImage();

    // Ensure the two images are different
    while (leftImage === rightImage) {
        rightImage = getRandomImage();
    }

    console.log('Left Image:', leftImage);  // デバッグ用
    console.log('Right Image:', rightImage);  // デバッグ用

    document.getElementById('leftImage').src = leftImage;
    document.getElementById('rightImage').src = rightImage;
}

// Display images when the page loads
window.onload = displayRandomImages;