import React, { useContext, useEffect } from 'react';
import noteContext from '../Context/noteContext';

export default function About() {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">About Us</h1>
            <p className="lead">
                Welcome to <strong>iNotebook</strong>, your personal online notebook designed to keep your notes safe, secure, and accessible from anywhere. Our mission is to provide a seamless and efficient note-taking experience for users who value privacy and convenience.
            </p>
            <h2 className="mt-4">What is iNotebook?</h2>
            <p>
                iNotebook is a web application built using the powerful MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to create, store, and manage their notes online with ease. Each user has their own secure space, ensuring that your notes are only accessible to you.
            </p>
            <h2 className="mt-4">Key Features</h2>
            <ul>
                <li><strong>Secure Login and Signup:</strong> We prioritize your privacy and security. With our robust authentication system, you can be confident that your notes are safe.</li>
                <li><strong>Personalized Notes:</strong> Each user has a unique account, ensuring that your notes are private and only accessible to you.</li>
                <li><strong>Online Accessibility:</strong> Access your notes from any device, anywhere in the world. All you need is an internet connection.</li>
                <li><strong>User-Friendly Interface:</strong> Our intuitive design makes it easy for you to create, edit, and manage your notes.</li>
            </ul>
            <h2 className="mt-4">Our Technology</h2>
            <p>
                iNotebook leverages the power of the MERN stack to deliver a fast, responsive, and reliable application:
            </p>
            <ul>
                <li><strong>MongoDB:</strong> Our database of choice, MongoDB, ensures that your data is stored securely and can be accessed quickly.</li>
                <li><strong>Express.js:</strong> This backend framework allows us to build a robust and scalable server to handle all your requests.</li>
                <li><strong>React:</strong> Our frontend is built with React, providing a dynamic and interactive user experience.</li>
                <li><strong>Node.js:</strong> The backbone of our server, Node.js, ensures that our application runs smoothly and efficiently.</li>
            </ul>
            <h2 className="mt-4">Meet the Developer</h2>
            <p>
                iNotebook is developed by <strong>Ali Khan</strong>, a passionate Full Stack (MERN) developer. With a keen interest in creating efficient and user-friendly web applications, Ali has dedicated his skills to building iNotebook to help users manage their notes effortlessly.
            </p>
        </div>
    );
}
