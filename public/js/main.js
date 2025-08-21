import {fullErrorList, defaultError} from '../data/errors.js';

import {chapterData} from '../data/chapters.js';
import {placeholderStory} from '../data/default.js';

// --- USER EDITABLE: DEFAULT ERROR CODE ---
// If no "error" parameter is in the URL, this chapter will be shown by default.
// You can change this to any valid 4xx error code from the list below.
const USER_DEFAULT_ERROR_CODE = 418;

const storyContentContainer = document.getElementById('story-content-container');
const chapterSelect = document.getElementById('chapter-select');
const topPrevButton = document.getElementById('top-prev-chapter');
const topNextButton = document.getElementById('top-next-chapter');
const bottomPrevButton = document.getElementById('bottom-prev-chapter');
const bottomNextButton = document.getElementById('bottom-next-chapter');

let lastPoohP = null;
let conversationCycle = 0;
let typingInterval = null;
let currentConversationScript = null;
let chapterOrder = [];


function typewriter(element, text, onComplete) {
    let i = 0;
    element.textContent = '';
    if (typingInterval) clearInterval(typingInterval);
    typingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            clearInterval(typingInterval);
            typingInterval = null;
            if (onComplete) onComplete();
        }
    }, 40);
}

function handleOptionClick(event) {
    const choiceType = event.target.dataset.choice;
    const userText = event.target.textContent;

    document.getElementById('response-options').innerHTML = '';
    document.querySelector('.narrator-prompt').style.display = 'none';

    appendUserResponse(userText, () => {
        const thinkingP = appendPoohThinking();
        setTimeout(() => {
            document.getElementById('chat-log').removeChild(thinkingP);

            const turnData = currentConversationScript[conversationCycle + 1];
            const poohsReply = turnData.poohResponse[choiceType];

            appendPoohResponse(poohsReply, () => {
                conversationCycle++;
                if (conversationCycle >= 5) {
                    triggerEnding();
                } else {
                    createOptions();
                }
            });
        }, 2500 + Math.random() * 1000);
    });
}

function createOptions() {
    const responseOptionsContainer = document.getElementById('response-options');
    responseOptionsContainer.innerHTML = '';
    if (!currentConversationScript) return;
    const currentOptions = currentConversationScript[conversationCycle].options;

    const friendlyButton = document.createElement('button');
    friendlyButton.className = 'option-button';
    friendlyButton.textContent = currentOptions.friendly;
    friendlyButton.dataset.choice = 'friendly';
    friendlyButton.addEventListener('click', handleOptionClick);
    responseOptionsContainer.appendChild(friendlyButton);

    const manipulativeButton = document.createElement('button');
    manipulativeButton.className = 'option-button';
    manipulativeButton.textContent = currentOptions.manipulative;
    manipulativeButton.dataset.choice = 'manipulative';
    manipulativeButton.addEventListener('click', handleOptionClick);
    responseOptionsContainer.appendChild(manipulativeButton);
}

function appendUserResponse(text, onComplete) {
    lastPoohP.style.fontStyle = 'normal';
    const p = document.createElement('p');
    p.className = 'user-response';
    document.getElementById('chat-log').appendChild(p);
    typewriter(p, `— ${text}`, onComplete);
}

function appendPoohThinking() {
    const p = document.createElement('p');
    p.className = 'pooh-thinking';
    p.textContent = 'Pooh is having a small think...';
    document.getElementById('chat-log').appendChild(p);
    return p;
}

function appendPoohResponse(text, onComplete) {
    const p = document.createElement('p');
    p.style.fontStyle = 'italic';
    const log = document.getElementById('chat-log');
    log.appendChild(p);
    lastPoohP = p;
    typewriter(p, text, onComplete);
}

function triggerEnding() {
    document.getElementById('honeypot').style.opacity = '0';
    document.getElementById('honeypot').style.transform = 'translateY(-100px)';
    const narratorP = document.createElement('p');
    narratorP.className = 'narrator';
    document.getElementById('chat-log').appendChild(narratorP);

    typewriter(narratorP, "And so, with a fright and a worry, Pooh Bear grabbed his honey and hurried away to the safety of Rabbit's house, quite sure he had just met a Woozle Bot. THE END.", () => {
        setTimeout(() => {
            const goodbyeP = document.createElement('p');
            goodbyeP.className = 'narrator';
            document.getElementById('chat-log').appendChild(goodbyeP);
            typewriter(goodbyeP, "Goodbye.", () => {
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            });
        }, 2000);
    });
}

function updateChapterDisplay(errorCode) {


    const chapter = chapterData[errorCode] || {
        ...defaultError,
        name: fullErrorList[errorCode]?.name || "Puzzling Error"
    };

    document.getElementById('chapter-number').textContent = `Chapter ${errorCode}`;
    document.getElementById('chapter-title').innerHTML = chapter.title.replace(/\n/g, '<br>');
    document.getElementById('chapter-subtitle').textContent = `A tale of Error: ${errorCode}, ${chapter.name}.`;
    document.getElementById('chapter-description').textContent = chapter.description;

    let storyHTML = `<div id="honeypot" class="honeypot-emoji">🍯</div>
                             <div class="text-block" id="story-container">`;
    const storyParagraphs = chapter.story || placeholderStory.story;
    storyParagraphs.forEach((p, index) => {
        if (index === storyParagraphs.length - 1) {
            storyHTML += `<p id="last-pooh-p">${p}</p>`;
        } else {
            storyHTML += `<p>${p}</p>`;
        }
    });
    storyHTML += `<div id="chat-log"></div></div>`;

    currentConversationScript = chapter.conversationScript || placeholderStory.conversationScript;

    if (currentConversationScript) {
        storyHTML += `<p class="narrator-prompt">Pooh has asked you a question. How do you respond?</p>
                              <div id="response-options"></div>`;
    }
    storyContentContainer.innerHTML = storyHTML;

    try {
        const url = new URL(window.location);
        url.searchParams.set('error', errorCode);
        window.history.pushState({path: url.href}, '', url.href);
    } catch (e) {
        console.warn("Could not update URL history:", e.message);
    }
}

function resetConversation() {
    if (typingInterval) clearInterval(typingInterval);
    conversationCycle = 0;

    const log = document.getElementById('chat-log');
    if (log) log.innerHTML = '';

    const allParagraphs = document.querySelectorAll('#story-container > p');
    if (allParagraphs.length > 0) {
        lastPoohP = document.getElementById('last-pooh-p');
        if (lastPoohP) lastPoohP.style.fontStyle = 'italic';
    }

    const prompt = document.querySelector('.narrator-prompt');
    if (prompt) prompt.style.display = 'block';

    const honeypot = document.getElementById('honeypot');
    if (honeypot) {
        honeypot.style.opacity = '1';
        honeypot.style.transform = 'translateY(0)';
    }

    if (currentConversationScript) {
        createOptions();
    }
}

function initializePage() {

    chapterOrder = Object.keys(fullErrorList);
    for (const code in fullErrorList) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${fullErrorList[code].name}`;
        chapterSelect.appendChild(option);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const initialErrorCode = parseInt(urlParams.get('error'), 10) || 418;

    const validInitialCode = initialErrorCode in fullErrorList ? initialErrorCode : 418;
    chapterSelect.value = validInitialCode;
    updateChapterDisplay(validInitialCode);

    chapterSelect.addEventListener('change', (event) => {
        updateChapterDisplay(event.target.value);
        resetConversation();
    });

    function navigate(direction) {
        const currentIndex = chapterOrder.indexOf(chapterSelect.value);
        let nextIndex = currentIndex + direction;
        if (nextIndex >= chapterOrder.length) {
            nextIndex = 0; // Wrap around to the start
        }
        if (nextIndex < 0) {
            nextIndex = chapterOrder.length - 1; // Wrap around to the end
        }
        const nextChapterCode = chapterOrder[nextIndex];
        chapterSelect.value = nextChapterCode;
        updateChapterDisplay(nextChapterCode);
        resetConversation();
    }

    topPrevButton.addEventListener('click', () => navigate(-1));
    topNextButton.addEventListener('click', () => navigate(1));
    bottomPrevButton.addEventListener('click', () => navigate(-1));
    bottomNextButton.addEventListener('click', () => navigate(1));

    storyContentContainer.addEventListener('click', (e) => {
        if (e.target.id === 'side-prev') navigate(-1);
        if (e.target.id === 'side-next') navigate(1);
    });


    resetConversation();
}

window.onload = initializePage;
