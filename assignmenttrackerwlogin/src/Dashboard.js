import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from './firebaseConfig';

const Dashboard = () => {
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();
    const user = auth.currentUser;

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
        if (task.trim() === '' || dueDate === '') {
            alert('Please enter a task and its due date before adding.');
            return;
        }

        try {
            await addDoc(collection(db, `users/${user.uid}/assignments`), {
                task: task,
                dueDate: dueDate,
                isComplete: false
            });
            setTask('');
            setDueDate('');
            navigate('/assignments');
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem adding the assignment: ' + error.message);
        }
    };

    return (
        <div className="dashboard">
            <h2>Welcome to Assignment Tracker</h2>
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
            <div className="submit-button">
                <button onClick={handleAdd}>Add assignment</button>
                <button onClick={() => navigate('/assignments')}>View assignments</button>
            </div>
        </div>
    );
};

export default Dashboard;
