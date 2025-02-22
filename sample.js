let signUpBtnEl = document.getElementById('signIn/signUp-button');

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

// Navigation function
function showSection(section, activeElement) {
    let homeContent = document.getElementById("body-container");
    let aboutContent = document.getElementById("about-content");
    let contactContent = document.getElementById("contact-content");
    let coursesContent = document.getElementById("courses-content");
    let courseDetailsContent = document.getElementById("course-details-content");

    homeContent.style.display = "none";
    aboutContent.style.display = "none";
    contactContent.style.display = "none";
    coursesContent.style.display = "none";
    courseDetailsContent.style.display = "none";

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

// validating Email
function validateEmail(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.endsWith("@gmail.com");
}


// Sign Up Form Validation
signUpBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

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

    // Store user credentials (Simulated)
    localStorage.setItem("userEmail", email.value.trim());
    localStorage.setItem("userPassword", password.value.trim());

    alert("Sign up successful! Redirecting to Sign In...");

    // Clear input fields
    name.value = "";
    email.value = "";
    password.value = "";

    // Hide sign-up form and show sign-in form
    SignUpContainer.style.display = "none";
    SignInContainer.style.display = "block";
});


// Sign In Form Validation
signInBtn.addEventListener("click", function (event) {
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
       return;
    }

    let storedEmail = localStorage.getItem("userEmail");
    let storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        alert("Sign in successful! Redirecting to Home...");

        emailInput.value = "";
        passwordInput.value = "";
        captchaInput.value = ""


        // Navigate to home
        SignInContainer.style.display = "none";
        BackGround.style.display = "block";
        showSection("body-container", homeEl);
    } else {
        alert("Invalid email or password! Please try again.");
        SignInContainer.style.display = "block";
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
    "Software Development":[
    {
        description: "HTML, CSS, and JavaScript for Web Development.",
    },
    {
        description: "Cybersecurity and Ethical Hacking to secure your applications.",
    },
    {
        description: "QA Testing and Automation to ensure the quality of your software.",
    },
    {
        description: "Lata Structures and Algorithms to optimize your code.",
    },
    {
        description: "DBMS and SQL for Database Management.",
    }
  ],

    "Marketing": [
    {
        description: "Marketing Management & Strategy",
    },
    {
        description: "Consumer Behavior & Market Research",
    },
    {
        description: "Brand Managemnt & Product Development",
    },
    {
        description: "Advertising & Sales Promotion",
    },
    {
        description: "Digital Marketing & Social Media Marketing",
    }],

    "Finance": [
    {
        description: "Merg and Acquisitions",
    },
    {
        description: "Ratio Analysis and Financial Statement Analysis",
    },
    {
        description: "Primary and secoondary markets",
    },
    {
        description: "Fixed Assets and Depreciation",
    },
    {
        description: "Divendents and Dividend Policy",
    }],

    "Human Resources":[ 
        {
        description: "Performance Management",
    },
    {
        description: "Talent Management & Succession Planning",
    },
    {
        description: "Employee Engagement & Retention Strategies",
    },
    {
        description: "HR Analytics & Metrics for Business Decisions",
    },
    {
        description: "Employeement Law & Compliance Management",
    }],
};

// Displaying Course Details
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


    // Appending multiple descriptions dynamically
    courseArray.forEach((course) => {
        let paraContainer = document.createElement("div");
        paraContainer.classList.add("course-details-card");

        let para = document.createElement("p");
        para.textContent =course.description;
        para.style.paddingBottom = "10px"; 
        para.style.marginBottom = "10px";

        paraContainer.appendChild(para);
        newDetailsContainer.appendChild(paraContainer);
    });

    // Appending the new course details container
    detailsContainer.appendChild(newDetailsContainer);

    // Displaying the course details section
    showSection("course-details-content", document.getElementById("cources"));
}

document.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("click", function () {
        let courseTitle = this.querySelector("h2").textContent; 
        console.log(courseTitle);
        let course = courses[courseTitle];

        displayCourseDetails(courseTitle);
    });
});



const sections = {
    home: "body-container",
    about: "about-content",
    contact: "contact-content",
    cources: "courses-content",
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
    handleMobileNavClick(); // Enables mobile menu section switching
    handleCourseCardClick(); // Enables course card functionality on mobile
});
