document.addEventListener("DOMContentLoaded", function () {

    // Initialize EmailJS
    emailjs.init("gkbkNmCZSAbGB8lGG");

    const form = document.getElementById("messageForm");

    if (!form) {
        console.error("Form not found!");
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Debug: check values before sending
        console.log("First Name:", form.firstName.value);
        console.log("Last Name:", form.lastName.value);
        console.log("Email:", form.email.value);
        console.log("Message:", form.message.value);

        emailjs.sendForm(
            "service_9ibei8r",
            "template_vor0f7c",
            form
        )
        .then(function (response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("Message sent successfully!");
            form.reset();
        })
        .catch(function (error) {
            console.error("FAILED...", error);
            alert("Failed to send message");
        });

    });

});
