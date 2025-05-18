const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function compareFaces(imagePath1, imagePath2) {
  if (!fs.existsSync(imagePath1) || !fs.existsSync(imagePath2)) {
    throw new Error('One or both image paths do not exist.');
  }

  const url = 'https://api-us.faceplusplus.com/facepp/v3/compare';

  const form = new FormData();
  form.append('api_key', process.env.FACEPP_API_KEY);
  form.append('api_secret', process.env.FACEPP_API_SECRET);
  form.append('image_file1', fs.createReadStream(imagePath1));
  form.append('image_file2', fs.createReadStream(imagePath2));

  try {
    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    if (response.data.error_message) {
      throw new Error(`Face++ API Error: ${response.data.error_message}`);
    }

    return response.data; // contains confidence, is_same_person, etc.
  } catch (err) {
    console.error('Face++ Compare Error:', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { compareFaces };
