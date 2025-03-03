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

// Navigation function
function showSection(section, activeElement) {
    let homeContent = document.getElementById("body-container");
    let aboutContent = document.getElementById("about-content");
    let contactContent = document.getElementById("contact-content");
    let coursesContent = document.getElementById("courses-content");
    let courseDetailsContent = document.getElementById("course-details-content");
    let exerciseContent = document.getElementById("exercise-content")

    homeContent.style.display = "none";
    aboutContent.style.display = "none";
    contactContent.style.display = "none";
    coursesContent.style.display = "none";
    courseDetailsContent.style.display = "none";
    exerciseContent.style.display= "none"

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
SignUpContainer.style.display = "none";
SignInContainer.style.display = "none";

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
    
        const result = await response.text();
        alert(result);

        if(response.ok){
            localStorage.setItem("name",name.value.trim())
            localStorage.setItem("userEmail", email.value.trim());
            checkUserAuthentication();
            document.getElementById("sign-in-containerr").style.display = "block";
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

    // Hide sign-up form and show sign-in form
    SignUpContainer.style.display = "none";
    SignInContainer.style.display = "block";
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
    const randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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



// Courses Data
const courses = {
    "Software Development": [
        {
            description: "HTML, CSS, and JavaScript for Web Development.",
            price: "$199",
            duration: "6 months"
        },
        {
            description: "React and Angular for Frontend Development.",
            price: "$249",
            duration: "6 months"
        },
        {
            description: "Node.js and Express.js for Backend Development.",
            price: "$229",
            duration: "5 months"
        },
        {
            description: "Cybersecurity and Ethical Hacking to secure your applications.",
            price: "$299",
            duration: "6 months"
        },
        {
            description: "Python and Django for Web Applications.",
            price: "$219",
            duration: "5 months"
        },
        {
            description: "Data Structures and Algorithms for Coding Interviews.",
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



const sections = {
    home: "body-container",
    about: "about-content",
    contact: "contact-content",
    cources: "courses-content",
    exercise: "exercise-content",
    details: "course-details-content",
    signUp : 'form-background-container'
};

//  Function to Handle Mobile Navigation Clicks
function handleMobileNavClick() {
    document.querySelectorAll(".nav-link").forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let sectionId = this.id.replace("-mob", "");
            console.log(sectionId)
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