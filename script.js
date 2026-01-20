// Generate floating particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 6 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    particlesContainer.appendChild(particle);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .feature-item, .nepal-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// LEADERBOARD DATA
const leaderboardData = {
    workers: [
        {
            id: 1, name: "Rajesh Thapa", org: "Himalayan Tech", avatar: "RT",
            carbonSaved: 245.8, rank: 1, level: 15, streak: 42,
            activities: { walk: 45, publicTransport: 32, cycling: 18, meatless: 28 }
        },
        {
            id: 2, name: "Sita Gurung", org: "Nepal Telecom", avatar: "SG",
            carbonSaved: 223.4, rank: 2, level: 14, streak: 35,
            activities: { walk: 38, publicTransport: 40, cycling: 15, meatless: 30 }
        },
        {
            id: 3, name: "Anil Shrestha", org: "Ncell Pvt Ltd", avatar: "AS",
            carbonSaved: 198.2, rank: 3, level: 13, streak: 28,
            activities: { walk: 42, publicTransport: 28, cycling: 12, meatless: 25 }
        },
        {
            id: 4, name: "Binita Rai", org: "Cloud Factory", avatar: "BR",
            carbonSaved: 187.5, rank: 4, level: 12, streak: 31,
            activities: { walk: 35, publicTransport: 35, cycling: 10, meatless: 27 }
        },
        {
            id: 5, name: "Prakash Lama", org: "Leapfrog Tech", avatar: "PL",
            carbonSaved: 175.9, rank: 5, level: 12, streak: 24,
            activities: { walk: 40, publicTransport: 25, cycling: 8, meatless: 22 }
        }
    ],
    students: [
        {
            id: 6, name: "Mishel Rai", org: "Kathmandu University", avatar: "MR",
            carbonSaved: 267.3, rank: 1, level: 16, streak: 48,
            activities: { walk: 52, publicTransport: 45, cycling: 25, meatless: 35 }
        },
        {
            id: 7, name: "Prabesh Karki", org: "Tribhuvan University", avatar: "PK",
            carbonSaved: 234.6, rank: 2, level: 15, streak: 40,
            activities: { walk: 48, publicTransport: 38, cycling: 20, meatless: 32 }
        },
        {
            id: 8, name: "Sujata Tamang", org: "Pulchowk Campus", avatar: "ST",
            carbonSaved: 212.8, rank: 3, level: 14, streak: 36,
            activities: { walk: 45, publicTransport: 35, cycling: 18, meatless: 28 }
        },
        {
            id: 9, name: "Rohan Basnet", org: "St. Xavier's College", avatar: "RB",
            carbonSaved: 195.4, rank: 4, level: 13, streak: 29,
            activities: { walk: 40, publicTransport: 32, cycling: 15, meatless: 26 }
        },
        {
            id: 10, name: "Anisha Adhikari", org: "ACHS College", avatar: "AA",
            carbonSaved: 183.7, rank: 5, level: 12, streak: 27,
            activities: { walk: 38, publicTransport: 30, cycling: 12, meatless: 24 }
        }
    ],
    free: [
        {
            id: 11, name: "Deepak Maharjan", org: "Patan, Lalitpur", avatar: "DM",
            carbonSaved: 289.5, rank: 1, level: 17, streak: 55,
            activities: { walk: 60, publicTransport: 42, cycling: 30, meatless: 40 }
        },
        {
            id: 12, name: "Rina Shakya", org: "Bhaktapur", avatar: "RS",
            carbonSaved: 256.2, rank: 2, level: 16, streak: 45,
            activities: { walk: 55, publicTransport: 38, cycling: 28, meatless: 36 }
        },
        {
            id: 13, name: "Suresh Dangol", org: "Thamel, Kathmandu", avatar: "SD",
            carbonSaved: 241.8, rank: 3, level: 15, streak: 42,
            activities: { walk: 50, publicTransport: 40, cycling: 22, meatless: 34 }
        },
        {
            id: 14, name: "Kopila Magar", org: "Pokhara", avatar: "KM",
            carbonSaved: 218.3, rank: 4, level: 14, streak: 38,
            activities: { walk: 46, publicTransport: 35, cycling: 20, meatless: 30 }
        },
        {
            id: 15, name: "Bishal Thakuri", org: "Boudha, Kathmandu", avatar: "BT",
            carbonSaved: 203.6, rank: 5, level: 13, streak: 33,
            activities: { walk: 42, publicTransport: 33, cycling: 16, meatless: 28 }
        }
    ]
};

// Combine all for "all" category
const allUsers = [...leaderboardData.workers, ...leaderboardData.students, ...leaderboardData.free]
    .sort((a, b) => b.carbonSaved - a.carbonSaved)
    .map((user, index) => ({ ...user, rank: index + 1 }))
    .slice(0, 10);

// Get rank class
function getRankClass(rank) {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return 'rank-default';
}

// Get rank display
function getRankDisplay(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
}

// Render leaderboard
function renderLeaderboard(category) {
    let data;
    switch(category) {
        case 'workers':
            data = leaderboardData.workers;
            break;
        case 'students':
            data = leaderboardData.students;
            break;
        case 'free':
            data = leaderboardData.free;
            break;
        default:
            data = allUsers;
    }

    const container = document.getElementById('leaderboardContainer');
    container.innerHTML = data.map(user => `
        <div class="leaderboard-item">
            <div class="rank-badge ${getRankClass(user.rank)}">
                ${getRankDisplay(user.rank)}
            </div>
            
            <div class="user-avatar">${user.avatar}</div>
            
            <div class="user-info">
                <div class="user-name">
                    ${user.name}
                    <span class="level-badge">
                        ⚡ Lvl ${user.level}
                    </span>
                </div>
                <div class="user-org">${user.org}</div>
                
                <div class="activity-grid">
                    <div class="activity-item">
                        <span class="activity-label">Walking</span>
                        <span class="activity-value">${user.activities.walk} days</span>
                    </div>
                    <div class="activity-item">
                        <span class="activity-label">Transit</span>
                        <span class="activity-value">${user.activities.publicTransport} rides</span>
                    </div>
                    <div class="activity-item">
                        <span class="activity-label">Cycling</span>
                        <span class="activity-value">${user.activities.cycling} trips</span>
                    </div>
                    <div class="activity-item">
                        <span class="activity-label">Meatless</span>
                        <span class="activity-value">${user.activities.meatless} meals</span>
                    </div>
                </div>
                
                <span class="streak-badge">
                    🔥 ${user.streak} day streak
                </span>
            </div>
            
            <div class="carbon-saved">
                <div class="carbon-amount">
                    🌱 ${user.carbonSaved}
                </div>
                <div class="carbon-label">kg CO₂ saved</div>
                <div class="trees-equivalent">≈ ${(user.carbonSaved / 21).toFixed(1)} trees planted</div>
            </div>
        </div>
    `).join('');
}

// Category tab switching
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        renderLeaderboard(category);
    });
});

// Initial render
renderLeaderboard('all');