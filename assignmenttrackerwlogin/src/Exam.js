import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from './firebaseConfig';

const Exam = () => {
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [duration, setDuration] = useState('');

    useEffect(() => {
        if (!user) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 5000); 

            return () => clearTimeout(timer); 
        }
    }, [user, navigate]); 

    if (!user) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px'
        }}>Please log in to view assignments. You will be directed to login page in 5 seconds</div>;
    }

    const handleAdd = async e => {
        e.preventDefault();

        if (!user) {
            alert('Please log in to add assignments.');
            return;
        }
        if (task.trim() === '' || dueDate === '' || duration === '') {
            alert('Please enter a task, its due date and duration before adding.');
            return;
        }

        try {
            await addDoc(collection(db, `users/${user.uid}/exams`), {
                task: task,
                dueDate: dueDate,
                isComplete: false,
                duration: duration
            });
            setTask('');
            setDueDate('');
            navigate('/examschedule');
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem adding the assignment: ' + error.message);
        }
    };

    return (
        <div className="exam">
            <h2>Welcome to Exam Tracker</h2>
            <label>Input task description</label>
            <input
                value={task}
                onChange={e => setTask(e.target.value)}
                placeholder='Type your task here'
                required
            />
            <label>Input due date and time</label>
            <input
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                type='datetime-local'
                required
            />
            <label>Input exam duration (in minutes)</label> {/* New label for duration */}
            <input
                value={duration}
                onChange={e => setDuration(e.target.value)}
                type='number'
                placeholder='Enter duration in minutes'
                required
            />
            <div className="submit-button">
                <button onClick={handleAdd}>Add exam</button>
                <button onClick={() => navigate('/examschedule')}>View exams</button>
            </div>
        </div>
    );
};

export default Exam;
