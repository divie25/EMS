import React from 'react';

const Articles = () => {
    const articles = [
        {
            title: "The Importance of Recycling",
            content: "Recycling helps reduce waste and conserve natural resources. It is essential for sustainable living."
        },
        {
            title: "Understanding Air Quality",
            content: "Air quality is crucial for health and well-being. Learn about the factors that affect air quality and how to improve it."
        },
        {
            title: "Water Conservation Techniques",
            content: "Water is a precious resource. Discover effective techniques for conserving water in your daily life."
        }
    ];

    return (
        <div>
            <h1>Environmental Articles</h1>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Articles;