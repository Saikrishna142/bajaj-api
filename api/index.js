const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: 'Invalid input: data must be an array',
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      const strItem = String(item);
      if (!isNaN(strItem) && strItem.trim() !== '') {
        const num = parseFloat(strItem);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(strItem);
        } else {
          odd_numbers.push(strItem);
        }
      } else if (/^[a-zA-Z]+$/.test(strItem)) {
        alphabets.push(strItem.toUpperCase());
      } else {
        special_characters.push(strItem);
      }
    });

    const alphaString = alphabets
      .join('')
      .split('')
      .reverse()
      .map((char, index) =>
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join('');

    const response = {
      is_success: true,
      user_id: 'prabhas_123',
      email: 'prabhas@gmail.com',
      roll_number: 'ABCD123',
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string: alphaString,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      is_success: false,
      message: 'Internal server error',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});