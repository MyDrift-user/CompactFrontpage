// ==UserScript==
// @name         CompactFrontpage
// @namespace    CompactFrontpage
// @author       MyDrift (https://github.com/MyDrift-user/)
// @version      1.0
// @match        *://moodle.bbbaden.ch/
// @icon         https://github.com/MyDrift-user/CompactFrontpage/blob/main/compact.png?raw=true
// @downloadURL  https://github.com/MyDrift-user/CompactFrontpage/raw/main/CompactFrontpage.user.js
// @updateURL    https://github.com/MyDrift-user/CompactFrontpage/raw/main/CompactFrontpage.user.js
// ==/UserScript==


(function() {
    'use strict';

    // Select all images within 'courses frontpage-course-list-enrolled'
    const images = document.querySelectorAll('.courses.frontpage-course-list-enrolled img');

    // Apply styles for vertical centering and responsive sizing
    images.forEach(image => {
        image.style.height = '80px'; // Fixed height
        image.style.width = 'auto';  // Responsive width
        image.style.borderRadius = '10px'; // Corner radius
        image.style.objectFit = 'contain'; // Prevent stretching

        // Ensuring the parent container is a flex container for vertical centering
        const parentContainer = image.parentElement;
        parentContainer.style.display = 'flex';
        parentContainer.style.alignItems = 'center';
        parentContainer.style.justifyContent = 'center'; // Centering horizontally as well

        // Image-specific styles for centering
        image.style.display = 'block';
        image.style.margin = 'auto'; // For vertical and horizontal centering
    });

    // Remaining script for removing summaries and moving 'info' elements
    const courses = document.querySelectorAll('.courses.frontpage-course-list-enrolled');
    courses.forEach(course => {
        const summaries = course.querySelectorAll('.summary');
        summaries.forEach(summary => {
            const noOverflow = summary.querySelector('.no-overflow');
            if (!noOverflow || !noOverflow.querySelector('img')) {
                summary.remove();
            }
        });

        const infoElements = course.querySelectorAll('.info');
        const flexContainers = course.querySelectorAll('.flex-grow-1');

        infoElements.forEach((info, index) => {
            if(flexContainers[index]) {
                flexContainers[index].style.display = 'flex';
                flexContainers[index].style.alignItems = 'center';
                flexContainers[index].appendChild(info);
            }
        });
    });
})();
