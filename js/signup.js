
// Client-side validation and event handling for Sign-up page

var generatedCaptcha = "";

// Generate a random 5-character alphanumeric CAPTCHA code
function generateCaptcha() {
    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var code = "";
    var i;

    for (i = 0; i < 5; i++) {
        var index = Math.floor(Math.random() * chars.length);
        code += chars.charAt(index);
    }

    generatedCaptcha = code;
    var captchaDisplay = document.getElementById("captchaCode");
    if (captchaDisplay) {
        captchaDisplay.innerHTML = generatedCaptcha;
    }
}

// Check if password has at least 8 chars, 1 uppercase letter, and 1 digit
function checkPasswordStrength(pwd) {
    var hasMinLength = pwd.length >= 8;
    var hasUpper = false;
    var hasDigit = false;
    var i;

    for (i = 0; i < pwd.length; i++) {
        var ch = pwd.charAt(i);
        if (ch >= "A" && ch <= "Z") {
            hasUpper = true;
        }
        if (ch >= "0" && ch <= "9") {
            hasDigit = true;
        }
    }

    return {
        valid: hasMinLength && hasUpper && hasDigit,
        hasMinLength: hasMinLength,
        hasUpper: hasUpper,
        hasDigit: hasDigit
    };
}

// Live validation on password input event
function handlePasswordInput() {
    var pwd = document.getElementById("password").value;
    var feedback = document.getElementById("passwordFeedback");
    var status = checkPasswordStrength(pwd);

    if (pwd.length === 0) {
        feedback.style.color = "#555555";
        feedback.innerHTML = "At least 8 chars, 1 uppercase, 1 number";
        return false;
    }

    if (status.valid) {
        feedback.style.color = "#2d5a27";
        feedback.innerHTML = "Strong password (length, uppercase, and number met).";
        handleConfirmInput();
        return true;
    } else {
        var missing = [];
        if (!status.hasMinLength) {
            missing.push("at least 8 characters");
        }
        if (!status.hasUpper) {
            missing.push("1 uppercase letter");
        }
        if (!status.hasDigit) {
            missing.push("1 number");
        }
        feedback.style.color = "#b02a2a";
        feedback.innerHTML = "Password needs: " + missing.join(", ") + ".";
        handleConfirmInput();
        return false;
    }
}

// Live validation on confirm password input event
function handleConfirmInput() {
    var pwd = document.getElementById("password").value;
    var confirmPwd = document.getElementById("confirmPassword").value;
    var confirmFeedback = document.getElementById("confirmFeedback");

    if (confirmPwd.length === 0) {
        confirmFeedback.style.color = "#555555";
        confirmFeedback.innerHTML = "";
        return false;
    }

    if (pwd === confirmPwd) {
        confirmFeedback.style.color = "#2d5a27";
        confirmFeedback.innerHTML = "Passwords match.";
        return true;
    } else {
        confirmFeedback.style.color = "#b02a2a";
        confirmFeedback.innerHTML = "Passwords do not match.";
        return false;
    }
}

// Validate all required fields and CAPTCHA before form submission
function validateForm(event) {
    var fullName = document.getElementById("fullName").value.trim();
    var dob = document.getElementById("dob").value.trim();
    var gender = document.getElementById("gender").value;
    var academicLevel = document.getElementById("academicLevel").value;
    var college = document.getElementById("college").value.trim();
    var homeCity = document.getElementById("homeCity").value;
    var username = document.getElementById("username").value.trim();
    var pwd = document.getElementById("password").value;
    var confirmPwd = document.getElementById("confirmPassword").value;
    var captchaEntered = document.getElementById("captchaInput").value.trim();
    var messageBox = document.getElementById("signupMessage");

    var errors = [];
    var pwdStatus = checkPasswordStrength(pwd);

    if (fullName === "") {
        errors.push("Full Name is required.");
    }
    if (dob === "") {
        errors.push("Date of Birth is required.");
    }
    if (gender === "") {
        errors.push("Please select Gender.");
    }
    if (academicLevel === "") {
        errors.push("Please select Academic Level.");
    }
    if (college === "") {
        errors.push("College is required.");
    }
    if (homeCity === "") {
        errors.push("Please select Home City.");
    }
    if (username === "") {
        errors.push("Username is required.");
    }
    if (!pwdStatus.valid) {
        errors.push("Password must be at least 8 characters with 1 uppercase letter and 1 number.");
    }
    if (confirmPwd === "" || pwd !== confirmPwd) {
        errors.push("Re-enter Password must match Password.");
    }
    if (captchaEntered === "") {
        errors.push("Please enter the CAPTCHA code.");
    } else if (captchaEntered.toUpperCase() !== generatedCaptcha) {
        errors.push("CAPTCHA code does not match.");
    }

    if (errors.length > 0) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        messageBox.style.color = "#b02a2a";
        messageBox.innerHTML = errors.join("<br>");
        generateCaptcha();
        document.getElementById("captchaInput").value = "";
        return false;
    }

    if (event && event.preventDefault) {
        event.preventDefault();
    }
    messageBox.style.color = "#2d5a27";
    messageBox.innerHTML = "Profile created successfully for " + username + "! Welcome to Green Horizons.";
    return true;
}

// Handle click event on Sign-up button
function handleSignupClick(event) {
    validateForm(event);
}

// Handle submit event on Sign-up form
function handleFormSubmit(event) {
    validateForm(event);
}

// Register event listeners when page loads
function start() {
    generateCaptcha();

    var pwdField = document.getElementById("password");
    var confirmField = document.getElementById("confirmPassword");
    var signupBtn = document.getElementById("signupBtn");
    var signupForm = document.getElementById("signupForm");

    if (pwdField) {
        pwdField.addEventListener("input", handlePasswordInput, false);
    }
    if (confirmField) {
        confirmField.addEventListener("input", handleConfirmInput, false);
    }
    if (signupBtn) {
        signupBtn.addEventListener("click", handleSignupClick, false);
    }
    if (signupForm) {
        signupForm.addEventListener("submit", handleFormSubmit, false);
    }
}

window.addEventListener("load", start, false);