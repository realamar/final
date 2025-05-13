// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add typing effect to the professional summary
const summaryText = document.querySelector('.summary p');
if (summaryText) {
    const text = summaryText.textContent;
    summaryText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            summaryText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    // Start typing effect when the summary section is in view
    const summaryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                summaryObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    summaryObserver.observe(summaryText);
}

// Add skill level indicators
document.querySelectorAll('.skill-category li').forEach(skill => {
    const level = document.createElement('div');
    level.className = 'skill-level';
    level.style.width = '100%';
    level.style.height = '4px';
    level.style.backgroundColor = 'var(--background-light)';
    level.style.borderRadius = '2px';
    level.style.marginTop = '0.5rem';
    
    const progress = document.createElement('div');
    progress.style.width = '0%';
    progress.style.height = '100%';
    progress.style.backgroundColor = 'var(--primary-color)';
    progress.style.borderRadius = '2px';
    progress.style.transition = 'width 1s ease-in-out';
    
    level.appendChild(progress);
    skill.appendChild(level);
    
    // Animate skill level when in view
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progress.style.width = '85%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillObserver.observe(skill);
}); 