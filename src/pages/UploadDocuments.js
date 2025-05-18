// UploadDocuments.js
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Webcam from 'react-webcam';
import './upload.css';

export default function UploadDocuments({ onUploadComplete }) {
  const [docType, setDocType] = useState('Select ID type');
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);
  const [previewSelfie, setPreviewSelfie] = useState(null);

  const handleFileChange = (e, setter, previewSetter) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
      previewSetter(URL.createObjectURL(file));
    }
  };

  const captureSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelfie(dataURLtoFile(imageSrc, 'selfie.jpg'));
    setPreviewSelfie(imageSrc);
    setCaptured(true);
    setShowWebcam(false);
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const handleUpload = async () => {
    if (!idFront || !selfie || (docType === 'Aadhaar' && !idBack)) {
      toast.error('Please upload all required documents');
      return;
    }

    const formData = new FormData();
    formData.append('docType', docType);
    formData.append('idFront', idFront);
    if (idBack) formData.append('idBack', idBack);
    formData.append('selfie', selfie);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      if (res.data.match) {
        toast.success(`✅ Face matched! Confidence: ${res.data.confidence.toFixed(2)}%`);
        onUploadComplete(true, res.data.confidence);
      } else {
        toast.warn(`❌ Face mismatch. Confidence: ${res.data.confidence.toFixed(2)}%`);
        onUploadComplete(false, res.data.confidence);
      }
    } catch (err) {
      toast.error('Upload or face verification failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = (type) => {
    if (type === 'front') {
      setIdFront(null);
      setPreviewFront(null);
    } else if (type === 'back') {
      setIdBack(null);
      setPreviewBack(null);
    } else if (type === 'selfie') {
      setSelfie(null);
      setPreviewSelfie(null);
      setCaptured(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>📄 Upload Your Government ID & Selfie</h2>

      <label>Select Document Type</label>
      <select value={docType} onChange={(e) => setDocType(e.target.value)}>
        <option value="Aadhaar">Aadhaar</option>
        <option value="PAN">PAN</option>
        <option value="Passport">Passport</option>
        <option value="Driving License">Driving License</option>
        <option value="Voter ID">Voter ID</option>
      </select>

      <div className="upload-section">
        <label>ID Front Image</label>
        <div className="action-buttons">
          <button onClick={() => document.getElementById('frontUpload').click()}>📷 Capture</button>
          <input id="frontUpload" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setIdFront, setPreviewFront)} />
          <button onClick={() => document.getElementById('frontFile').click()}>📁 Choose File</button>
          <input id="frontFile" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setIdFront, setPreviewFront)}/>
        </div>
        {previewFront && (
          <>
            <img src={previewFront} alt="ID Front" className="preview" />
            <button className="delete-button" onClick={() => deleteFile('front')}>Delete</button>
          </>
        )}
      </div>

      {docType === 'Aadhaar' && (
        <div className="upload-section">
          <label>ID Back Image</label>
          <div className="action-buttons">
            <button onClick={() => document.getElementById('backUpload').click()}>📷 Capture</button>
            <input id="backUpload" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setIdBack, setPreviewBack)} />
            <button onClick={() => document.getElementById('backFile').click()}>📁 Choose File</button>
            <input id="backFile" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setIdBack, setPreviewBack)}/>
          </div>
          {previewBack && (
            <>
              <img src={previewBack} alt="ID Back" className="preview" />
              <button className="delete-button" onClick={() => deleteFile('back')}>Delete</button>
            </>
          )}
        </div>
      )}

      <div className="upload-section">
        <label>Selfie Image</label>
        {!previewSelfie && !showWebcam && (
          <button onClick={() => setShowWebcam(true)}>📸 Capture Selfie</button>
        )}
        {showWebcam && (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="camera-preview"
            />
            <div className="camera-controls">
              <button onClick={captureSelfie}>Use Photo</button>
              <button className="retake" onClick={() => setShowWebcam(false)}>Retake</button>
            </div>
          </>
        )}
        {previewSelfie && !showWebcam && (
          <>
            <img src={previewSelfie} alt="Selfie Preview" className="preview" />
            <button className="delete-button" onClick={() => deleteFile('selfie')}>Delete</button>
          </>
        )}
      </div>

      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Verifying...' : 'Upload & Verify'}
      </button>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
