import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Unified login handler for both form and social buttons
  const handleAuthAction = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      {/* 🚀 BACKGROUND PATTERNS */}
      <div style={styles.bgCircuitTop}></div>
      <div style={styles.bgCircuitBottom}></div>

      {/* "Go to Homepage" Button */}
      <div style={styles.homepageBtnContainer}>
        <button onClick={handleGoHome} style={styles.homepageBtn}>
          <span style={{ marginRight: '8px' }}>←</span> Go to Homepage
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p style={styles.subtitle}>
            {isLogin ? 'Please login to your account' : 'Register your analyst credentials'}
          </p>
        </div>

        <form onSubmit={handleAuthAction} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={styles.input} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type="password" 
                placeholder="Enter your password" 
                style={styles.inputPassword} 
                required 
              />
              <span onClick={handleAuthAction} style={styles.passwordArrow}>→</span>
            </div>
          </div>

          <div style={styles.options}>
            <label style={styles.remember}>
              <input type="checkbox" style={{ marginRight: '8px' }} /> Remember me
            </label>
            <span style={styles.forgot}>Forgot Password</span>
          </div>

          <button type="submit" style={styles.loginBtn}>
            {loading ? 'Initializing SOC...' : (isLogin ? 'Login' : 'Create Node')}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>or</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* 🛠️ FUNCTIONAL SOCIAL LOGIN STACK */}
        <div style={styles.socialGroup}>
          <button onClick={() => handleAuthAction()} style={styles.socialBtn}>
            <img src="https://img.icons8.com/color/22/000000/google-logo.png" alt="G" /> 
            {loading ? 'Connecting...' : 'Continue with Google'}
          </button>
          
          <button onClick={() => handleAuthAction()} style={styles.socialBtn}>
            <img src="https://img.icons8.com/ios-filled/22/3f51b5/facebook-new.png" alt="F" style={{ filter: 'brightness(1.5)' }} /> 
            {loading ? 'Connecting...' : 'Continue with Facebook'}
          </button>
          
          <button onClick={() => handleAuthAction()} style={styles.socialBtn}>
            <img src="https://img.icons8.com/ios-filled/22/ffffff/mac-os.png" alt="A" /> 
            {loading ? 'Connecting...' : 'Continue with Apple ID'}
          </button>
        </div>

        <div style={styles.footer}>
          {isLogin ? "Don't have an Account?" : "Already have an account?"} 
          <span 
            style={styles.toggle} 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? ' Sign Up' : ' Login'}
          </span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0d1117',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Inter', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  },
  bgCircuitTop: {
    position: 'absolute',
    width: '45%', height: '45%',
    top: '2%', right: '2%',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/circuit-board.png")',
    opacity: 0.1, zIndex: 0, filter: 'invert(1)'
  },
  bgCircuitBottom: {
    position: 'absolute',
    width: '45%', height: '45%',
    bottom: '5%', left: '2%',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/circuit-board.png")',
    opacity: 0.1, zIndex: 0, filter: 'invert(1)'
  },
  homepageBtnContainer: { position: 'absolute', top: '30px', left: '30px', zIndex: 10 },
  homepageBtn: {
    background: 'transparent', border: '1px solid #30363d',
    color: '#8b949e', padding: '10px 20px',
    borderRadius: '30px', cursor: 'pointer',
    fontSize: '13px', display: 'flex', alignItems: 'center',
    transition: '0.3s'
  },
  card: {
    width: '420px',
    backgroundColor: 'rgba(22, 27, 34, 0.95)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    padding: '45px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
    zIndex: 5,
    border: '1px solid #30363d'
  },
  header: { textAlign: 'left', marginBottom: '30px' },
  title: { color: '#ffffff', fontSize: '28px', margin: '0 0 8px 0', fontWeight: 'bold' },
  subtitle: { color: '#8b949e', fontSize: '14px' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', color: '#c9d1d9', fontSize: '13px', marginBottom: '8px', fontWeight: '500' },
  input: {
    width: '100%', padding: '14px',
    backgroundColor: '#0d1117', border: '1px solid #30363d',
    borderRadius: '12px', color: 'white', outline: 'none',
    boxSizing: 'border-box', fontSize: '14px'
  },
  passwordWrapper: { position: 'relative' },
  inputPassword: {
    width: '100%', padding: '14px', paddingRight: '45px',
    backgroundColor: '#0d1117', border: '1px solid #30363d',
    borderRadius: '12px', color: 'white', outline: 'none',
    boxSizing: 'border-box', fontSize: '14px'
  },
  passwordArrow: {
    position: 'absolute', right: '15px', top: '50%',
    transform: 'translateY(-50%)', color: '#58a6ff',
    fontSize: '22px', cursor: 'pointer'
  },
  options: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '13px', color: '#8b949e', marginBottom: '20px',
    alignItems: 'center'
  },
  remember: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  forgot: { color: '#58a6ff', cursor: 'pointer' },
  loginBtn: {
    width: '100%', padding: '15px',
    backgroundColor: '#5865f2', 
    color: 'white', border: 'none',
    borderRadius: '12px', fontWeight: '600',
    cursor: 'pointer', fontSize: '15px', transition: '0.3s'
  },
  divider: { textAlign: 'center', color: '#484f58', margin: '25px 0', fontSize: '13px', display: 'flex', alignItems: 'center' },
  dividerLine: { flex: 1, height: '1px', backgroundColor: '#30363d' },
  dividerText: { padding: '0 12px' },
  socialGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  socialBtn: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: '10px',
    width: '100%', padding: '13px',
    backgroundColor: 'transparent', border: '1px solid #30363d',
    borderRadius: '12px', color: '#c9d1d9',
    cursor: 'pointer', fontSize: '14px',
    transition: '0.2s'
  },
  footer: { textAlign: 'center', marginTop: '25px', color: '#8b949e', fontSize: '14px' },
  toggle: { color: '#58a6ff', fontWeight: '600', cursor: 'pointer' }
};

export default LoginPage;