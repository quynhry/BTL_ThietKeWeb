const cards = document.querySelectorAll('.card_cm');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {

        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const centerX = rect.left + width / 2;
        const centerY = rect.top + height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = Math.max(Math.min((mouseY / height) * 75, 75), -75);
        const rotateY = Math.max(Math.min((mouseX / width) * -75, 75), -75);

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.2s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});
