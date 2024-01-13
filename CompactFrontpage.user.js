// ==UserScript==
// @name         CompactFrontpage
// @namespace    CompactFrontpage
// @author       MyDrift (https://github.com/MyDrift-user/)
// @version      1.1
// @match        *://moodle.bbbaden.ch/
// @icon         https://github.com/MyDrift-user/CompactFrontpage/blob/main/compact.png?raw=true
// @downloadURL  https://github.com/MyDrift-user/CompactFrontpage/raw/main/CompactFrontpage.user.js
// @updateURL    https://github.com/MyDrift-user/CompactFrontpage/raw/main/CompactFrontpage.user.js
// ==/UserScript==


(function() {
    'use strict';

    const searchForm = document.querySelector('.simplesearchform');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            const searchInput = searchForm.querySelector('input[type="search"]');
            // Check for empty or space-only input
            if (!searchInput || searchInput.value.trim() === '') {
                event.preventDefault();
            }
        });
    }

    const header = document.getElementById('page-header');
    if (header) header.remove();

    const targetHeader = document.querySelector('#frontpage-course-list > h2');
    const searchBar = document.querySelector('.simplesearchform');
    const elementToRemove = document.querySelector('.box.py-3.d-flex.justify-content-center');

    if (searchBar && targetHeader && elementToRemove) {
        const flexContainer = Object.assign(document.createElement('div'), {
            style: 'display: flex; justify-content: space-between; align-items: center;'
        });
        flexContainer.append(targetHeader.cloneNode(true), searchBar);
        targetHeader.replaceWith(flexContainer);
        elementToRemove.remove();
    } else console.error('One or more elements not found');

    document.querySelectorAll('.courses.frontpage-course-list-enrolled img').forEach(image => {
        Object.assign(image.style, {
            height: '80px', width: 'auto', borderRadius: '10px', objectFit: 'contain', display: 'block', margin: 'auto'
        });
        Object.assign(image.parentElement.style, {
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        });
    });

    document.querySelectorAll('.courses.frontpage-course-list-enrolled').forEach(course => {
        course.querySelectorAll('.summary').forEach(summary => {
            if (!summary.querySelector('.no-overflow img')) summary.remove();
        });

        course.querySelectorAll('.info').forEach((info, index) => {
            const container = course.querySelectorAll('.flex-grow-1')[index];
            if (container) {
                Object.assign(container.style, {
                    display: 'flex', alignItems: 'center'
                });
                container.appendChild(info);
            }
        });
    });
})();
