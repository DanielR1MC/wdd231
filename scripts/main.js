const menuToggle = document.getElementById('menuToggle');
const navBar = document.getElementById('navBar');

menuToggle.addEventListener('click', () => {
    navBar.classList.toggle('show');
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students deepen their programming skills.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the concepts of object-oriented programming.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior knowledge of Web Fundamentals.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on user experience, accessibility, and modern web frameworks.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const coursesGrid = document.getElementById('coursesGrid');
const creditsInfo = document.getElementById('creditsInfo');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(filteredCourses) {
    coursesGrid.innerHTML = '';
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        courseCard.classList.add(course.completed ? 'completed' : 'pending');
        courseCard.textContent = `${course.subject} ${course.number}`;
        coursesGrid.appendChild(courseCard);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsInfo.textContent = `The total number of credits listed below is ${totalCredits}`;
}

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.getAttribute('data-filter');
        if (filter === 'all') {
            renderCourses(courses);
        } else {
            const filtered = courses.filter(course => course.subject.toLowerCase() === filter);
            renderCourses(filtered);
        }
    });
});

renderCourses(courses);

document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;