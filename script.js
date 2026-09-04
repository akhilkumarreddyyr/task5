

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});


/* Close mobile menu after clicking a link */

const allNavLinks = document.querySelectorAll(".nav-links a");

allNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("show");
    });
});



const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const destinationCards = document.querySelectorAll(".destination-card");


function filterDestinations() {

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedRegion = regionFilter.value;

    destinationCards.forEach(function (card) {

        const destinationName =
            card.dataset.name.toLowerCase();

        const destinationRegion =
            card.dataset.region;

        const matchesSearch =
            destinationName.includes(searchText);

        const matchesRegion =
            selectedRegion === "all" ||
            destinationRegion === selectedRegion;

        if (matchesSearch && matchesRegion) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}


searchInput.addEventListener(
    "input",
    filterDestinations
);

regionFilter.addEventListener(
    "change",
    filterDestinations
);



const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

const favoritesList =
    document.getElementById("favoritesList");


let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];


/* Display favorites */

function displayFavorites() {

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {

        favoritesList.innerHTML = `
            <p class="empty-favorites">
                No favorite destinations yet.
                Start exploring and click ♡!
            </p>
        `;

        return;
    }


    favorites.forEach(function (destination) {

        const item =
            document.createElement("div");

        item.classList.add("favorite-item");

        item.innerHTML = `
            ❤️ ${destination}
        `;

        favoritesList.appendChild(item);

    });

}


/* Update favorite buttons */

function updateFavoriteButtons() {

    favoriteButtons.forEach(function (button) {

        const destination =
            button.dataset.destination;

        if (favorites.includes(destination)) {

            button.textContent = "❤️";
            button.classList.add("active");

        } else {

            button.textContent = "♡";
            button.classList.remove("active");

        }

    });

}


/* Add or remove favorite */

favoriteButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const destination =
                button.dataset.destination;


            if (favorites.includes(destination)) {

                favorites =
                    favorites.filter(function (item) {
                        return item !== destination;
                    });

            } else {

                favorites.push(destination);

            }


            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );


            displayFavorites();
            updateFavoriteButtons();

        }
    );

});


displayFavorites();
updateFavoriteButtons();



const questions = [

    {
        question:
            "Which city is famous for the Eiffel Tower?",

        answers: [

            {
                text: "Paris",
                correct: true
            },

            {
                text: "Dubai",
                correct: false
            },

            {
                text: "Tokyo",
                correct: false
            },

            {
                text: "Bali",
                correct: false
            }

        ]

    },


    {
        question:
            "Which destination is famous for beautiful islands and clear blue water?",

        answers: [

            {
                text: "Maldives",
                correct: true
            },

            {
                text: "Paris",
                correct: false
            },

            {
                text: "Switzerland",
                correct: false
            },

            {
                text: "Dubai",
                correct: false
            }

        ]

    },


    {
        question:
            "Which city is famous for the Burj Khalifa?",

        answers: [

            {
                text: "Dubai",
                correct: true
            },

            {
                text: "Paris",
                correct: false
            },

            {
                text: "Tokyo",
                correct: false
            },

            {
                text: "Bali",
                correct: false
            }

        ]

    },


    {
        question:
            "Which country is famous for Mount Fuji?",

        answers: [

            {
                text: "Japan",
                correct: true
            },

            {
                text: "France",
                correct: false
            },

            {
                text: "Indonesia",
                correct: false
            },

            {
                text: "UAE",
                correct: false
            }

        ]

    },


    {
        question:
            "Which destination is known for mountains and beautiful lakes?",

        answers: [

            {
                text: "Switzerland",
                correct: true
            },

            {
                text: "Maldives",
                correct: false
            },

            {
                text: "Dubai",
                correct: false
            },

            {
                text: "Bali",
                correct: false
            }

        ]

    }

];


let currentQuestionIndex = 0;
let score = 0;


const questionElement =
    document.getElementById("question");

const answerButtons =
    document.getElementById("answer-buttons");

const nextButton =
    document.getElementById("next-btn");

const quizResult =
    document.getElementById("quiz-result");

const questionNumber =
    document.getElementById("questionNumber");

const scoreDisplay =
    document.getElementById("scoreDisplay");


function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    quizResult.textContent = "";

    nextButton.textContent =
        "Next Question →";

    showQuestion();

}


function showQuestion() {

    resetQuizState();


    const currentQuestion =
        questions[currentQuestionIndex];


    questionNumber.textContent =
        "Question " +
        (currentQuestionIndex + 1) +
        " of " +
        questions.length;


    scoreDisplay.textContent =
        "Score: " + score;


    questionElement.textContent =
        currentQuestion.question;


    currentQuestion.answers.forEach(
        function (answer) {

            const button =
                document.createElement("button");

            button.textContent =
                answer.text;

            button.dataset.correct =
                answer.correct;

            button.addEventListener(
                "click",
                selectAnswer
            );

            answerButtons.appendChild(button);

        }
    );

}


function resetQuizState() {

    nextButton.style.display = "none";


    while (answerButtons.firstChild) {

        answerButtons.removeChild(
            answerButtons.firstChild
        );

    }

}


function selectAnswer(event) {

    const selectedButton =
        event.target;

    const isCorrect =
        selectedButton.dataset.correct === "true";


    if (isCorrect) {

        selectedButton.classList.add(
            "correct"
        );

        score++;

        scoreDisplay.textContent =
            "Score: " + score;

    } else {

        selectedButton.classList.add(
            "wrong"
        );

    }


    Array.from(answerButtons.children)
        .forEach(function (button) {

            if (
                button.dataset.correct === "true"
            ) {

                button.classList.add(
                    "correct"
                );

            }

            button.disabled = true;

        });


    nextButton.style.display =
        "inline-block";

}


function showScore() {

    resetQuizState();


    questionElement.textContent =
        "Quiz Completed! 🎉";


    questionNumber.textContent =
        "Completed";


    scoreDisplay.textContent =
        "Final Score: " +
        score +
        " / " +
        questions.length;


    quizResult.textContent =
        "Great job! You scored " +
        score +
        " out of " +
        questions.length +
        ".";


    nextButton.textContent =
        "Play Again 🔄";


    nextButton.style.display =
        "inline-block";

}


nextButton.addEventListener(
    "click",
    function () {

        currentQuestionIndex++;


        if (
            currentQuestionIndex <
            questions.length
        ) {

            showQuestion();

        } else if (
            currentQuestionIndex ===
            questions.length
        ) {

            showScore();

        } else {

            startQuiz();

        }

    }
);


/* =========================================
   WEATHER API
========================================= */

const cityInput =
    document.getElementById("cityInput");

const weatherButton =
    document.getElementById("weatherBtn");

const cityName =
    document.getElementById("cityName");

const temperature =
    document.getElementById("temperature");

const weatherDescription =
    document.getElementById(
        "weatherDescription"
    );


async function getWeather() {

    const city =
        cityInput.value.trim();


    if (city === "") {

        cityName.textContent =
            "Please enter a city name.";

        temperature.textContent = "";

        weatherDescription.textContent = "";

        return;

    }


    cityName.textContent =
        "Loading weather...";

    temperature.textContent = "";

    weatherDescription.textContent = "";


    try {

        /* Get city coordinates */

        const locationResponse =
            await fetch(
                "https://geocoding-api.open-meteo.com/v1/search?name=" +
                encodeURIComponent(city) +
                "&count=1&language=en&format=json"
            );


        const locationData =
            await locationResponse.json();


        if (
            !locationData.results ||
            locationData.results.length === 0
        ) {

            cityName.textContent =
                "City not found ❌";

            return;

        }


        const location =
            locationData.results[0];


        const latitude =
            location.latitude;

        const longitude =
            location.longitude;


        /* Get weather */

        const weatherResponse =
            await fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=" +
                latitude +
                "&longitude=" +
                longitude +
                "&current_weather=true"
            );


        const weatherData =
            await weatherResponse.json();


        const weather =
            weatherData.current_weather;


        cityName.textContent =
            "📍 " +
            location.name +
            ", " +
            location.country;


        temperature.textContent =
            "🌡️ " +
            weather.temperature +
            "°C";


        weatherDescription.textContent =
            getWeatherDescription(
                weather.weathercode
            );

    }

    catch (error) {

        cityName.textContent =
            "Unable to get weather ❌";

        temperature.textContent = "";

        weatherDescription.textContent =
            "Please check your internet connection.";

    }

}


function getWeatherDescription(code) {

    if (code === 0) {

        return "☀️ Clear Sky";

    }

    else if (
        code === 1 ||
        code === 2 ||
        code === 3
    ) {

        return "🌤️ Partly Cloudy";

    }

    else if (
        code === 45 ||
        code === 48
    ) {

        return "🌫️ Foggy";

    }

    else if (
        code >= 51 &&
        code <= 67
    ) {

        return "🌧️ Rainy";

    }

    else if (
        code >= 71 &&
        code <= 77
    ) {

        return "❄️ Snowy";

    }

    else if (
        code >= 80 &&
        code <= 82
    ) {

        return "🌦️ Rain Showers";

    }

    else if (
        code >= 95 &&
        code <= 99
    ) {

        return "⛈️ Thunderstorm";

    }

    else {

        return "🌡️ Weather information available";

    }

}


weatherButton.addEventListener(
    "click",
    getWeather
);


cityInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            getWeather();

        }

    }
);


/* =========================================
   CONTACT FORM VALIDATION
========================================= */

const contactForm =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const messageInput =
    document.getElementById("message");

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const messageError =
    document.getElementById("messageError");

const successMessage =
    document.getElementById(
        "successMessage"
    );


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        successMessage.textContent = "";


        let isValid = true;


        /* Name validation */

        if (
            nameInput.value.trim().length < 3
        ) {

            nameError.textContent =
                "Please enter a valid name.";

            isValid = false;

        }


        /* Email validation */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                emailInput.value.trim()
            )
        ) {

            emailError.textContent =
                "Please enter a valid email.";

            isValid = false;

        }


        /* Message validation */

        if (
            messageInput.value.trim().length < 10
        ) {

            messageError.textContent =
                "Message must contain at least 10 characters.";

            isValid = false;

        }


        /* Success */

        if (isValid) {

            successMessage.textContent =
                "🎉 Message sent successfully!";

            contactForm.reset();

        }

    }
);


/* =========================================
   NEWSLETTER SUBSCRIPTION
========================================= */

const newsletterEmail =
    document.getElementById(
        "newsletterEmail"
    );

const subscribeBtn =
    document.getElementById(
        "subscribeBtn"
    );

const newsletterMessage =
    document.getElementById(
        "newsletterMessage"
    );


subscribeBtn.addEventListener(
    "click",
    function () {

        const email =
            newsletterEmail.value.trim();


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            newsletterMessage.textContent =
                "Please enter a valid email address.";

            newsletterMessage.style.color =
                "#f87171";

            return;

        }


        newsletterMessage.textContent =
            "🎉 Successfully subscribed!";

        newsletterMessage.style.color =
            "#86efac";


        newsletterEmail.value = "";

    }
);


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section");


window.addEventListener(
    "scroll",
    function () {

        let current = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 120;

                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >=
                    sectionTop &&

                    window.scrollY <
                    sectionTop +
                    sectionHeight
                ) {

                    current =
                        section.getAttribute("id");

                }

            }
        );


        allNavLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);



startQuiz();
