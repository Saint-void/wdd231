const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

const courseList = document.getElementById('course-list');
const totalCreditsElement = document.querySelector('#total-credits span');

function renderCourses(courseArray) {
    courseList.innerHTML = ''; // Clear current list
    
    courseArray.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-item');
        if (course.completed) {
            courseDiv.classList.add('completed');
        }
        courseDiv.textContent = `${course.subject} ${course.number}`;
        courseList.appendChild(courseDiv);
    });

    // Calculate total credits dynamically using reduce
    const totalCredits = courseArray.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}

// Initial render of all courses
renderCourses(courses);

// Event Listeners for Filters
document.getElementById('btn-all').addEventListener('click', () => {
    renderCourses(courses);
});

document.getElementById('btn-cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(cseCourses);
});

document.getElementById('btn-wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(wddCourses);
});