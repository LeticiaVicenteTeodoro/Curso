document.addEventListener("DOMContentLoaded", function() {
    const passwordField = document.getElementById("password");
    const lengthSlider = document.getElementById("length");
    const lengthValue = document.getElementById("lengthValue");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const generateBtn = document.getElementById("generateBtn");
    const memorizableBtn = document.getElementById("memorizableBtn");
    const copyBtn = document.getElementById("copyBtn");
    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");
    const suggestions = document.getElementById("suggestions");
    const toggleThemeBtn = document.getElementById("toggleTheme");

    lengthSlider.addEventListener("input", function() {
        lengthValue.textContent = lengthSlider.value;
    });

    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_-+=<>?";

        let characters = "";
        if (uppercaseCheckbox.checked) characters += uppercase;
        if (lowercaseCheckbox.checked) characters += lowercase;
        if (numbersCheckbox.checked) characters += numbers;
        if (symbolsCheckbox.checked) characters += symbols;

        if (characters.length === 0) return "";

        let password = "";
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        passwordField.value = password;
        evaluateStrength(password);
    }

    function evaluateStrength(password) {
        let strength = 0;
        if (password.length >= 12) strength += 2;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 2;

        let colors = ["#ff4d4d", "#ffcc00", "#00cc66"];
        let levels = ["Fraca", "Média", "Forte"];
        let index = Math.min(strength, 2);

        strengthBar.style.background = colors[index];
        strengthText.textContent = "Força: " + levels[index];
    }

    function generateMemorizablePassword() {
        const words = ["Azul", "Sol", "Gato", "Forte", "Rio", "Piano"];
        const password = words[Math.floor(Math.random() * words.length)] + 
                         "-" + Math.floor(Math.random() * 99) + "!";
        passwordField.value = password;
    }

    generateBtn.addEventListener("click", generatePassword);
    memorizableBtn.addEventListener("click", generateMemorizablePassword);
    
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(passwordField.value);
        alert("Senha copiada!");
    });

    toggleThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});