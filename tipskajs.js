let index = 0;

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

function practisetip1() {
    document.querySelector('.practise').style.display = 'none';
    document.querySelector('#dn').style.display = 'none';

    const slide1 = document.querySelector('#toberemoved');
    let textContent = slide1.innerHTML;
    const lengthToTrim = textContent.length;

    for (let i = 0; i < lengthToTrim; i++) {
        setTimeout(() => {
            if (textContent.length > 0) {
                textContent = textContent.slice(0, -1);
                slide1.innerHTML = textContent;


                if (textContent.length <= 1) {
                    const img1 = document.querySelector('#img1');
                    img1.style.transition = 'transform 1s'; // Smooth transition

                    // Move image down
                    img1.style.transform = 'translateY(50%)';

                    // Move image to the right after 1 second
                    setTimeout(() => {
                        img1.style.transition = 'transform 1s'; // Reset transition for next movement
                        img1.style.transform = 'translateY(50%) translateX(10%)'; // Move image right
                    }, 600);
                }
                setTimeout(() => {
                    const head = document.querySelector('#letsmove');
                    head.style.transition = 'transform 1s';
                    head.style.transform = 'translateX(-20%)';
                }, 2900);

                setTimeout(() => {
                    img1.src = 'tip1change.jpg';
                }, 4000);
                setTimeout(() => {
                    img1.style.transition = 'border-radius 1s';
                    img1.style.borderRadius = '10px'
                }, 4900);
            }
        }, i * 4); // Adjust timing for smoother animation
    }
}

