// backend/routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const router = express.Router();

// ENV credentials
const FACE_API_KEY = process.env.FACEPP_API_KEY;
const FACE_API_SECRET = process.env.FACEPP_API_SECRET;
const DETECT_URL = 'https://api-us.faceplusplus.com/facepp/v3/detect';
const COMPARE_URL = 'https://api-us.faceplusplus.com/facepp/v3/compare';

// Multer config – store in memory, validate mimetype
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error('Only .jpg or .png allowed'), false);
};

const upload = multer({ storage, fileFilter }).fields([
  { name: 'idFront' },
  { name: 'idBack' },
  { name: 'selfie' },
]);

// 🧠 Helper: Get face_token from Face++ detect
const detectFaceToken = async (imageBuffer) => {
  const form = new FormData();
  form.append('api_key', FACE_API_KEY);
  form.append('api_secret', FACE_API_SECRET);
  form.append('image_file', imageBuffer, {
    filename: 'image.jpg',
    contentType: 'image/jpeg',
  });

  const headers = form.getHeaders();
  const { data } = await axios.post(DETECT_URL, form, { headers });

  if (!data.faces || data.faces.length === 0) {
    throw new Error('No face detected');
  }

  return data.faces[0].face_token;
};

// 📦 POST /api/upload – handles face verification
router.post('/upload', upload, async (req, res) => {
  try {
    const { docType } = req.body;
    const { idFront, selfie, idBack } = req.files || {};

    if (!idFront || !selfie || (docType === 'Aadhaar' && !idBack)) {
      return res.status(400).json({ message: 'Missing required documents' });
    }

    // 🧠 Detect face tokens
    const frontToken = await detectFaceToken(idFront[0].buffer);
    const selfieToken = await detectFaceToken(selfie[0].buffer);

    // 🆚 Compare faces
    const compareRes = await axios.post(COMPARE_URL, null, {
      params: {
        api_key: FACEPP_API_KEY,
        api_secret: FACEPP_API_SECRET,
        face_token1: frontToken,
        face_token2: selfieToken,
      },
    });

    const confidence = compareRes.data.confidence || 0;
    const match = confidence >= 70;

    res.status(200).json({ match, confidence });
  } catch (err) {
    console.error('Face++ Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Face verification failed', error: err.message });
  }
});

module.exports = router;
