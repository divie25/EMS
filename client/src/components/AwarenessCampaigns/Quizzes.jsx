import React, { useState } from 'react';

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuizzes = async () => {
        try {
            const response = await fetch('/api/quizzes');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuizzes(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchQuizzes();
    }, []);

    if (loading) return <div>Loading quizzes...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <h2>Environmental Awareness Quizzes</h2>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz.id}>
                        <h3>{quiz.title}</h3>
                        <p>{quiz.description}</p>
                        <button onClick={() => alert(`Starting quiz: ${quiz.title}`)}>Start Quiz</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Quizzes;