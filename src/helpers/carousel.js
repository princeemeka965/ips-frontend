export default function carousel() {
    const imgArray = [
        {
            id: 1,
            subset:
                '../src/assets/carousel-photo-01@2x.jpg 2x ../src/icons/carousel-photo-01@3x.jpg 3x',
            value: '../src/icons/carousel-photo-01.jpg',
            thumbnailSet: '../src/assets/icons/small-carousel-photo-01@2x.jpg 2x ../src/assets/icons/small-carousel-photo-01@3x.jpg 3x',
            thumbnail: '../src/assets/icons/small-carousel-photo-01.jpg',
        },
        {
            id: 2,
            subset:
                '../src/assets/icons/carousel-photo-02@2x.jpg 2x ../src/assets/icons/carousel-photo-02@3x.jpg 3x',
            value: '../src/assets/icons/carousel-photo-02.jpg',
            thumbnailSet: '../src/assets/icons/small-carousel-photo-02@2x.jpg 2x ../src/assets/icons/small-carousel-photo-02@3x.jpg 3x',
            thumbnail: '../src/assets/icons/small-carousel-photo-02.jpg',
        },
        {
            id: 3,
            subset:
                '../src/assets/icons/carousel-photo-03@2x.jpg 2x ../src/assets/icons/carousel-photo-03@3x.jpg 3x',
            value: '../src/assets/icons/carousel-photo-03.jpg',
            thumbnailSet: '../src/assets/icons/small-carousel-photo-03@2x.jpg 2x ../src/assets/icons/small-carousel-photo-03@3x.jpg 3x',
            thumbnail: '../src/assets/icons/small-carousel-photo-03.jpg',
        },
        {
            id: 4,
            subset:
                '../src/assets/icons/carousel-photo-04@2x.jpg 2x ../src/assets/icons/carousel-photo-04@3x.jpg 3x',
            value: '../src/assets/icons/carousel-photo-04.jpg',
            thumbnailSet: '../src/assets/icons/small-carousel-photo-04@2x.jpg 2x ../src/assets/icons/small-carousel-photo-04@3x.jpg 3x',
            thumbnail: '../src/assets/icons/small-carousel-photo-04.jpg',
        },
    ];
    // NB: You can push more objects into the (imgArray) array

    // Get total Length of image array set above.
    // This will define for us the number of image sets we are working with
    const imageLength = imgArray.length;
    
    
    function slideImage(index) {
        let currentImage = {};

        // filter through to get the required array of object based on id number passed
        const currentArrayImage = imgArray.filter((array) => array.id === index);

        // convert the array of object to a plain Javascript object
        // First, loop through the filtered array
        for (let i = 0; i < currentArrayImage.length; i++) {
            Object.assign(currentImage, currentArrayImage[i]);
        }

        return currentImage;
    }

    function slideThumbnailImage(index) {
        let currentImage = {};

        // filter through to get the required array of object based on id number passed
        const currentArrayImage = imgArray.filter((array) => array.id === index);

        // convert the array of object to a plain Javascript object
        // First, loop through the filtered array
        for (let i = 0; i < currentArrayImage.length; i++) {
            Object.assign(currentImage, currentArrayImage[i]);
        }

        return currentImage;
    }

    return {
        slideImage,
        imageLength,
        slideThumbnailImage
    }

}