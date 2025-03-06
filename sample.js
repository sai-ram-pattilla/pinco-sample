let signUpBtnEl = document.getElementById('signIn/signUp-button');
let logoutBtnEl = document.getElementById("logout-button");

let BackGround = document.getElementById('background-container');

let SignUpContainer = document.getElementById('form-background-container');
let SignInContainer = document.getElementById('sign-in-containerr');

let AnchorEl = document.getElementById('anchor-element');

let logoEl = document.getElementById('LOGO');

let formBackBtn = document.getElementById('back-to-home');
let SignInBAckBtn = document.getElementById('sign-in-back-home-btn');

let signUpBtn = document.getElementById('signUp-button');
let signInBtn = document.getElementById('signIn-button');

let homeContent = document.getElementById("body-container");
let homeEl = document.getElementById("home");

let exerciseContent = document.getElementById("exercise-content")
let jobsContent = document.getElementById("jobs-content");

// Navigation function
function showSection(section, activeElement) {
    let homeContent = document.getElementById("body-container");
    let aboutContent = document.getElementById("about-content");
    let contactContent = document.getElementById("contact-content");
    let coursesContent = document.getElementById("courses-content");
    let courseDetailsContent = document.getElementById("course-details-content");
    let exerciseContent = document.getElementById("exercise-content")
    let interviewQuestionsContainer = document.getElementById("detailed-course-container");

    homeContent.style.display = "none";
    aboutContent.style.display = "none";
    contactContent.style.display = "none";
    coursesContent.style.display = "none";
    courseDetailsContent.style.display = "none";
    exerciseContent.style.display= "none"
    jobsContent.style.display = "none"
    interviewQuestionsContainer.style.display = "none"

    SignUpContainer.style.display = "none";
    SignInContainer.style.display = "none";

    document.getElementById(section).style.display = "block";

    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    activeElement.classList.add("active");
}

// Navigation
document.addEventListener("DOMContentLoaded", function () {
    let homeEl = document.getElementById("home");
    let aboutEl = document.getElementById("about");
    let contactEl = document.getElementById("contact");
    let coursesEl = document.getElementById("cources");

    homeEl.addEventListener("click", function () {
        showSection("body-container", homeEl);
    });

    aboutEl.addEventListener("click", function () {
        showSection("about-content", aboutEl);
    });

    contactEl.addEventListener("click", function () {
        showSection("contact-content", contactEl);
    });

    logoEl.addEventListener('click', function () {
        showSection("body-container", homeEl);
    });

    coursesEl.addEventListener('click', function () {
        showSection("courses-content", coursesEl);
    });

    showSection("body-container", homeEl);
});

// Form Actions
signUpBtnEl.addEventListener('click', function () {
    SignUpContainer.style.display = "block";
    BackGround.style.display = "none";
});

AnchorEl.addEventListener('click', function () {
    SignInContainer.style.display = "block";
    SignUpContainer.style.display = "none";
});

formBackBtn.addEventListener('click', function () {
    SignUpContainer.style.display = "none";
    BackGround.style.display = "block";
});

SignInBAckBtn.addEventListener('click', function () {
    SignInContainer.style.display = "none";
    BackGround.style.display = "block";
});

document.getElementById("exercise").addEventListener("click", function () {
    showSection("exercise-content", this);
});

document.getElementById("jobs").addEventListener("click", function () {
    showSection("jobs-content", this);
});

// validating Email
function validateEmail(email) {
    return email.endsWith("@gmail.com");
}

document.addEventListener("DOMContentLoaded", function () {
    checkUserAuthentication();
});

// Function to check if user is logged in
function checkUserAuthentication() {
    let userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
        showLoggedInUI();
    } else {
        showGuestUI();
    }
}

// Show UI for logged-in user
function showLoggedInUI() {
    document.getElementById("signIn/signUp-button").style.display = "none";
    document.getElementById("logout-button").style.display = "block";
    document.getElementById("welcome-user").innerHTML = `Welcome, ${localStorage.getItem("name")}`;
}

// Show UI for non-logged-in user
function showGuestUI() {
    document.getElementById("signIn/signUp-button").style.display = "block"; 
    document.getElementById("logout-button").style.display = "none";
    document.getElementById("welcome-user").innerHTML = "";
}

// Logout function
document.getElementById("logout-button").addEventListener("click", function () {
    localStorage.removeItem("userEmail");
    alert("Logged out successfully!");
    checkUserAuthentication();
});

// Sign Up Form Validation
signUpBtn.addEventListener("click", async function (event) {
    event.preventDefault(); 

    let name = document.getElementById("sign-up-name");
    let email = document.getElementById("sign-up-email");
    let password = document.getElementById("sign-up-password");
    let confirmPassword = document.getElementById('confirm-password')
    
    if (name.value.trim() === "" || email.value.trim() === "" || password.value.trim() === "" || confirmPassword.value.trim() === "") {
        alert("All fields are required!");
        return;
    }

    if (!validateEmail(email.value.trim())) {
        alert("Invalid email format!");
        return;
    }

    if (password.value.trim().length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }

    if (password.value.trim()  !== confirmPassword.value.trim()){
        alert("Password and Confirm Password must be same")
        return;
    }
    

    try{
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name.value.trim(), 
                email: email.value.trim(), 
                password: password.value.trim() 
             })
        });
    
        const result = await response.json();

        if(response.ok){
            alert("Registration Successful")

            SignInContainer.style.display = "block";
            SignUpContainer.style.display= "none"
        }else{
            alert(result.error)
            console.log(result.error)
            SignUpContainer.style.display= "block"
        }

    } catch(error){
        console.log("error:",error)
        alert("Failed to register")
    }
    

    // Clear input fields
    name.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
});

// Sign In Form Validation
signInBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    let emailInput = document.getElementById("signIn-email");
    let passwordInput = document.getElementById("signUp-password");

    let captchaInput = document.getElementById("captcha-input");
    let captchaText = localStorage.getItem('captcha')


    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    let captcha = captchaInput.value.trim()

    if (email === "" || password === "") {
        alert("All fields are required!");
        return;
    }

    if(captcha != captchaText){
        console.log(captchaText)
       alert("Captcha Incorrect, try again...")
       generateCaptcha()
       return;
    }
    

    try{
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok){
            localStorage.setItem("name", result.user.name);
            localStorage.setItem("userEmail", result.user.email);
            alert("Login successful!");
            checkUserAuthentication();
            BackGround.style.display = "block";
            showSection("body-container", homeEl);
        }else{
            alert(result.error);
        }
    }
    catch{
        console.error("Error:", error);
        alert("Failed to log in");
    }
});

// Captcha Funtionality
document.addEventListener("DOMContentLoaded", function(){
    generateCaptcha()
})

let generatedCaptcha = document.getElementById("captcha-text");
let InputCaptcha = document.getElementById('captcha-input');

function generateCaptcha() {
    const randomChar = "ABCD@stuvEFGHI#3456J!KLMNX=YZabcdefg$hijklOPQ$RSTU?VWmno%pqrwxy&z0127?89";
    let captcha = "";
    
    for (let i = 0; i < 4; i++) { 
        let randomIndex = Math.floor(Math.random() * randomChar.length);
        captcha += randomChar[randomIndex];
    }
    generatedCaptcha.textContent = captcha;
    
    localStorage.setItem("captcha", captcha); 
    console.log(captcha);
    return captcha;
}

// sign in options
document.getElementById("google-button").addEventListener("click", function (event) {
    event.preventDefault()
    window.open("https://accounts.google.com/signup", "_blank");
});

document.getElementById("facebook-button").addEventListener("click", function () {
    window.open("https://www.facebook.com/", "_blank");
});

document.getElementById("microsoft-button").addEventListener("click", function () {
    window.open("https://account.microsoft.com/account/Account", "_blank");
});

// courses data
const courses = {
    "Software Development": [
        {
            description: "HTML CSS and JavaScript",
            price: "$199",
            duration: "6 months"
        },
        {
            description: "React and Angular",
            price: "$249",
            duration: "6 months"
        },
        {
            description: "Node.js and Express.js",
            price: "$229",
            duration: "5 months"
        },
        {
            description: "Cybersecurity and Ethical Hacking",
            price: "$299",
            duration: "6 months"
        },
        {
            description: "Python",
            price: "$219",
            duration: "5 months"
        },
        {
            description: "Data Structures and Algorithms",
            price: "$259",
            duration: "6 months"
        },
        {
            description: "Database Management (SQL & NoSQL) and MongoDB.",
            price: "$199",
            duration: "4 months"
        }
    ],

    "Marketing": [
        {
            description: "Marketing Management & Strategy.",
            price: "$150",
            duration: "4 months"
        },
        {
            description: "Consumer Behavior & Market Research.",
            price: "$130",
            duration: "3 months"
        },
        {
            description: "Brand Management & Product Development.",
            price: "$170",
            duration: "5 months"
        },
        {
            description: "Advertising & Sales Promotion Techniques.",
            price: "$140",
            duration: "3 months"
        },
        {
            description: "Digital Marketing, SEO, and Social Media Marketing.",
            price: "$200",
            duration: "6 months"
        },
        {
            description: "Email Marketing, Copywriting, and Conversion Optimization.",
            price: "$180",
            duration: "5 months"
        }
    ],

    "Finance": [
        {
            description: "Financial Accounting & Reporting.",
            price: "$180",
            duration: "5 months"
        },
        {
            description: "Investment Banking and Portfolio Management.",
            price: "$250",
            duration: "6 months"
        },
        {
            description: "Risk Management and Financial Analysis.",
            price: "$220",
            duration: "5 months"
        },
        {
            description: "Mergers, Acquisitions, and Corporate Finance.",
            price: "$270",
            duration: "7 months"
        },
        {
            description: "Cryptocurrency, Blockchain, and Financial Technologies.",
            price: "$290",
            duration: "6 months"
        },
        {
            description: "Personal Finance, Taxation, and Wealth Management.",
            price: "$160",
            duration: "4 months"
        }
    ],

    "Human Resources": [
        {
            description: "Performance Management and Employee Appraisals.",
            price: "$130",
            duration: "3 months"
        },
        {
            description: "Talent Acquisition, Recruitment, and Onboarding.",
            price: "$150",
            duration: "4 months"
        },
        {
            description: "HR Analytics and Data-Driven Decision Making.",
            price: "$180",
            duration: "5 months"
        },
        {
            description: "Workplace Ethics, Diversity, and Inclusion.",
            price: "$140",
            duration: "4 months"
        },
        {
            description: "Employment Law, Compliance, and Labor Relations.",
            price: "$190",
            duration: "5 months"
        },
        {
            description: "Organizational Behavior and Leadership Development.",
            price: "$200",
            duration: "6 months"
        }
    ],

    "Data Science & AI": [
        {
            description: "Introduction to Data Science and Python.",
            price: "$250",
            duration: "6 months"
        },
        {
            description: "Machine Learning Algorithms and Model Deployment.",
            price: "$300",
            duration: "7 months"
        },
        {
            description: "Deep Learning, Neural Networks, and TensorFlow.",
            price: "$350",
            duration: "8 months"
        },
        {
            description: "Data Visualization and Storytelling using Tableau and Power BI.",
            price: "$280",
            duration: "6 months"
        },
        {
            description: "Big Data, Hadoop, and Spark for Large-Scale Data Processing.",
            price: "$320",
            duration: "7 months"
        },
        {
            description: "Natural Language Processing (NLP) and Chatbot Development.",
            price: "$290",
            duration: "6 months"
        }
    ],

    "Cybersecurity": [
        {
            description: "Introduction to Cybersecurity and Ethical Hacking.",
            price: "$220",
            duration: "5 months"
        },
        {
            description: "Network Security, Firewalls, and Intrusion Detection.",
            price: "$270",
            duration: "6 months"
        },
        {
            description: "Penetration Testing and Vulnerability Assessment.",
            price: "$280",
            duration: "7 months"
        },
        {
            description: "Security Operations Center (SOC) and Incident Response.",
            price: "$300",
            duration: "8 months"
        },
        {
            description: "Cloud Security and DevSecOps for Secure Applications.",
            price: "$310",
            duration: "7 months"
        },
        {
            description: "Digital Forensics and Cybercrime Investigation.",
            price: "$290",
            duration: "6 months"
        }
    ]
};

// displaying course
function displayCourseDetails(courseTitle) {
    let courseArray = courses[courseTitle];
    let detailsContainer = document.getElementById("course-details-content");
    
    let existingDetails = document.getElementById("course-description");
    if (existingDetails) {
        existingDetails.remove();
    }
    
    let newDetailsContainer = document.createElement("div");
    newDetailsContainer.id = "course-description";
    
    let title = document.createElement("h2");
    title.textContent = courseTitle;
    newDetailsContainer.appendChild(title);
    
    courseArray.forEach((course) => {
        let paraContainer = document.createElement("div");
        paraContainer.classList.add("course-details-card");
    
        let description = document.createElement("p");
        description.textContent = "Description: " + course.description;
    
        let price = document.createElement("p");
        price.textContent = "Price: " + course.price;
    
        let duration = document.createElement("p");
        duration.textContent = "Subscription Duration: " + course.duration;
    
        paraContainer.appendChild(description);
        paraContainer.appendChild(price);
        paraContainer.appendChild(duration);
        newDetailsContainer.appendChild(paraContainer);
    });
    
    detailsContainer.appendChild(newDetailsContainer);
    showSection("course-details-content", document.getElementById("cources"));
}

document.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("click", function () {
        let courseTitle = this.querySelector("h2").textContent;
        console.log(courseTitle);
        displayCourseDetails(courseTitle);
    });
});

// displaying detailed courses
function displayCourseDetails(courseTitle) {
    let courseArray = courses[courseTitle];
    let detailsContainer = document.getElementById("course-details-content");

    let existingDetails = document.getElementById("course-description");
    if (existingDetails) {
        existingDetails.remove();
    }

    let newDetailsContainer = document.createElement("div");
    newDetailsContainer.id = "course-description";

    let title = document.createElement("h2");
    title.textContent = courseTitle;
    newDetailsContainer.appendChild(title);

    courseArray.forEach((course, index) => {
        let paraContainer = document.createElement("div");
        paraContainer.classList.add("course-details-card");

        let description = document.createElement("p");
        description.textContent = "Description: " + course.description;

        let price = document.createElement("p");
        price.textContent = "Price: " + course.price;

        let duration = document.createElement("p");
        duration.textContent = "Subscription Duration: " + course.duration;

        paraContainer.appendChild(description);
        paraContainer.appendChild(price);
        paraContainer.appendChild(duration);

        newDetailsContainer.appendChild(paraContainer);
    });

    detailsContainer.appendChild(newDetailsContainer);
    showSection("course-details-content", document.getElementById("cources"));
}

// Attach event listener for `.course-card` to display details
document.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("click", function () {
        let courseTitle = this.querySelector("h2").textContent;
        displayCourseDetails(courseTitle);
    });
});

// Attach event listener to `.course-details-card` using event delegation
document.addEventListener("click", function (event) {
    let card = event.target.closest(".course-details-card");
    if (card) {
        let firstParagraph = card.querySelector("p");
        if (firstParagraph) {
            let course = firstParagraph.textContent.replace("Description:", "").trim();
            console.log(course);
            displayDetailedCourse(course)
        }
    }
});

const interviewQuestions = {
    "HTML CSS and JavaScript": [
        { question: "What is JavaScript?", answer: "JavaScript is a programming language used for web development to create dynamic and interactive content." },
        { question: "Explain event delegation.", answer: "Event delegation allows handling events efficiently by adding a single listener to a parent element, which manages child elements dynamically." },
        { question: "What are promises in JavaScript?", answer: "Promises are used to handle asynchronous operations in JavaScript, providing a way to execute code after an operation completes successfully or fails." },
        { question: "What is the difference between localStorage, sessionStorage, and cookies?", answer: "localStorage and sessionStorage store data in the browser, but sessionStorage clears when the session ends, while localStorage persists. Cookies store data that can be sent to the server with requests." },
        { question: "What is the difference between block, inline, and inline-block elements in CSS?", answer: "Block elements take the full width available, inline elements do not break lines, and inline-block elements behave like inline elements but allow setting width and height." }
    ],
    "React and Angular": [
        { question: "What is the difference between React and Angular?", answer: "React is a library for building UI components, whereas Angular is a full-fledged framework with built-in tools like dependency injection." },
        { question: "What are React hooks?", answer: "React hooks are functions that allow functional components to manage state and lifecycle methods without using class components." },
        { question: "What is the Virtual DOM in React?", answer: "The Virtual DOM is a lightweight copy of the real DOM that React updates before making efficient changes to the actual DOM." },
        { question: "How does two-way data binding work in Angular?", answer: "Two-way data binding in Angular allows synchronization between the model and the view using [(ngModel)] in templates." },
        { question: "What are Angular Directives?", answer: "Angular Directives extend HTML functionality. Examples include *ngIf, *ngFor, and custom structural directives." }
    ],
    "Node.js and Express.js": [
        { question: "What is Node.js?", answer: "Node.js is a runtime environment that allows JavaScript to be executed outside the browser, using the V8 engine." },
        { question: "What is Express.js and why is it used?", answer: "Express.js is a lightweight framework for Node.js used to create web applications and APIs efficiently." },
        { question: "What is middleware in Express.js?", answer: "Middleware in Express.js are functions that execute between the request and response cycle, used for logging, authentication, etc." },
        { question: "What is the difference between synchronous and asynchronous programming in Node.js?", answer: "Synchronous programming blocks execution until a task is complete, whereas asynchronous programming allows tasks to be executed concurrently without blocking execution." },
        { question: "What is RESTful API?", answer: "A RESTful API follows REST principles to enable communication between clients and servers using HTTP methods like GET, POST, PUT, and DELETE." }
    ]
};

function displayDetailedCourse(course){
    document.getElementById("detailed-course-title").textContent =course ;

    let extraContainer = document.createElement("div");
    extraContainer.classList.add("questions-container")
    extraContainer.id = "questions-container-content"
     
    let prvDetails = document.getElementById("questions-container-content")
    let prvButton = document.getElementById("testButton")

    if (prvDetails){
         prvDetails.remove();
    }

    if(prvButton){
        prvButton.remove();
    }

    courseData= interviewQuestions[course]
     
    extraContainer.innerHTML = `<h3 class = "questions-heding">Interview Questions & Answers:</h3>`;
    courseData.forEach(q => {
        extraContainer.innerHTML += `
            <p><strong>Q:</strong> ${q.question}</p>
            <p><strong>A:</strong> ${q.answer}</p>
        `;
    });
    let testButton = document.createElement("button");
    testButton.classList.add("test-button")
    testButton.textContent = "Take Test" 
    testButton.id = "testButton"

    document.getElementById("detailed-course-container").appendChild(extraContainer)
    document.getElementById("detailed-course-container").appendChild(testButton)


    showSection("detailed-course-container", document.getElementById("cources"));

    testButton.addEventListener("click", function(){
        showSection("exercise-content", document.getElementById("exercise"));
    })
}






const sections = {
    home: "body-container",
    about: "about-content",
    contact: "contact-content",
    cources: "courses-content",
    exercise: "exercise-content",
    details: "course-details-content",
    signUp : 'form-background-container',
    Jobs : "jobs-content"

};

//  Function to Handle Mobile Navigation Clicks
function handleMobileNavClick() {
    document.querySelectorAll(".nav-link").forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let sectionId = this.id.replace("-mob", "");
            console.log(sectionId)
            document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
            showSection(sections[sectionId] || "body-container", this);

            // Close the mobile navbar after clicking
            let navbarToggler = document.querySelector(".navbar-toggler");
            let navbarCollapse = document.querySelector("#mobileNav");
            if (navbarCollapse.classList.contains("show")) {
                navbarToggler.click();
            }
        });
    });
}

// Function to Handle Course Card Clicks
function handleCourseCardClick() {
    document.querySelectorAll(".course-card").forEach(card => {
        card.addEventListener("click", function () {
            let courseTitle = this.querySelector("h2").textContent;
            displayCourseDetails(courseTitle);
        });
    });
}

// Attach the new functions after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    handleMobileNavClick();
    handleCourseCardClick();
});


// Exercise Section

const exerciseQuestions = {
    "Software Development": [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Transfer Markup Language", "HyperText Markup Language", "HighText Machine Learning"],
            answer: "HyperText Markup Language"
        },
        {
            question: "Which programming language is used for web development?",
            options: ["Python", "Java", "JavaScript"],
            answer: "JavaScript"
        }
    ],
    "Marketing": [
        {
            question: "What is the 4P’s of marketing?",
            options: ["Product, Price, Place, Promotion", "Plan, Process, Product, Price", "Profit, People, Process, Promotion"],
            answer: "Product, Price, Place, Promotion"
        }
    ],
    "Finance": [
        {
            question: "What is ROI?",
            options: ["Return On Investment", "Rate Of Interest", "Risk Of Inflation"],
            answer: "Return On Investment"
        }
    ],
    "Human Resources": [
        {
            question: "What is the primary role of HR?",
            options: ["Hiring & Managing Employees", "Finance & Accounting", "Marketing & Branding"],
            answer: "Hiring & Managing Employees"
        }
    ],
    "Data Science & AI": [
        {
            question: "Which algorithm is commonly used for supervised learning?",
            options: ["K-Means Clustering", "Linear Regression", "Apriori Algorithm"],
            answer: "Linear Regression"
        }
    ],
    "Cybersecurity": [
        {
            question: "What is the primary goal of cybersecurity?",
            options: ["Data Privacy & Protection", "Application Development", "SEO Optimization"],
            answer: "Data Privacy & Protection"
        }
    ]
};

let exerciseContainer = document.getElementById("exercise-questions");

document.getElementById("start-exercise").addEventListener("click", function () {
    let selectedCourse = document.getElementById("exercise-dropdown").value;
    
    if (!selectedCourse) {
        alert("Please select a course to start the test!");
        return;
    }

    let questionsContainer = document.getElementById("questions-container");
    questionsContainer.innerHTML = ""; 
    document.getElementById("exercise-title").textContent = `Test: ${selectedCourse}`;
    document.getElementById("exercise-questions").style.display = "block";

    let questions = exerciseQuestions[selectedCourse];

    questions.forEach((q, index) => {
        let questionDiv = document.createElement("div");
        questionDiv.classList.add("question-item");
        
        let questionText = document.createElement("p");
        questionText.textContent = `${index + 1}. ${q.question}`;
        
        questionDiv.appendChild(questionText);

        q.options.forEach(option => {
            let label = document.createElement("label");
            let input = document.createElement("input");
            input.type = "radio";
            input.name = `question-${index}`;
            input.value = option;

            label.appendChild(input);
            label.append(option);
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement("br"));
        });

        questionsContainer.appendChild(questionDiv);
    });
});

document.getElementById("submit-exercise").addEventListener("click", function () {
    let selectedCourse = document.getElementById("exercise-dropdown").value;
    let questions = exerciseQuestions[selectedCourse];

    let score = 0;

    questions.forEach((q, index) => {
        let selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === q.answer) {
            score++;
        }
    });

    alert(`You scored ${score} out of ${questions.length}`);
    exerciseContainer.style.display = "none"
    document.getElementById("exercise-dropdown").value = ""
});


//Jobs Section

const jobs = [
    {
        id: 1,
        title: "Software Developer",
        company: "Google",
        location: "Bangalore, India",
        description: "Develop and maintain scalable web applications."
    },
    {
        id: 2,
        title: "Data Scientist",
        company: "Amazon",
        location: "Hyderabad, India",
        description: "Work with machine learning models and big data analytics."
    },
    {
        id: 3,
        title: "UI/UX Designer",
        company: "Microsoft",
        location: "Remote",
        description: "Create intuitive user interfaces and experiences."
    }
];

// Function to display jobs

document.addEventListener("DOMContentLoaded", function () {
    displayJobs();
});

function displayJobs() {
    let jobsContainer = document.getElementById("jobs-container");
    jobsContainer.innerHTML = ""; 

    jobs.forEach(job => {
        let jobCard = document.createElement("div");
        jobCard.classList.add("job-card");
        
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p>${job.description}</p>
            <button class="apply-button" onclick="applyForJob('${job.title}')">Apply</button>
        `;
        
        jobsContainer.appendChild(jobCard);
    });
}
