import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    toast.success('Welcome to SmartStay!', {
      position: 'top-center',
      autoClose: 3000,
    });

    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <ToastContainer />
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <h1 className="logo">SmartStay</h1>
        <nav>
          <Link to="/login" className="btn btn-login" aria-label="Login">
            Login
          </Link>
          <Link to="/register" className="btn btn-register" aria-label="Register">
            Register
          </Link>
        </nav>
      </header>

      <section className="hero fade-in">
        <h2>Welcome to SmartStay 🌟</h2>
        <p>
          A smarter way to check into hotels. Enjoy faster, secure, and seamless check-ins with
          face verification and digital IDs.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt="SmartStay logo"
          className="hero-image"
        />
        <Link to="/register" className="btn btn-cta" aria-label="Get Started with SmartStay">
          Get Started
        </Link>
      </section>

      <section className="features fade-in delay-1s">
        <h3>Features</h3>
        <div className="feature-list">
          <div className="feature-item">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/face-id.png"
              alt="Face Verification"
            />
            <h4>Face Verification</h4>
            <p>Secure and fast check-ins using facial recognition technology.</p>
          </div>
          <div className="feature-item">
            <img src="https://img.icons8.com/ios-filled/100/000000/qr-code.png" alt="QR Code" />
            <h4>QR Code Check-in</h4>
            <p>Easy access using QR codes generated for registered users.</p>
          </div>
          <div className="feature-item">
            <img src="https://img.icons8.com/ios-filled/100/000000/lock-2.png" alt="Security" />
            <h4>Data Security</h4>
            <p>Your data is safe and encrypted for maximum privacy.</p>
          </div>
        </div>
      </section>

      <section className="testimonials fade-in delay-2s">
        <h3>What Our Customers Say</h3>
        <div className="testimonial-list">
          <blockquote>
            <p>"SmartStay made my hotel check-in so easy and fast! No more long lines."</p>
            <footer>- Akhila Gampa</footer>
          </blockquote>
          <blockquote>
            <p>"I love the face verification feature. Super secure and convenient."</p>
            <footer>- John Doe</footer>
          </blockquote>
          <blockquote>
            <p>"Highly recommend SmartStay for anyone who travels frequently."</p>
            <footer>- Jane Smith</footer>
          </blockquote>
        </div>
      </section>

      <footer className="footer">
        &copy; {new Date().getFullYear()} SmartStay. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
