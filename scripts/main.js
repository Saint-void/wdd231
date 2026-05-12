// =========================
// Responsive Menu
// =========================

const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});


// =========================
// Footer Dates
// =========================

const currentYear = new Date().getFullYear();

document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;



// =========================
// Courses Array
// =========================

const courses = [

    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development",
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 110,
        title: "Programming Building Blocks",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    }
];



// =========================
// Course Display Function
// =========================

const coursesContainer = document.getElementById("courses-container");
const totalCredits = document.getElementById("total-credits");

function displayCourses(courseList) {

    coursesContainer.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        // completed course style
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>
        `;

        coursesContainer.appendChild(card);
    });

    // total credits
    const credits = courseList.reduce((total, course) => {
        return total + course.credits;
    }, 0);

    totalCredits.textContent =
        `Total Credits: ${credits}`;
}



// =========================
// Buttons
// =========================

document.getElementById("all-btn").addEventListener("click", () => {
    displayCourses(courses);
});

document.getElementById("wdd-btn").addEventListener("click", () => {

    const wddCourses = courses.filter(course =>
        course.subject === "WDD"
    );

    displayCourses(wddCourses);
});

document.getElementById("cse-btn").addEventListener("click", () => {

    const cseCourses = courses.filter(course =>
        course.subject === "CSE"
    );

    displayCourses(cseCourses);
});



// =========================
// Initial Display
// =========================

displayCourses(courses);