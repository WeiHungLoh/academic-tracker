import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFirestoreQuery from './useFirestoreQuery';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import formatDate from './formatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useEffect } from 'react';

const Schedule = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const userUid = user ? user.uid : null;

    const { data: exams, isPending, error } = useFirestoreQuery(`users/${userUid}/exams`);

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

    const handleCompleteToggle = async (exam) => {
        const assignmentRef = doc(db, `users/${userUid}/exams`, exam.id);
        await updateDoc(assignmentRef, { isComplete: !exam.isComplete });
    };

    const handleDelete = async (id) => {
        const assignmentRef = doc(db, `users/${userUid}/exams`, id);
        await deleteDoc(assignmentRef);
    };

    const calculateTimeLeft = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const timeDifference = due - now;

        if (timeDifference < 0) {
            return "Past due";
        }

        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes`;
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to login page after logout
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="tasks-list">
            <div className="tasks-header">
                <h2>Exam Tracker</h2>
            </div>
            {exams && exams.map(exam => (
                <div className="assignment" key={exam.id}>
                    <div className="assignment-content">
                        <h2>{exam.task}</h2>
                        <p style={{marginBottom:'4px'}}>{formatDate(exam.dueDate)}</p>
                        <p style={{color: '#00796b'}}>Exam duration: {exam.duration} minutes</p>
                        <p>Time left: {calculateTimeLeft(exam.dueDate)}</p>
                        <FontAwesomeIcon 
                            icon={exam.isComplete ? faCheckCircle : faTimesCircle} 
                            style={{ color: exam.isComplete ? '#28a745' : '#dc3545', marginRight: '8px' }} 
                        />
                    </div>
                    <div className="button-group">
                        <button onClick={() => handleCompleteToggle(exam)} style={{
                            backgroundColor: exam.isComplete ? 'green' : '#f1356d',
                            color: 'white',
                            border: '0',
                            padding: '8px 10px',
                            borderRadius: '10px',
                            cursor: 'pointer'
                        }}>

                            {exam.isComplete ? 'Mark as incomplete' : 'Mark as complete'}
                        </button>
                        <button onClick={() => handleDelete(exam.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            <div className="task-button">
                <button onClick={() => navigate('/exams')}>Add new exam</button>
                </div>
        </div>
    );
};

export default Schedule;
