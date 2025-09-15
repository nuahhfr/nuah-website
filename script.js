document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('random');
    const mainContainer = document.getElementById('Main');
    const secondContainer = document.getElementById('second');
    let thirdContainer = null;

    const totalPhotos = 353;
    const numberOfPhotosToShow = 60;
    let currentZIndex = 2;

    const images = [];
    const photoIndices = Array.from({ length: totalPhotos }, (_, i) => i + 1);

    const categories = {
        "concert_folder.png": { folder: "photo_concert", totalPhotos: 220 },
        "skate_folder.png": { folder: "photo_skate", totalPhotos: 63 },
        "fleurs_folder.png": { folder: "photo_fleurs", totalPhotos: 143 },
        "sandbox_folder.png": { folder: "photo_sandbox", totalPhotos: 154 },
        "work_folder.png": { folder: "photo_work", totalPhotos: 41 },
        "about_folder.png": { folder: "photo_about", totalPhotos: 1 },
        "contact_folder.png": { folder: "photo_contact", totalPhotos: 0 },
    };

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    shuffle(photoIndices);
    const selectedIndices = photoIndices.slice(0, numberOfPhotosToShow);

    let imagesLoaded = 0;

    selectedIndices.forEach((index) => {
        const img = new Image();
        img.src = `photo_random/random${index}.jpg`;
        img.classList.add('image');
        img.onload = function () {
            imagesLoaded++;
            if (imagesLoaded === numberOfPhotosToShow) {
                displayImages();
            }
        };
        images.push(img);
    });

    function createImageContainer(image, x = 0, y = 0, size = 100) {
        const div = document.createElement('div');
        div.classList.add('image-container');
        div.style.top = (Math.random() * 75) - 2 + 'vh';
        div.style.left = (Math.random() * 80) - 40 + 'vw';

        const overlayImage = new Image();
        overlayImage.src = 'assets/portrait_vierge.png';
        overlayImage.classList.add('overlay-image');

        const closeButton = document.createElement('div');
        closeButton.classList.add('close-button');
        closeButton.textContent = 'XXX';
        closeButton.onclick = function (event) {
            event.stopPropagation();
            div.remove();
        };

        div.onclick = function () {
            currentZIndex++;
            div.style.zIndex = currentZIndex;
            removeLogoAndArrow();
        };

        container.appendChild(div);
        div.appendChild(overlayImage);
        div.appendChild(image);
        div.appendChild(closeButton);
    }

    function displayImages() {
        images.forEach((image, index) => {
            setTimeout(() => {
                createImageContainer(image);
                document.querySelectorAll('.image-container')[index].style.opacity = 1;
            }, index * 40);
        });

        setTimeout(() => {
            showLogo();
        }, numberOfPhotosToShow * 40);

        setTimeout(() => {
            showArrow();
        }, numberOfPhotosToShow * 40 + 500);
    }

    function showLogo() {
        const logo = document.createElement('img');
        logo.src = 'assets/nuah_logo.png';
        logo.id = 'nuah-logo';
        logo.style.opacity = 0;
        logo.style.transition = 'opacity 1s';

        mainContainer.appendChild(logo);

        setTimeout(() => {
            logo.style.opacity = 1;
        }, 5);
    }

    function showArrow() {
        const arrow = document.createElement('img');
        arrow.src = 'assets/arrow.png';
        arrow.id = 'arrow';
        arrow.classList.add('animated-arrow');
        arrow.style.opacity = 0;
        arrow.style.transition = 'opacity 1s';
        arrow.style.cursor = 'pointer';

        mainContainer.appendChild(arrow);

        setTimeout(() => {
            arrow.style.opacity = 1;
        }, 5);

        arrow.addEventListener('click', function () {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth',
            });
            arrow.remove();
        });
    }

    function removeLogoAndArrow() {
        const logo = document.getElementById('nuah-logo');
        if (logo) logo.remove();

        const arrow = document.getElementById('arrow');
        if (arrow) arrow.remove();
    }

    function createThirdContainer(folderConfig) {
        if (thirdContainer) {
            thirdContainer.remove();
        }

        const { folder, totalPhotos } = folderConfig;

        thirdContainer = document.createElement('div');
        thirdContainer.id = 'troisieme';

        if (folder === "photo_about") {
            thirdContainer.style.position = 'absolute';
            thirdContainer.style.top = '200vh';
            thirdContainer.style.width = '100vw';
            thirdContainer.style.height = '100vh';
            thirdContainer.style.backgroundColor = '#ffffff';
            thirdContainer.style.display = 'flex';
            thirdContainer.style.justifyContent = 'center';
            thirdContainer.style.alignItems = 'center';

            const aboutImg = document.createElement('img');
            aboutImg.src = `${folder}/about1.png`;
            aboutImg.classList.add('about1');
            thirdContainer.appendChild(aboutImg);

        } else if (folder === "photo_contact") {
            thirdContainer.style.position = 'absolute';
            thirdContainer.style.top = '200vh';
            thirdContainer.style.width = '100vw';
            thirdContainer.style.height = '100vh';
            thirdContainer.style.backgroundColor = '#ffffff';
            thirdContainer.style.display = 'flex';
            thirdContainer.style.flexDirection = 'column';
            thirdContainer.style.justifyContent = 'center';
            thirdContainer.style.alignItems = 'center';

            const instagramLink = document.createElement('a');
            instagramLink.href = 'https://www.instagram.com/nuahh.fr/';
            instagramLink.target = '_blank';
            instagramLink.textContent = 'INSTAGRAM';
            instagramLink.style.fontFamily = 'Helvetica Neue';
            instagramLink.style.fontWeight = 'bold';
            instagramLink.style.fontStyle = 'italic';
            instagramLink.style.color = 'black';
            instagramLink.style.margin = '10px';
            instagramLink.style.fontSize = '2.5rem';
            thirdContainer.appendChild(instagramLink);

            const mailtoLink = document.createElement('a');
            mailtoLink.href = 'mailto:contact@nuahh.fr';
            mailtoLink.textContent = 'contact@nuahh.fr';
            mailtoLink.style.fontFamily = 'Helvetica Neue';
            mailtoLink.style.fontWeight = 'bold';
            mailtoLink.style.fontStyle = 'italic';
            mailtoLink.style.color = 'black';
            mailtoLink.style.margin = '10px';
            mailtoLink.style.fontSize = '2.5rem';
            thirdContainer.appendChild(mailtoLink);

        } else {
            thirdContainer.style.position = 'absolute';
            thirdContainer.style.top = '200vh';
            thirdContainer.style.backgroundColor = '#ffffff';
            thirdContainer.style.display = 'grid';

            const isLandscape = window.innerWidth > window.innerHeight;
            thirdContainer.style.gridTemplateColumns = isLandscape
                ? 'repeat(4, 1fr)'
                : 'repeat(2, 1fr)';

            const photoIndices = Array.from({ length: totalPhotos }, (_, i) => i + 1);
            shuffle(photoIndices);

            const selectedPhotos = photoIndices.slice(0, Math.min(32, totalPhotos));
            selectedPhotos.forEach((index) => {
                const img = document.createElement('img');
                img.src = `${folder}/${folder.split('_')[1]}${index}.jpg`;
                img.classList.add('third-photo');
                thirdContainer.appendChild(img);
            });
        }

        document.body.appendChild(thirdContainer);

        window.scrollTo({
            top: window.innerHeight * 2,
            behavior: 'smooth',
        });
    }

    document.querySelectorAll('#static-images img').forEach((folderImage) => {
        folderImage.addEventListener('click', function () {
            const category = categories[folderImage.src.split('/').pop()];
            if (category) {
                createThirdContainer(category);
            }
        });
    });

    window.closeAllImages = function () {
        location.reload();
    };
});