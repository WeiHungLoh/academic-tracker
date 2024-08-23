import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from './firebaseConfig';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isReset, setIsReset] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid email or password. Please try again.');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error) {
            setError('Error creating account. Please try again.');
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email has been sent! Please also check your junk email');
        } catch (error) {
            setError('Error sending password reset email. Please try again with a valid email address');
        }
    }

    const toggleForm = () => {
        setIsLogin(!isLogin);
        if (isReset) {
            setIsReset(!isReset);
        }
        setError('');
    };

    const toggleReset = () => {
        setIsReset(!isReset);
        setIsLogin(!isLogin);
        setError('');
    }

    return (
        <div className="login">
            <h2>{isReset ? 'Reset your password' : isLogin ? 'Login to Academic Tracker' : 'Create an Account'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={isReset ? handleReset : isLogin ? handleLogin : handleSignUp}>
                <label>Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                />
                {!isReset && <>
                <label>{isLogin ? 'Password' : 'Password must be at least 6 characters long'}</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                />
                </>
                }
                <button type="submit">{isReset ? 'Reset password' : isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p onClick={toggleForm} style={{ cursor: 'pointer', color: '#007BFF', marginTop: '20px' }}>
                {isLogin ? 'Don’t have an account? Create one' : 'Already have an account? Login'}
            </p>
            <p onClick={toggleReset} style={{ cursor: 'pointer', color: '#007BFF', marginTop: '20px' }}>
                {isLogin && 'Forget your password? Reset password here'}
            </p>
        </div>
    );
};

export default Login;
