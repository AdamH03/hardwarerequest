# hardware-request
Computer Hardware Order Request Webpage
This project is a simple webpage for submitting computer hardware order requests. It allows users to input quantities for various hardware items, calculates the subtotal, VAT, and total, and submits the order details via a form.

Features
Responsive Design: The webpage is designed to be responsive and user-friendly.
Dynamic Calculations: Automatically calculates the subtotal, VAT, and total based on user input.
Form Submission: Submits the order details, including a PO number, to a specified endpoint using Formspree.
Technologies Used
HTML: Structure of the webpage.
CSS: Styling of the webpage.
JavaScript (jQuery): Dynamic calculations and form submission.
Formspree: Handling form submissions.
Setup and Usage
Prerequisites
A web browser (e.g., Chrome, Firefox, Safari)
Internet connection
Installation
Clone the Repository:
git clone https://github.com/yourusername/hardware-order-request.git
cd hardware-order-request

Open the Webpage:
Open index.html in your web browser.
Configuration
Formspree Endpoint:
Replace YOUR_FORMSPREE_ENDPOINT in the index.html file with your actual Formspree endpoint URL.
Usage
Enter Quantities:
Input the quantities for the desired hardware items in the provided fields.
Enter PO Number:
Enter the Purchase Order (PO) number in the designated field.
Submit the Form:
Click the “Submit Order” button to submit the order details.
Files
index.html: Main HTML file containing the structure of the webpage.
style.css: CSS file for styling the webpage.
script.js: JavaScript file for dynamic calculations and form submission.
Customization
Styling:
Modify style.css to change the appearance of the webpage.
JavaScript:
Modify script.js to change the behavior of the dynamic calculations and form submission.
Troubleshooting
Form Submissions Going to Spam:
Ensure your email address is verified in Formspree.
Customize your email template in Formspree to avoid spam triggers.
