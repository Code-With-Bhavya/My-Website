let index = 0;
let f = false;

// Function to show slide
function showSlide(n) {
    const slides = document.querySelector('.slides');
    const slideCount = document.querySelectorAll('.slide').length;
    if (n >= slideCount) {
        index = 0;
    } else if (n < 0) {
        index = slideCount - 1;
    } else {
        index = n;
    }
    slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

// Initial setup
showSlide(index);

async function practisetip1() {
    document.querySelector('.practise').style.display = 'none';
    document.querySelector('#dn').style.display = 'none';

    const slide1 = document.querySelector('#toberemoved');
    let textContent = slide1.innerHTML;
    const lengthToTrim = textContent.length;

    // Function to remove text one character at a time
    function removeText() {
        return new Promise(resolve => {
            let i = 0;
            function step() {
                if (i < lengthToTrim) {
                    textContent = textContent.slice(0, -1);
                    slide1.innerHTML = textContent;
                    i++;
                    setTimeout(step, 4); // Adjust timing for smoother animation
                } else {
                    resolve();
                }
            }
            step();
        });
    }

    await removeText();

    // Animation and image changes
    const img1 = document.querySelector('#img1');
    img1.style.transition = 'transform 1s'; // Smooth transition
    img1.style.transform = 'translateY(50%)';

    setTimeout(() => {
        img1.style.transform = 'translateY(50%) translateX(10%)'; // Move image right
    }, 600);

    setTimeout(() => {
        const head = document.querySelector('#letsmove');
        head.style.transition = 'transform 1s';
        head.style.transform = 'translateX(-20%)';
    }, 1400);

    setTimeout(() => {
        img1.src = 'tip1change.jpg';
    }, 2500);

    setTimeout(() => {
        img1.style.transition = 'border-radius 1s';
        img1.style.borderRadius = '10px';
    }, 3500);

    setTimeout(() => {
        slide1.innerHTML = 'Now think where you should move your king now either d1 or f1 ..<input placeholder="Enter your move(kd1 or kf1)" id="inputmove"></input>';
        f = true;
        addInputListener(); // Add listener after setting HTML
    }, 4200);
}

// Function to add input listener
function addInputListener() {
    const inputElement = document.getElementById('inputmove');
    if (inputElement) {
        inputElement.addEventListener('change', checkInput);
    } else {
        console.error('Input element not found');
    }
}

function checkInput() {
    const slide1 = document.querySelector('#toberemoved');
    const givenInput = document.getElementById('inputmove').value;

    if (givenInput === 'kd1') {
        slide1.innerHTML = 'Now think where you should move your king now either d1 or f1 ..<input placeholder="Enter your move(kd1 or kf1)" id="inputmove"></input><br>Yeah!! Kd1 is the right move but hard to find. If Kf1 we got into trouble since Black can play Re8 with the threat of Re1 (the bishop helps in the attack).But the biggest reason for Kd1 is to get the h1 rook involved. With the King of f1, it is hemmed in and has no activity. White is a little worse after Kd1 but can equalize comfortably after a few defensive moves.';
    } else {
        slide1.innerHTML = 'Now think where you should move your king now either d1 or f1 ..<input placeholder="Enter your move(kd1 or kf1)" id="inputmove"></input><br>Oops, Try again.. Try to think the disadvantage with kf1..';
    }
}
