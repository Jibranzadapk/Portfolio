// --- Section visibility control ---
function hideAllSections() {
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
}

// --- Helper to show section with correct display type ---
function showSection(id, displayType = "flex") {
    const sec = document.getElementById(id);
    if (sec) sec.style.display = displayType;
}

// --- Hashing function ---
async function hashString(str) {
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

const storedUsernameHash = "f87e05a68dc4bf0ee3dff5905d2be968190505b3008d8f3ad748532f19ed305d";
const storedPasswordHash = "778cffbae76d19d4083e44cde9f27b17ac41d89d9c46a5bcca15e5a41f5d5536";

// --- Initial state: show only login section ---
document.addEventListener("DOMContentLoaded", () => {
    hideAllSections();
    showSection("loginsectionadmin", "flex"); // keep flex for centering
});

// --- Popup handler ---
function showPopup(message, success = false) {
    const popup = document.getElementById("popupadmin");
    popup.innerText = message;
    popup.style.display = "block";
    popup.style.background = success ? "black" : "black";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

// --- Login Function ---
async function loginadmin() {
    const username = document.getElementById("usernameadmin").value.trim();
    const password = document.getElementById("passwordadmin").value.trim();

    const userHash = await hashString(username);
    const passHash = await hashString(password);

    // Clear fields for next try
    document.getElementById("usernameadmin").value = "";
    document.getElementById("passwordadmin").value = "";

    if (userHash === storedUsernameHash && passHash === storedPasswordHash) {
        showPopup("Access Granted", true);

        // Delay showing dashboard until popup finishes
        setTimeout(() => {
            hideAllSections();
            showSection("dashboardsectionadmin", "flex"); // flex keeps it centered
        }, 2000);
    } else {
        showPopup("Access Denied", false);
    }
}

// --- Logout Function ---
function logoutadmin() {
    hideAllSections();
    showSection("loginsectionadmin", "flex"); // back to centered login
}

// --- Open Blog ---
function openBlogadmin() {
    hideAllSections();
    showSection("blogsection", "block");
}

// --- Open Project ---
function openProjectadmin() {
    hideAllSections();
    showSection("blogsection", "block");
}

const SECURE_PASSWORD_HASH = '778cffbae76d19d4083e44cde9f27b17ac41d89d9c46a5bcca15e5a41f5d5536';

// Global variable to store the loaded HTML template
let htmlTemplate = null;

async function loadHTMLTemplate() {
    try {
        const response = await fetch('prototype.html');
        if (!response.ok) {
            throw new Error(`Failed to load prototype.html: ${response.status} ${response.statusText}`);
        }
        htmlTemplate = await response.text();
        console.log('✅ HTML template loaded successfully from prototype.html');
        return htmlTemplate;
    } catch (error) {
        console.error('❌ Error loading HTML template:', error);
        // Fallback to inline template if external file fails
        htmlTemplate = getInlineHTMLTemplate();
        console.log('⚠️ Using fallback inline HTML template');
        return htmlTemplate;
    }
}

// Fallback inline template (same as before, in case external file fails)
function getInlineHTMLTemplate() {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Internal Prototype</title>
</head>
<body>
<h1>This is loaded bcz external prototype file is not loaded</h1>
</body>
</html>`;
}

async function generateSHA256Hash(str) {
    try {
        // Convert string to Uint8Array
        const encoder = new TextEncoder();
        const data = encoder.encode(str);

        // Generate SHA-256 hash
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        // Convert hash to hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

        return hashHex;
    } catch (error) {
        console.error('Error generating SHA-256 hash:', error);
        throw new Error('Failed to generate password hash');
    }
}

async function verifyPassword(inputPassword) {
    try {
        const inputHash = await generateSHA256Hash(inputPassword);

        const storedHashArray = new Uint8Array(SECURE_PASSWORD_HASH.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const inputHashArray = new Uint8Array(inputHash.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        if (storedHashArray.length !== inputHashArray.length) {
            return false;
        }
        let result = 0;
        for (let i = 0; i < storedHashArray.length; i++) {
            result |= storedHashArray[i] ^ inputHashArray[i];
        }

        return result === 0;
    } catch (error) {
        console.error('Error verifying password:', error);
        return false;
    }
}

let correctPasswordHashHex = null;

async function initializeSecureHash() {
    try {
        correctPasswordHashHex = await generateSHA256Hash('useless');
        console.log('Security system initialized successfully');
    } catch (error) {
        console.error('Failed to initialize security system:', error);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    await initializeSecureHash();
    await loadHTMLTemplate(); // Load the external HTML template
    console.log('🔒 Secure Blog Editor initialized successfully');
    console.log('🛡️ Password protection: SHA-256 hash verification');
    console.log('✅ All security measures active');
    console.log('🧹 Auto-cleanup system enabled');
});

const plusBtn = document.getElementById('plus-btn');
const popupblog = document.getElementById('popupblog');
const blogSection = document.getElementById('blogsection');
const saveBtn = document.getElementById('save-btn');

const modalOverlay = document.getElementById('modalOverlay');
const modalName = document.getElementById('modalName');
const modalLink = document.getElementById('modalLink');
const modalSave = document.getElementById('modalSave');
const modalCancel = document.getElementById('modalCancel');
const saveModalOverlay = document.getElementById('saveModalOverlay');
const saveModalCancel = document.getElementById('saveModalCancel');
const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const stage3 = document.getElementById('stage3');
const stage1Next = document.getElementById('stage1Next');
const stage2Back = document.getElementById('stage2Back');
const stage2Next = document.getElementById('stage2Next');
const stage3Back = document.getElementById('stage3Back');
const stage3Download = document.getElementById('stage3Download');
const saveModalTitle = document.getElementById('saveModalTitle');
const passwordInput = document.getElementById('authPassword');
const passwordError = document.getElementById('passwordError');
const saveTitle = document.getElementById('saveTitle');
const saveKeywords = document.getElementById('saveKeywords');
const saveDescription = document.getElementById('saveDescription');
const saveRobots = document.getElementById('saveRobots');
const exportProgress = document.getElementById('exportProgress');
let currentConfigButton = null; // reference to the dynamic button being configured    

// Save button click handler
saveBtn.addEventListener('click', () => {
    openSaveModal();
});

plusBtn.addEventListener('click', () => {
    plusBtn.classList.toggle('rotate');
    popupblog.classList.toggle('show');
});

popupblog.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.dataset.type;
        const template = document.getElementById(`template-${type}`);
        if (template) {
            const clone = template.content.cloneNode(true);
            attachEvents(clone);
            blogSection.appendChild(clone);
        }
        popupblog.classList.remove('show');
        plusBtn.classList.remove('rotate');
    });
});

function openConfigModal(targetBtn) {
    currentConfigButton = targetBtn;
    modalName.value = targetBtn.dataset.name || "";
    modalLink.value = targetBtn.dataset.url || "";
    modalOverlay.classList.add('show');
    setTimeout(() => {
        modalName.focus();
    }, 60);
}

function closeConfigModal() {
    currentConfigButton = null;
    modalOverlay.classList.remove('show');
    modalName.value = "";
    modalLink.value = "";
}

modalCancel.addEventListener('click', () => closeConfigModal());
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeConfigModal();
});

modalSave.addEventListener('click', () => {
    if (!currentConfigButton) return closeConfigModal();

    const name = modalName.value.trim();
    const url = modalLink.value.trim();

    if (name) {
        currentConfigButton.textContent = name;
        currentConfigButton.dataset.name = name;
    } else {
        currentConfigButton.textContent = '+Add';
        delete currentConfigButton.dataset.name;
    }

    if (url) {
        let safe = url;
        if (!/^https?:\/\//i.test(safe)) safe = 'https://' + safe;
        currentConfigButton.dataset.url = safe;
        currentConfigButton.dataset.configured = 'true';
    } else {
        delete currentConfigButton.dataset.url;
        currentConfigButton.dataset.configured = 'false';
    }
    closeConfigModal();
});

function openSaveModal() {
    showStage(1);
    passwordInput.value = '';
    passwordError.style.display = 'none';
    exportProgress.classList.remove('show');
    saveModalTitle.textContent = 'Blog Details';
    saveModalOverlay.classList.add('show');
    saveModalOverlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => saveTitle.focus(), 80);
}

function closeSaveModal() {
    saveModalOverlay.classList.remove('show');
    saveModalOverlay.setAttribute('aria-hidden', 'true');
    exportProgress.classList.remove('show');
}

function showStage(n) {
    const stages = [stage1, stage2, stage3];
    stages.forEach((s, idx) => {
        if (idx === (n - 1)) {
            s.classList.remove('hidden');
            s.classList.add('active');
            s.setAttribute('aria-hidden', 'false');
        } else {
            s.classList.remove('active');
            s.classList.add('hidden');
            s.setAttribute('aria-hidden', 'true');
        }
    });

    if (n === 1) saveModalTitle.textContent = 'Blog Details';
    else if (n === 2) saveModalTitle.textContent = 'Authorization Required';
    else if (n === 3) saveModalTitle.textContent = 'Export Blog';
}

stage1Next.addEventListener('click', () => {
    if (saveTitle.value.trim() === '') {
        saveTitle.focus();
        return;
    }
    showStage(2);
    setTimeout(() => passwordInput.focus(), 80);
});

stage2Back.addEventListener('click', () => {
    showStage(1);
    setTimeout(() => saveTitle.focus(), 80);
});

stage2Next.addEventListener('click', async () => {
    passwordError.style.display = 'none';
    const enteredPassword = passwordInput.value || '';

    // Show loading state
    stage2Next.disabled = true;
    stage2Next.textContent = 'Verifying...';

    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const isPasswordCorrect = await verifyPassword(enteredPassword);
        if (isPasswordCorrect) {
            showStage(3);
            console.log('Authentication successful');
        } else {
            passwordError.style.display = 'block';
            passwordInput.focus();
            console.log('Authentication failed');
        }
    } catch (error) {
        console.error('Authentication error:', error);
        passwordError.textContent = 'Authentication system error. Please try again.';
        passwordError.style.display = 'block';
    } finally {
        stage2Next.disabled = false;
        stage2Next.textContent = 'Verify & Continue';
    }
});

stage3Back.addEventListener('click', () => {
    showStage(2);
    setTimeout(() => passwordInput.focus(), 80);
});

stage3Download.addEventListener('click', async () => {
    exportProgress.classList.add('show');
    stage3Download.disabled = true;
    stage3Download.textContent = 'Generating...';

    try {
        await new Promise(resolve => setTimeout(resolve, 800));

        const htmlContent = await exportBlogToHTML();
        const blogTitle = saveTitle.value.trim() || 'blog';
        const safeTitle = blogTitle.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const filename = `${safeTitle}-${timestamp}.html`;

        downloadHTML(htmlContent, filename);
        exportProgress.classList.remove('show');
        setTimeout(() => {
            closeSaveModal();
        }, 1000);
    } catch (error) {
        console.error('Export error:', error);
        alert('Error generating HTML file. Please try again.');
    } finally {
        stage3Download.disabled = false;
        stage3Download.textContent = 'Download HTML';
        exportProgress.classList.remove('show');
    }
});

// Save modal close handlers
saveModalCancel.addEventListener('click', closeSaveModal);
saveModalOverlay.addEventListener('click', (e) => {
    if (e.target === saveModalOverlay) closeSaveModal();
});

function placeCaretAtEnd(el) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function placeCaretAtStart(el) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function downloadHTML(content, filename) {
    const blob = new Blob([content], {
        type: 'text/html;charset=utf-8'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

function attachEvents(block) {
    const deleteBtn = block.querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => deleteBtn.parentElement.remove());
    }
    const textarea = block.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', () => {
            if (textarea.value.length >= 0) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        });
        setTimeout(() => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }, 0);
    }
    const uploadAudio = block.querySelector('.upload-audio');
    if (uploadAudio) {
        const audioEl = block.querySelector('audio');
        uploadAudio.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.mp3';
            fileInput.click();
            fileInput.addEventListener('change', e => {
                const file = e.target.files[0];
                if (file) {
                    audioEl.src = URL.createObjectURL(file);
                    uploadAudio.remove();
                }
            });
        });
    }
    const uploadImage = block.querySelector('.upload-image');
    if (uploadImage) {
        uploadImage.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.jpg,.jpeg,.png,.gif';
            fileInput.click();
            fileInput.addEventListener('change', e => {
                const file = e.target.files[0];
                if (file) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    uploadImage.parentElement.appendChild(img);
                    const secondBtn = uploadImage.nextElementSibling;
                    if (secondBtn) secondBtn.remove();
                    uploadImage.remove();
                }
            });
        });
    }
    const linkImage = block.querySelector('.link-image');
    if (linkImage) {
        linkImage.addEventListener('click', () => {
            const url = prompt("Enter image URL:");
            if (url) {
                const img = document.createElement('img');
                img.src = url;
                linkImage.parentElement.appendChild(img);
                const prev = linkImage.previousElementSibling;
                if (prev) prev.remove();
                linkImage.remove();
            }
        });
    }
    const uploadVideo = block.querySelector('.upload-video');
    if (uploadVideo) {
        uploadVideo.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.mp4';
            fileInput.click();
            fileInput.addEventListener('change', e => {
                const file = e.target.files[0];
                if (file) {
                    const vid = document.createElement('video');
                    vid.src = URL.createObjectURL(file);
                    vid.controls = true;
                    uploadVideo.parentElement.appendChild(vid);
                    const secondBtn = uploadVideo.nextElementSibling;
                    if (secondBtn) secondBtn.remove();
                    uploadVideo.remove();
                }
            });
        });
    }
    const linkVideo = block.querySelector('.link-video');
    if (linkVideo) {
        linkVideo.addEventListener('click', () => {
            const url = prompt("Enter video URL:");
            if (url) {
                const embed = url.includes("watch?v=") ? url.replace("watch?v=", "embed/") : url;
                const iframe = document.createElement('iframe');
                iframe.src = embed;
                iframe.width = "100%";
                iframe.height = "400px";
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                linkVideo.parentElement.appendChild(iframe);
                const prev = linkVideo.previousElementSibling;
                if (prev) prev.remove();
                linkVideo.remove();
            }
        });
    }
    const dynBtn = block.querySelector('.dynamic-config-btn');
    if (dynBtn) {
        if (!dynBtn.dataset.configured) dynBtn.dataset.configured = 'false';

        dynBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (this.dataset.configured === 'true' && this.dataset.url) {
                window.open(this.dataset.url, '_blank');
            } else {
                openConfigModal(this);
            }
        });
        dynBtn.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            openConfigModal(this);
        });
    }
    const countBtn = block.querySelector('.count-list-btn');
    const bulletBtn = block.querySelector('.bullet-list-btn');
    const listArea = block.querySelector('.list-area');
    if (countBtn) {
        countBtn.addEventListener('click', () => {
            const controls = countBtn.parentElement;
            if (controls) controls.style.display = 'none';

            const ol = document.createElement('ol');
            ol.className = 'editable-list';
            const li = document.createElement('li');
            li.contentEditable = 'true';
            li.spellcheck = false;
            li.innerHTML = '';
            ol.appendChild(li);
            listArea.appendChild(ol);
            placeCaretAtStart(li);
            ol.addEventListener('keydown', function(e) {
                const target = e.target;
                if (target && target.tagName && target.tagName.toLowerCase() === 'li') {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const newLi = document.createElement('li');
                        newLi.contentEditable = 'true';
                        newLi.spellcheck = false;
                        newLi.innerHTML = '';
                        if (target.nextSibling) {
                            target.parentNode.insertBefore(newLi, target.nextSibling);
                        } else {
                            target.parentNode.appendChild(newLi);
                        }
                        placeCaretAtStart(newLi);
                    } else if (e.key === 'Backspace') {
                        if (target.textContent.trim() === '') {
                            e.preventDefault();
                            const prev = target.previousElementSibling;
                            const parent = target.parentNode;
                            target.remove();
                            if (prev) {
                                placeCaretAtEnd(prev);
                            } else {
                                if (!parent.querySelector('li')) {
                                    ol.remove();
                                    if (controls) controls.style.display = '';
                                }
                            }
                        }
                    }
                }
            });
        });
    }
    if (bulletBtn) {
        bulletBtn.addEventListener('click', () => {
            const controls = bulletBtn.parentElement;
            if (controls) controls.style.display = 'none';
            const ul = document.createElement('ul');
            ul.className = 'editable-list';
            const li = document.createElement('li');
            li.contentEditable = 'true';
            li.spellcheck = false;
            li.innerHTML = '';
            ul.appendChild(li);
            listArea.appendChild(ul);
            placeCaretAtStart(li);
            ul.addEventListener('keydown', function(e) {
                const target = e.target;
                if (target && target.tagName && target.tagName.toLowerCase() === 'li') {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const newLi = document.createElement('li');
                        newLi.contentEditable = 'true';
                        newLi.spellcheck = false;
                        newLi.innerHTML = '';
                        if (target.nextSibling) {
                            target.parentNode.insertBefore(newLi, target.nextSibling);
                        } else {
                            target.parentNode.appendChild(newLi);
                        }
                        placeCaretAtStart(newLi);
                    } else if (e.key === 'Backspace') {
                        if (target.textContent.trim() === '') {
                            e.preventDefault();
                            const prev = target.previousElementSibling;
                            const parent = target.parentNode;
                            target.remove();
                            if (prev) {
                                placeCaretAtEnd(prev);
                            } else {
                                if (!parent.querySelector('li')) {
                                    ul.remove();
                                    if (controls) controls.style.display = '';
                                }
                            }
                        }
                    }
                }
            });
        });
    }
}

// Updated export function to use external HTML template
async function exportBlogToHTML() {
    // Ensure template is loaded
    if (!htmlTemplate) {
        await loadHTMLTemplate();
    }

    const blogTitle = saveTitle.value.trim() || 'Untitled Blog';
    const keywords = saveKeywords.value.trim();
    const description = saveDescription.value.trim();
    const robots = saveRobots.value.trim() || 'index, follow';
    const contentBlocks = document.querySelectorAll('#blogsection .content-block');
    let blogContent = '';

    contentBlocks.forEach((block, index) => {
        if (block.querySelector('.save-btn') || block.querySelector('.plus-btn')) return;
        const textarea = block.querySelector('textarea');
        const img = block.querySelector('img');
        const video = block.querySelector('video');
        const iframe = block.querySelector('iframe');
        const audio = block.querySelector('audio');
        const list = block.querySelector('.editable-list');
        const customBtn = block.querySelector('.dynamic-config-btn');

        if (textarea) {
            const content = textarea.value.trim();
            if (!content) return;

            const classes = textarea.className;

            if (classes.includes('title')) {
                blogContent += `    <h1 class="blog-title">${escapeHtml(content)}</h1>\n`;
            } else if (classes.includes('heading') && !classes.includes('heading-two') && !classes.includes('heading-three')) {
                blogContent += `    <h2 class="blog-heading">${escapeHtml(content)}</h2>\n`;
            } else if (classes.includes('heading-two')) {
                blogContent += `    <h3 class="blog-heading-2">${escapeHtml(content)}</h3>\n`;
            } else if (classes.includes('heading-three')) {
                blogContent += `    <h4 class="blog-heading-3">${escapeHtml(content)}</h4>\n`;
            } else if (classes.includes('paragraph')) {
                blogContent += `    <p class="blog-paragraph">${escapeHtml(content).replace(/\n/g, '<br>')}</p>\n`;
            } else if (classes.includes('link')) {
                const urlPattern = /(https?:\/\/[^\s]+)/g;
                const linkedContent = escapeHtml(content).replace(urlPattern, '<a href="$1" target="_blank" rel="noopener">$1</a>');
                blogContent += `    <div class="blog-link">${linkedContent}</div>\n`;
            } else if (classes.includes('italic-textarea')) {
                blogContent += `    <p class="blog-italic"><em>${escapeHtml(content).replace(/\n/g, '<br>')}</em></p>\n`;
            }
        } else if (img && img.src) {
            const altText = img.alt || 'Blog image';
            blogContent += `    <div class="blog-image-container">\n        <img src="${img.src}" alt="${escapeHtml(altText)}" class="blog-image">\n    </div>\n`;
        } else if (video && video.src) {
            blogContent += `    <div class="blog-video-container">\n        <video controls class="blog-video" src="${video.src}"></video>\n    </div>\n`;
        } else if (iframe && iframe.src) {
            blogContent += `    <div class="blog-iframe-container">\n        <iframe src="${iframe.src}" class="blog-iframe" frameborder="0" allowfullscreen></iframe>\n    </div>\n`;
        } else if (audio && audio.src) {
            blogContent += `    <div class="blog-audio-container">\n        <audio controls class="blog-audio" src="${audio.src}"></audio>\n    </div>\n`;
        } else if (list) {
            const listItems = list.querySelectorAll('li');
            if (listItems.length > 0) {
                const listType = list.tagName.toLowerCase();
                const listClass = listType === 'ol' ? 'blog-ordered-list' : 'blog-unordered-list';
                blogContent += `    <${listType} class="${listClass}">\n`;

                listItems.forEach(li => {
                    const itemContent = li.textContent.trim();
                    if (itemContent) {
                        blogContent += `        <li>${escapeHtml(itemContent)}</li>\n`;
                    }
                });
                blogContent += `    </${listType}>\n`;
            }
        } else if (customBtn) {
            const btnName = customBtn.dataset.name || customBtn.textContent.trim();
            const btnUrl = customBtn.dataset.url;
            if (btnName && btnName !== '+Add') {
                if (btnUrl) {
                    blogContent += `    <div class="blog-button-container">\n        <a href="${btnUrl}" target="_blank" rel="noopener" class="blog-button">${escapeHtml(btnName)}</a>\n    </div>\n`;
                } else {
                    blogContent += `    <div class="blog-button-container">\n        <button class="blog-button">${escapeHtml(btnName)}</button>\n    </div>\n`;
                }
            }
        }
    });

    // Use the loaded template and replace placeholders
    let finalHTML = htmlTemplate;

    // Replace placeholders with actual content
    finalHTML = finalHTML.replace('{{BLOG_TITLE}}', escapeHtml(blogTitle));

    // Handle meta description
    if (description) {
        finalHTML = finalHTML.replace('{{META_DESCRIPTION}}', `<meta name="description" content="${escapeHtml(description)}">`);
    } else {
        finalHTML = finalHTML.replace('{{META_DESCRIPTION}}', '');
    }

    // Handle meta keywords
    if (keywords) {
        finalHTML = finalHTML.replace('{{META_KEYWORDS}}', `<meta name="keywords" content="${escapeHtml(keywords)}">`);
    } else {
        finalHTML = finalHTML.replace('{{META_KEYWORDS}}', '');
    }

    finalHTML = finalHTML.replace('{{ROBOTS}}', escapeHtml(robots));
    finalHTML = finalHTML.replace('{{BLOG_CONTENT}}', blogContent || '    <p class="blog-paragraph">No content available.</p>\n');
    finalHTML = finalHTML.replace('{{CURRENT_DATE}}', new Date().toLocaleDateString());

    return finalHTML;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modalOverlay.classList.contains('show')) closeConfigModal();
        if (saveModalOverlay.classList.contains('show')) closeSaveModal();
    }
});

document.addEventListener('click', (e) => {});

document.querySelectorAll('.save-modal').forEach(el => {
    el.addEventListener('click', e => e.stopPropagation());
});

document.addEventListener('focus', function(event) {
    if (!saveModalOverlay.classList.contains('show')) return;
    const modal = document.querySelector('.save-modal');
    if (!modal.contains(event.target)) {
        event.stopPropagation();
        modal.querySelector('input, textarea, button')?.focus();
    }
}, true);

function clearSaveModalFields() {
    saveTitle.value = '';
    saveKeywords.value = '';
    saveDescription.value = '';
    saveRobots.value = '';
    passwordInput.value = '';
    passwordError.style.display = 'none';
    exportProgress.classList.remove('show');
    stage2Next.disabled = false;
    stage2Next.textContent = 'Verify & Continue';
    stage3Download.disabled = false;
    stage3Download.textContent = 'Download HTML';
    console.log('✨ Save modal fields cleared');
}

function clearConfigModalFields() {
    modalName.value = '';
    modalLink.value = '';
    console.log('✨ Config modal fields cleared');
}

function clearAllFieldsOnLoad() {
    clearSaveModalFields();
    clearConfigModalFields();
    console.log('🔄 All fields cleared on page load');
}

function closeSaveModalWithCleanup() {
    saveModalOverlay.classList.remove('show');
    saveModalOverlay.setAttribute('aria-hidden', 'true');
    exportProgress.classList.remove('show');
    clearSaveModalFields();
    showStage(1);
}

function closeConfigModalWithCleanup() {
    currentConfigButton = null;
    modalOverlay.classList.remove('show');
    clearConfigModalFields();
}

saveModalCancel.removeEventListener('click', closeSaveModal);
saveModalCancel.addEventListener('click', closeSaveModalWithCleanup);

saveModalOverlay.removeEventListener('click', (e) => {
    if (e.target === saveModalOverlay) closeSaveModal();
});
saveModalOverlay.addEventListener('click', (e) => {
    if (e.target === saveModalOverlay) closeSaveModalWithCleanup();
});

modalCancel.removeEventListener('click', closeConfigModal);
modalCancel.addEventListener('click', closeConfigModalWithCleanup);

modalOverlay.removeEventListener('click', (e) => {
    if (e.target === modalOverlay) closeConfigModal();
});
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeConfigModalWithCleanup();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modalOverlay.classList.contains('show')) closeConfigModalWithCleanup();
        if (saveModalOverlay.classList.contains('show')) closeSaveModalWithCleanup();
    }
});

const originalStage3Download = stage3Download.cloneNode(true);
stage3Download.parentNode.replaceChild(originalStage3Download, stage3Download);

document.getElementById('stage3Download').addEventListener('click', async () => {
    exportProgress.classList.add('show');
    document.getElementById('stage3Download').disabled = true;
    document.getElementById('stage3Download').textContent = 'Generating...';
    try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const htmlContent = await exportBlogToHTML(); // Now uses external template
        const blogTitle = saveTitle.value.trim() || 'blog';
        const safeTitle = blogTitle.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const filename = `${safeTitle}-${timestamp}.html`;
        downloadHTML(htmlContent, filename);
        exportProgress.classList.remove('show');
        setTimeout(() => {
            closeSaveModalWithCleanup(); // Use cleanup version
        }, 1000);
    } catch (error) {
        console.error('Export error:', error);
        alert('Error generating HTML file. Please try again.');
    } finally {
        document.getElementById('stage3Download').disabled = false;
        document.getElementById('stage3Download').textContent = 'Download HTML';
        exportProgress.classList.remove('show');
    }
});

window.addEventListener('beforeunload', () => {
    clearSaveModalFields();
    clearConfigModalFields();
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        clearSaveModalFields();
        clearConfigModalFields();
    }
});

window.addEventListener('load', clearAllFieldsOnLoad);
clearAllFieldsOnLoad();


document.addEventListener("DOMContentLoaded", function() {
    const backBtn = document.querySelector(".back-btn");
    const allSections = document.querySelectorAll("section");
    const dashboardSection = document.getElementById("dashboardsectionadmin");

    if (backBtn) {
        backBtn.addEventListener("click", function() {
            // Hide all sections
            allSections.forEach(section => {
                section.style.display = "none";
            });

            // Show only dashboard section
            if (dashboardSection) {
                dashboardSection.style.display = "block";
            }
        });
    }
});