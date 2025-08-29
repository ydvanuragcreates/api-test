

const express = require('express');
const app = express();

// Middleware to parse JSON bodies. This is crucial for a POST request.
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Define the POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Extract the 'data' array from the request body
        const { data } = req.body;

        // --- 1. Basic Input Validation ---
        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: "your_full_name_ddmmyyyy", // Replace with your data
                message: "Input data must be an array."
            });
        }

        // --- 2. Initialize variables for response ---
        const user_id = "Jane_Doe_29082025"; // MODIFY THIS with your details
        const email = "jane.doe@example.com";   // MODIFY THIS
        const roll_number = "RA12345678"; // MODIFY THIS

        let odd_numbers = [];
        let even_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;
        let alphabet_chars = "";

        // --- 3. Process the input array ---
        data.forEach(item => {
            if (typeof item !== 'string') {
                // Handle non-string elements if necessary, or skip
                return;
            }

            // Check if item is a number
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item); // Keep it as a string as per requirement
                } else {
                    odd_numbers.push(item);
                }
            }
            // Check if item is an alphabet string
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabet_chars += item; // Add all chars for concatenation logic
            }
            // Otherwise, it's a special character
            else {
                special_characters.push(item);
            }
        });

        // --- 4. Logic for 'concat_string' ---
        const reversed_alphabets = alphabet_chars.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }
        
        // --- 5. Construct the final response object ---
        const response_data = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: sum.toString(), // Sum must be a string
            concat_string: concat_string,
        };

        // --- 6. Send the successful response ---
        res.status(200).json(response_data);

    } catch (error) {
        // --- 7. Graceful error handling ---
        res.status(500).json({
            is_success: false,
            user_id: "your_full_name_ddmmyyyy", // Replace with your data
            message: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
// Add this GET route for the root path
app.get('/', (req, res) => {
  res.status(200).send('API is up and running. Use the /bfhl endpoint with a POST request.');
});
