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
    let companyInterviewQestions = document.getElementById("interview-content")

    homeContent.style.display = "none";
    aboutContent.style.display = "none";
    contactContent.style.display = "none";
    coursesContent.style.display = "none";
    courseDetailsContent.style.display = "none";
    exerciseContent.style.display= "none"
    jobsContent.style.display = "none"
    interviewQuestionsContainer.style.display = "none"
    companyInterviewQestions.style.display = "none"

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



document.getElementById("jobs").addEventListener("click", function () {
    showSection("jobs-content", this);
});

// validating Email
function validateEmail(email) {
    return email.endsWith("@gmail.com");
}

document.addEventListener("DOMContentLoaded", function () {
    checkUserAuthentication();

    if (!localStorage.getItem("userEmail")) {
        document.getElementById("exercise-content").style.display = "none";
    }
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

    document.getElementById("exercise").style.display = "none";
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
            description: "Java",
            price: "$299",
            duration: "4 months"
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
            description: "SQL & NoSQL",
            price: "$199",
            duration: "4 months"
        }
       
    ],

    "Marketing": [
        {
            description: "Marketing Management & Strategy",
            price: "$150",
            duration: "4 months"
        },
        {
            description: "Consumer Behavior & Market Research",
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
            description: "Financial Accounting & Reporting",
            price: "$180",
            duration: "5 months"
        },
        {
            description: "Investment Banking and Portfolio Management",
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
            description: "Performance Management and Employee Appraisals",
            price: "$130",
            duration: "3 months"
        },
        {
            description: "Talent Acquisition, Recruitment, and Onboarding",
            price: "$150",
            duration: "4 months"
        },
        {
            description: "HR Analytics and Data-Driven Decision Making",
            price: "$180",
            duration: "5 months"
        },
        {
            description: "Workplace Ethics, Diversity, and Inclusion",
            price: "$140",
            duration: "4 months"
        },
        {
            description: "Employment Law, Compliance, and Labor Relations",
            price: "$190",
            duration: "5 months"
        },
        {
            description: "Organizational Behavior and Leadership Development",
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
    ],
    "Marketing Management & Strategy": [
        { question: "What is marketing management?", answer: "Marketing management is the process of planning, executing, and overseeing marketing strategies to attract and retain customers while achieving business objectives." },
        { question: "What are the 4 Ps of marketing?", answer: "The 4 Ps of marketing are Product, Price, Place, and Promotion. They form the foundation of any marketing strategy." },
        { question: "What is a SWOT analysis in marketing?", answer: "SWOT analysis helps businesses evaluate their Strengths, Weaknesses, Opportunities, and Threats to develop strategic plans." },
        { question: "What is market segmentation?", answer: "Market segmentation divides a market into distinct groups based on demographics, behavior, or other characteristics to target customers effectively." },
        { question: "What is brand positioning?", answer: "Brand positioning refers to the strategy of establishing a brand in the minds of consumers by highlighting its unique value proposition." }
    ],
    "Consumer Behavior & Market Research": [
        { question: "What is consumer behavior?", answer: "Consumer behavior studies how individuals make decisions to buy, use, and dispose of goods and services." },
        { question: "What factors influence consumer behavior?", answer: "Factors include psychological (motivation, perception), social (family, culture), and personal (age, income) aspects." },
        { question: "What is market research?", answer: "Market research involves collecting and analyzing data about consumers, competitors, and market trends to make informed business decisions." },
        { question: "What is the difference between primary and secondary research?", answer: "Primary research involves gathering new data directly from sources, while secondary research uses existing data from reports, publications, and studies." },
        { question: "What is customer lifetime value (CLV)?", answer: "CLV measures the total revenue a business can expect from a single customer over their lifetime." }
    ],
    "Financial Accounting & Reporting": [
        { question: "What is financial accounting?", answer: "Financial accounting involves recording, summarizing, and reporting financial transactions of a business in compliance with regulations." },
        { question: "What are the key financial statements?", answer: "The key financial statements are the Balance Sheet, Income Statement, and Cash Flow Statement." },
        { question: "What is the difference between accrual and cash accounting?", answer: "Accrual accounting records revenues and expenses when they are incurred, while cash accounting records them when cash is exchanged." },
        { question: "What is GAAP?", answer: "GAAP (Generally Accepted Accounting Principles) is a set of accounting standards used for financial reporting in many countries." },
        { question: "What is the role of an auditor in financial reporting?", answer: "Auditors review financial statements to ensure accuracy, compliance, and transparency in financial reporting." }
    ],
    "Investment Banking and Portfolio Management": [
        { question: "What is investment banking?", answer: "Investment banking provides financial advisory services, facilitates mergers and acquisitions, and helps companies raise capital." },
        { question: "What are the main functions of investment banks?", answer: "Functions include underwriting, mergers & acquisitions advisory, trading, and asset management." },
        { question: "What is portfolio management?", answer: "Portfolio management involves selecting and managing investments to achieve financial goals while minimizing risk." },
        { question: "What is risk diversification?", answer: "Risk diversification involves spreading investments across different assets to reduce exposure to market volatility." },
        { question: "What are the differences between mutual funds and hedge funds?", answer: "Mutual funds are regulated investment vehicles accessible to the general public, while hedge funds are privately managed and often require high minimum investments." }
    ],
    "Performance Management and Employee Appraisals": [
        { question: "What is performance management?", answer: "Performance management is the continuous process of monitoring, evaluating, and improving employee performance to align with organizational goals." },
        { question: "What are the key elements of an effective performance appraisal system?", answer: "Elements include clear objectives, regular feedback, employee involvement, and fair evaluation metrics." },
        { question: "What is the 360-degree feedback system?", answer: "A 360-degree feedback system collects performance feedback from supervisors, peers, subordinates, and customers." },
        { question: "What is the difference between performance appraisal and performance management?", answer: "Performance appraisal is an annual evaluation, while performance management is an ongoing process of performance monitoring and improvement." },
        { question: "What is the Balanced Scorecard method?", answer: "The Balanced Scorecard is a strategic performance measurement tool that considers financial and non-financial performance indicators." }
    ],
    "Talent Acquisition, Recruitment, and Onboarding": [
        { question: "What is talent acquisition?", answer: "Talent acquisition is a strategic approach to attracting, hiring, and retaining skilled employees to meet business needs." },
        { question: "What is the difference between recruitment and talent acquisition?", answer: "Recruitment is the short-term process of filling vacancies, whereas talent acquisition is a long-term strategy for workforce planning and development." },
        { question: "What are the key steps in the recruitment process?", answer: "Steps include job analysis, sourcing candidates, screening, interviewing, selection, and onboarding." },
        { question: "What is the purpose of an onboarding process?", answer: "Onboarding helps new employees integrate into the organization by providing training, resources, and cultural orientation." },
        { question: "What are some common recruitment challenges?", answer: "Challenges include talent shortages, high competition, long hiring processes, and retaining top candidates." }
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

    testButton.addEventListener("click", function(courses){
        if (!localStorage.getItem("userEmail")) {
            alert("Please Login To Take Test...")
        }else{
            showSection("exercise-content", document.getElementById("cources"));
            displayQuestion(course)
            document.getElementById("exercise-dropdown").value = course
        }

        
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
    "HTML CSS and JavaScript": [
        {
            question: "Which tag is used to define a hyperlink in HTML?",
            options: [
                "<link>",
                "<a>",
                "<href>"
            ],
            answer: "<a>"
        },
        {
            question: "Which CSS property is used to change the text color of an element?",
            options: [
                "color",
                "background-color",
                "font-color"
            ],
            answer: "color"
        },
        {
            question: "Which keyword is used to declare a variable in JavaScript?",
            options: [
                "var",
                "define",
                "dim"
            ],
            answer: "var"
        }
    ],
    "React and Angular": [
        {
            question: "Which command is used to create a new React application?",
            options: [
                "npx create-react-app my-app",
                "npm create-react-app my-app",
                "node create-react-app my-app"
            ],
            answer: "npx create-react-app my-app"
        },
        {
            question: "Which language is primarily used in Angular for development?",
            options: [
                "JavaScript",
                "Python",
                "TypeScript"
            ],
            answer: "TypeScript"
        }
    ],
    "Node.js and Express.js": [
        {
            question: "Which module is used to create a server in Node.js?",
            options: [
                "http",
                "fs",
                "express"
            ],
            answer: "http"
        },
        {
            question: "Which method is used to handle POST requests in Express.js?",
            options: [
                "app.post()",
                "app.get()",
                "app.send()"
            ],
            answer: "app.post()"
        }
    ],
    "Java": [
        {
            question: "Which keyword is used to define a class in Java?",
            options: [
                "class",
                "Class",
                "define"
            ],
            answer: "class"
        },
        {
            question: "Which method is the entry point of a Java program?",
            options: [
                "main()",
                "start()",
                "run()"
            ],
            answer: "main()"
        },
        {
            question: "Which data type is used to store a single character in Java?",
            options: [
                "char",
                "string",
                "Character"
            ],
            answer: "char"
        }
    ],
    "Python": [
        {
            question: "Which symbol is used for single-line comments in Python?",
            options: [
                "//",
                "#",
                "/* */"
            ],
            answer: "#"
        },
        {
            question: "Which function is used to display output in Python?",
            options: [
                "echo()",
                "print()",
                "display()"
            ],
            answer: "print()"
        },
        {
            question: "Which keyword is used to define a function in Python?",
            options: [
                "function",
                "def",
                "func"
            ],
            answer: "def"
        }
    ],
    "SQL": [
        {
            question: "Which SQL command is used to retrieve data from a database?",
            options: [
                "FETCH",
                "SELECT",
                "GET"
            ],
            answer: "SELECT"
        },
        {
            question: "Which SQL clause is used to filter results?",
            options: [
                "WHERE",
                "FILTER",
                "ORDER BY"
            ],
            answer: "WHERE"
        },
        {
            question: "Which SQL command is used to remove all records from a table but keep the structure?",
            options: [
                "DELETE",
                "DROP",
                "TRUNCATE"
            ],
            answer: "TRUNCATE"
        }
    ],"Marketing Management & Strategy": [
        {
            question: "What is the primary goal of marketing management?",
            options: [
                "Increase production",
                "Attract and retain customers",
                "Reduce operational costs"
            ],
            answer: "Attract and retain customers"
        },
        {
            question: "Which of the following is NOT part of the 4 Ps of marketing?",
            options: [
                "Product",
                "Profit",
                "Promotion"
            ],
            answer: "Profit"
        },
        {
            question: "Which strategy focuses on selling existing products to a new market?",
            options: [
                "Market penetration",
                "Market development",
                "Diversification"
            ],
            answer: "Market development"
        }
    ],
    "Consumer Behavior & Market Research": [
        {
            question: "Which factor is NOT considered in consumer behavior analysis?",
            options: [
                "Psychological factors",
                "Government policies",
                "Social influences"
            ],
            answer: "Government policies"
        },
        {
            question: "Which type of market research involves collecting new data directly from sources?",
            options: [
                "Primary research",
                "Secondary research",
                "Experimental research"
            ],
            answer: "Primary research"
        },
        {
            question: "Which of the following methods is commonly used to study consumer behavior?",
            options: [
                "Surveys",
                "Accounting records",
                "Production schedules"
            ],
            answer: "Surveys"
        }
    ],
    "Financial Accounting & Reporting": [
        {
            question: "Which financial statement provides a snapshot of a company's financial position at a specific time?",
            options: [
                "Income Statement",
                "Balance Sheet",
                "Cash Flow Statement"
            ],
            answer: "Balance Sheet"
        },
        {
            question: "What does GAAP stand for?",
            options: [
                "General Accounting and Audit Principles",
                "Generally Accepted Accounting Principles",
                "Global Accounting and Assessment Policy"
            ],
            answer: "Generally Accepted Accounting Principles"
        },
        {
            question: "Which accounting method recognizes revenue when it is earned, not when cash is received?",
            options: [
                "Accrual accounting",
                "Cash accounting",
                "Hybrid accounting"
            ],
            answer: "Accrual accounting"
        }
    ],
    "Investment Banking and Portfolio Management": [
        {
            question: "Which of the following is a primary function of investment banks?",
            options: [
                "Manufacturing goods",
                "Underwriting securities",
                "Managing supply chains"
            ],
            answer: "Underwriting securities"
        },
        {
            question: "What is portfolio diversification?",
            options: [
                "Investing in a single asset",
                "Spreading investments across multiple assets",
                "Avoiding all investments"
            ],
            answer: "Spreading investments across multiple assets"
        },
        {
            question: "Which financial instrument represents ownership in a company?",
            options: [
                "Bond",
                "Stock",
                "Derivative"
            ],
            answer: "Stock"
        }
    ],
    "Performance Management and Employee Appraisals": [
        {
            question: "Which of the following is a key purpose of performance appraisals?",
            options: [
                "To determine financial statements",
                "To evaluate employee performance",
                "To track inventory levels"
            ],
            answer: "To evaluate employee performance"
        },
        {
            question: "What is 360-degree feedback?",
            options: [
                "Feedback collected only from top management",
                "Feedback from multiple sources including peers, subordinates, and managers",
                "Feedback based solely on sales performance"
            ],
            answer: "Feedback from multiple sources including peers, subordinates, and managers"
        },
        {
            question: "Which of the following is a performance measurement tool?",
            options: [
                "Balanced Scorecard",
                "Trial Balance",
                "Income Statement"
            ],
            answer: "Balanced Scorecard"
        }
    ],
    "Talent Acquisition, Recruitment, and Onboarding": [
        {
            question: "What is the main objective of talent acquisition?",
            options: [
                "To find and retain top talent",
                "To reduce company expenses",
                "To automate recruitment entirely"
            ],
            answer: "To find and retain top talent"
        },
        {
            question: "Which step comes first in the recruitment process?",
            options: [
                "Job analysis",
                "Employee training",
                "Performance appraisal"
            ],
            answer: "Job analysis"
        },
        {
            question: "What is the main goal of an onboarding program?",
            options: [
                "To provide training and integrate new employees",
                "To terminate underperforming employees",
                "To assess financial statements"
            ],
            answer: "To provide training and integrate new employees"
        }
    ]
};

let exerciseContainer = document.getElementById("exercise-questions");


// Finding Slected Course
document.getElementById("start-exercise").addEventListener("click", function(){
    let selectedCourse = document.getElementById("exercise-dropdown").value;
    console.log(selectedCourse)
    if (!selectedCourse) {
        alert("Please select a course to start the test!");
        return;
    }
    displayQuestion(selectedCourse)
})

// display question
function displayQuestion(selectedCourse){
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
}

// on submit test
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

// Interview Questions

document.getElementById("interview").addEventListener("click", function () {
    showSection("interview-content",document.getElementById("interview"))
});

const companyInteviewQuestions = {
    "Accenture": [
        { question: "What is polymorphism?", answer: "Polymorphism allows a single function, method, or operator to behave differently based on input, supporting method overloading and overriding." },
        { question: "Explain Agile methodology.", answer: "Agile is a software development approach focusing on iterative progress, collaboration, and adaptability, using frameworks like Scrum and Kanban." },
        { question: "What are design patterns in software development?", answer: "Design patterns are reusable solutions to common software design problems, such as Singleton, Factory, and Observer patterns." },
        { question: "Differentiate between an interface and an abstract class.", answer: "An interface defines a contract for classes to implement, while an abstract class provides a mix of implemented and unimplemented methods." },
        { question: "What is the difference between REST and SOAP?", answer: "REST is a lightweight architectural style using JSON/XML over HTTP, while SOAP is a protocol using XML messages with strict standards." },
        { question: "What is the purpose of microservices architecture?", answer: "Microservices break applications into small, independent services that communicate via APIs, improving scalability and maintainability." },
        { question: "What are SQL Joins, and what are their types?", answer: "SQL Joins combine data from multiple tables using INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN." }
    ],
    "TCS": [
        { question: "What is the difference between C and C++?", answer: "C is procedural, while C++ supports both procedural and object-oriented programming." },
        { question: "Explain normalization in databases.", answer: "Normalization reduces redundancy and improves data consistency through Normal Forms (1NF, 2NF, 3NF, etc.)." },
        { question: "What is a deadlock in operating systems?", answer: "A deadlock occurs when processes wait for resources held by each other, preventing further execution." },
        { question: "Explain the difference between primary key and foreign key.", answer: "A primary key uniquely identifies a record, while a foreign key establishes relationships between tables." },
        { question: "What is a linked list, and how is it different from an array?", answer: "A linked list is a dynamic structure where elements are connected via pointers, unlike arrays, which use contiguous memory." },
        { question: "What is SDLC, and what are its phases?", answer: "SDLC (Software Development Life Cycle) consists of phases like Requirement Analysis, Design, Development, Testing, Deployment, and Maintenance." },
        { question: "What is the difference between HTTP and HTTPS?", answer: "HTTPS encrypts data using SSL/TLS, making it secure, while HTTP does not encrypt data." }
    ],
    "Wipro": [
        { question: "What is encapsulation in OOP?", answer: "Encapsulation bundles data and methods within a class, restricting direct access and enforcing data hiding." },
        { question: "Describe cloud computing.", answer: "Cloud computing delivers computing services like storage, databases, and networking over the internet, enabling scalability." },
        { question: "What is the difference between stack and queue?", answer: "A stack follows LIFO (Last In, First Out), whereas a queue follows FIFO (First In, First Out)." },
        { question: "What is the difference between GET and POST methods in HTTP?", answer: "GET retrieves data, while POST sends data to the server for processing." },
        { question: "What is an API, and why is it used?", answer: "An API (Application Programming Interface) enables communication between different software applications." },
        { question: "Explain the difference between a process and a thread.", answer: "A process is an independent execution unit, while a thread is a lightweight subunit of a process that shares resources." },
        { question: "What is exception handling in Java?", answer: "Exception handling manages runtime errors using try, catch, finally, and throw keywords." }
    ],
    "HCL": [
        { question: "What are design patterns, and why are they useful?", answer: "Design patterns provide reusable solutions to common software problems, improving maintainability and scalability." },
        { question: "Differentiate between REST and SOAP.", answer: "REST is a stateless architecture using JSON/XML, whereas SOAP is a strict protocol using XML messaging." },
        { question: "What is multithreading, and how does it work?", answer: "Multithreading enables concurrent execution of multiple tasks, improving performance in CPU-intensive applications." },
        { question: "What is Big-O notation, and why is it important?", answer: "Big-O notation describes an algorithm’s efficiency in terms of time and space complexity." },
        { question: "What is the difference between compilation and interpretation?", answer: "A compiler translates the entire code before execution, while an interpreter translates and executes line by line." },
        { question: "Explain the difference between heap and stack memory.", answer: "Stack memory stores method calls and local variables, whereas heap memory is used for dynamic object allocation." },
        { question: "What is a singleton class in Java?", answer: "A singleton class allows only one instance of an object to exist in memory." }
    ],
    "Tech Mahindra": [
        { question: "Explain multithreading in Java.", answer: "Multithreading allows concurrent execution of multiple threads, improving CPU efficiency." },
        { question: "What is a linked list, and how is it implemented?", answer: "A linked list is a dynamic data structure where elements (nodes) are linked using pointers." },
        { question: "What is a hash table, and how does it work?", answer: "A hash table stores key-value pairs using a hash function, enabling fast lookups." },
        { question: "What is the difference between JDK, JRE, and JVM?", answer: "JDK contains development tools, JRE provides runtime environment, and JVM executes Java programs." },
        { question: "What are access modifiers in Java?", answer: "Access modifiers (public, private, protected, default) control the visibility of class members." },
        { question: "Explain method overloading and method overriding.", answer: "Method overloading allows methods with the same name but different parameters, while overriding allows a subclass to modify a superclass method." },
        { question: "What is garbage collection in Java?", answer: "Garbage collection automatically frees memory by removing unused objects to prevent memory leaks." }
    ]
};


document.getElementById("company-dropdown").addEventListener("change", function () {
    let company = this.value;
    let questionsList = document.getElementById("questions-list");
    questionsList.innerHTML = "";

    if (company && companyInteviewQuestions[company]) {
        companyInteviewQuestions[company].forEach(q => {
            let questionDiv = document.createElement("div");
            questionDiv.classList.add("exercise-questions")
            questionDiv.classList.add("question-item");
            questionDiv.innerHTML = `
            <p><strong>Q:</strong> ${q.question}</p>
            <p><strong>A:</strong> ${q.answer}</p>
            `
            questionsList.appendChild(questionDiv);
        });
    }
});

