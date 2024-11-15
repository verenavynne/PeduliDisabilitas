// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// import { getFirestore, collection, getDocs, query, where, doc, getDoc, updateDoc, arrayUnion, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// const firebaseConfig = {
//     apiKey: "AIzaSyDlnPImmvlGesXSzXqH-RLI4QyL2qVkKd0",
//     authDomain: "pedulidisabilitas-a8543.firebaseapp.com",
//     projectId: "pedulidisabilitas-a8543",
//     storageBucket: "pedulidisabilitas-a8543.appspot.com",
//     messagingSenderId: "422069751597",
//     appId: "1:422069751597:web:a69c60bea4000914090da4",
//     measurementId: "G-8PET8RYEF8"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// const urlParams = new URLSearchParams(window.location.search);
// const view = urlParams.get("view");
// const chatID = urlParams.get("chatID");
// const sellerID = urlParams.get("sellerID");
// let currentUser;

// console.log("Chat ID:", chatID);
//  // This will be "history" if redirected from navbar

// // Function to load chat history if 'view=history' is in the URL
// async function loadChatHistory() {
//     const chatsRef = collection(db, "chats");
//     const q = query(chatsRef, where("participants", "array-contains", currentUser.uid));
//     const querySnapshot = await getDocs(q);
//     const chatListContainer = document.getElementById("chatList");

//     chatListContainer.innerHTML = ""; // Clear previous chats

//     querySnapshot.forEach((doc) => {
//         const chatData = doc.data();
//         const otherParticipant = chatData.participants.find(id => id !== currentUser.uid);

//         // Display each chat in chat history
//         const chatItem = document.createElement("div");
//         chatItem.classList.add("chat-item");
//         chatItem.innerHTML = `
//             <p>Chat with User ID: ${otherParticipant}</p>
//             <button onclick="openChat('${doc.id}', '${otherParticipant}')">Open Chat</button>
//         `;
//         chatListContainer.appendChild(chatItem);
//     });
// }

// window.openChat = function(chatID, sellerID) {
//     window.location.href = `chat.html?chatID=${chatID}&sellerID=${sellerID}`;
// };

// // If 'view=history' is in the URL, load the chat history automatically
// if (view === "history") {
//     loadChatHistory();
// }

// // Function to open specific chat when a chat item is clicked
// window.openChat = async function(chatID, otherParticipant) {
//     // Update UI to show the selected chat
//     loadChatMessages(chatID);
//     document.getElementById("chatHeaderName").textContent = `Chat with User ID: ${otherParticipant}`;
//     document.querySelector(".chat-area").style.display = "block";
//     document.querySelector(".chat-input").style.display = "flex";
// };

// // Track auth state
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         currentUser = user;
//         if (view === "history") {
//             loadChatHistory();
//         } else if (chatID) {
//             loadChatMessages(chatID);
//         } else {
//             console.error("Chat ID not provided in URL.");
//         }
//     } else {
//         console.error("No user is signed in.");
//     }
// });

// async function displayParticipantName(chatID) {
//     try {
//         const chatRef = doc(db, "chats", chatID);
//         const chatSnap = await getDoc(chatRef);

//         if (chatSnap.exists()) {
//             const chatData = chatSnap.data();
//             const participants = chatData.participants;

//             // Identify the other participant
//             const otherUserID = participants.find(id => id !== currentUser.uid);

//             if (otherUserID) {
//                 // Fetch the name of the other participant
//                 const userRef = doc(db, "users", otherUserID);
//                 const userSnap = await getDoc(userRef);

//                 if (userSnap.exists()) {
//                     const userData = userSnap.data();
//                     document.getElementById("chatHeaderName").textContent = userData.name || "Unknown User";
//                 } else {
//                     console.error("No user document found for the other participant.");
//                 }
//             } else {
//                 console.error("Other participant not found in chat.");
//             }
//         } else {
//             console.error("No such chat document!");
//         }
//     } catch (error) {
//         console.error("Error fetching participant's name:", error);
//     }
// }


// async function loadChatMessages(chatID) {
//     const chatRef = doc(db, "chats", chatID);
    
//     onSnapshot(chatRef, (docSnapshot) => {
//         if (docSnapshot.exists()) {
//             const chatData = docSnapshot.data();
//             displayMessages(chatData.messages);
//         } else {
//             console.error("Chat document not found.");
//         }
//     });
// }

// // Display messages in the chat area
// function displayMessages(messages) {
//     const chatArea = document.querySelector(".chat-area");
//     chatArea.innerHTML = ""; // Clear previous messages

//     messages.forEach((msg) => {
//         // Create message container (div)
//         const messageContainer = document.createElement("div");
//         messageContainer.classList.add(msg.senderID === currentUser.uid ? "sender" : "seller");

//         // Create message bubble
//         const messageBubble = document.createElement("div");
//         messageBubble.classList.add("message-bubble");
//         messageBubble.textContent = msg.text;
//         messageContainer.appendChild(messageBubble);

//         // Format timestamp
//         const messageTimestamp = new Date(msg.timestamp.seconds * 1000); // Convert Firestore timestamp to JS Date
//         const formattedTime = messageTimestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         // Create timestamp element
//         const timestampElement = document.createElement("div");
//         timestampElement.classList.add("timestamp");
//         timestampElement.textContent = formattedTime;
//         messageContainer.appendChild(timestampElement);

//         // Append to chat area
//         chatArea.appendChild(messageContainer);
//     });
// }

// // Send a message
// async function sendMessage(chatID, messageText) {
//     const chatRef = doc(db, "chats", chatID);
//     try {
//         console.log("Sending message to chatID:", chatID);
//         await updateDoc(chatRef, {
//             messages: arrayUnion({
//                 senderID: currentUser.uid,
//                 text: messageText,
//                 timestamp: new Date()
//             })
//         });
//         console.log("Message sent successfully");
//     } catch (error) {
//         console.error("Error sending message:", error);
//     }
// }

// // Event listener for the send button
// document.getElementById("sendIcon").addEventListener("click", (event) => {
//     event.preventDefault();
//     console.log("Send icon clicked");

//     const messageInput = document.getElementById("messageInput"); // Updated ID
//     const messageText = messageInput ? messageInput.value.trim() : '';

//     console.log("Message text:", messageText);

//     if (messageText && chatID) {
//         sendMessage(chatID, messageText);
//         messageInput.value = ""; // Clear the input field after sending
//     } else {
//         console.warn("No message text or chatID not available");
//     }
// });

// Initialize Firebase app, Firestore, and Auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged,setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where, doc, getDoc, updateDoc, arrayUnion, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDlnPImmvlGesXSzXqH-RLI4QyL2qVkKd0",
    authDomain: "pedulidisabilitas-a8543.firebaseapp.com",
    projectId: "pedulidisabilitas-a8543",
    storageBucket: "pedulidisabilitas-a8543.appspot.com",
    messagingSenderId: "422069751597",
    appId: "1:422069751597:web:a69c60bea4000914090da4",
    measurementId: "G-8PET8RYEF8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("Auth persistence set to local."))
    .catch((error) => console.error("Error setting auth persistence:", error));

// Global variables
const urlParams = new URLSearchParams(window.location.search);
const view = urlParams.get("view");
const chatID = urlParams.get("chatID");
const sellerID = urlParams.get("sellerID");
let currentUser;

console.log("Chat ID:", chatID);
console.log("Seller ID:", sellerID);
console.log("View:", view);


// async function loadChatHistory() {
//     if (!currentUser) return;

//     const chatsRef = collection(db, "chats");
//     const q = query(chatsRef, where("participants", "array-contains", currentUser.uid));
//     const querySnapshot = await getDocs(q);
//     const chatListContainer = document.getElementById("chatList");

//     if (!chatListContainer) {
//         console.error("Chat list container not found.");
//         return;
//     }

//     chatListContainer.innerHTML = ""; // Clear previous chats

//     querySnapshot.forEach((doc) => {
//         const chatData = doc.data();
//         const otherParticipant = chatData.participants.find(id => id !== currentUser.uid);

//         // Fetch the latest message (if messages array is not empty)
//         const lastMessage = chatData.messages.length > 0 ? chatData.messages[chatData.messages.length - 1] : null;
//         const lastMessageText = lastMessage ? lastMessage.text : "No messages yet";
//         const lastMessageTime = lastMessage ? new Date(lastMessage.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";

//         // Create a chat preview item
//         const chatPreviewItem = document.createElement("div");
//         chatPreviewItem.classList.add("chat-preview-item");
//         chatPreviewItem.onclick = () => openChat(doc.id, otherParticipant);

//         chatPreviewItem.innerHTML = `
//             <img src="path/to/avatar.png" class="chat-preview-avatar" alt="Avatar">
//             <div class="chat-preview-info">
//                 <p><strong>User ID: ${otherParticipant}</strong></p>
//                 <p class="chat-preview-last-message">${lastMessageText}</p>
//             </div>
//             <div class="chat-preview-time">${lastMessageTime}</div>
//         `;

//         chatListContainer.appendChild(chatPreviewItem);
//     });
// }

// async function loadChatHistory() {
//     if (!currentUser) return;

//     const chatsRef = collection(db, "chats");
//     const q = query(chatsRef, where("participants", "array-contains", currentUser.uid));
//     const querySnapshot = await getDocs(q);
//     const chatListContainer = document.getElementById("chatList");

//     if (!chatListContainer) {
//         console.error("Chat list container not found.");
//         return;
//     }

//     chatListContainer.innerHTML = ""; // Clear previous chat previews

//     querySnapshot.forEach((doc) => {
//         const chatData = doc.data();
//         const otherParticipant = chatData.participants.find(id => id !== currentUser.uid);

//         // Fetch the latest message (if messages array is not empty)
//         const lastMessage = chatData.messages.length > 0 ? chatData.messages[chatData.messages.length - 1] : null;
//         const lastMessageText = lastMessage ? lastMessage.text : "No messages yet";
//         const lastMessageTime = lastMessage ? new Date(lastMessage.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";

//         // Create a chat preview item
//         const chatPreviewItem = document.createElement("div");
//         chatPreviewItem.classList.add("chat-preview-item");
//         chatPreviewItem.onclick = () => openChat(doc.id, otherParticipant);

//         chatPreviewItem.innerHTML = `
//             <div class="chat-preview-info">
//                 <p><strong> ${otherParticipant}</strong></p>
//                 <p class="chat-preview-last-message">${lastMessageText}</p>
//             </div>
//             <div class="chat-preview-time">${lastMessageTime}</div>
//         `;

//         chatListContainer.appendChild(chatPreviewItem);
//     });
// }

async function loadChatHistory() {
    if (!currentUser) return;

    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participants", "array-contains", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const chatListContainer = document.getElementById("chatList");

    if (!chatListContainer) {
        console.error("Chat list container not found.");
        return;
    }

    chatListContainer.innerHTML = ""; // Clear previous chat previews

    querySnapshot.forEach(async (chatDoc) => {
        const chatData = chatDoc.data();
        const otherParticipantId = chatData.participants.find(id => id !== currentUser.uid);

        // Fetch the other participant's name
        const userRef = doc(db, "users", otherParticipantId);
        const userSnap = await getDoc(userRef);
        const otherParticipantName = userSnap.exists() ? userSnap.data().name : "Unknown User";

        // Fetch the latest message (if messages array is not empty)
        const lastMessage = chatData.messages.length > 0 ? chatData.messages[chatData.messages.length - 1] : null;
        const lastMessageText = lastMessage ? lastMessage.text : "No messages yet";
        const lastMessageTime = lastMessage ? new Date(lastMessage.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";

        // Create a chat preview item
        const chatPreviewItem = document.createElement("div");
        chatPreviewItem.classList.add("chat-preview-item");
        chatPreviewItem.onclick = () => openChat(chatDoc.id, otherParticipantId);

        chatPreviewItem.innerHTML = `
            <div class="chat-preview-info">
                <p><strong>${otherParticipantName}</strong></p>
                <p class="chat-preview-last-message">${lastMessageText}</p>
            </div>
            <div class="chat-preview-time">${lastMessageTime}</div>
        `;

        chatListContainer.appendChild(chatPreviewItem);
    });
}

window.openChat = function(chatID, otherParticipant) {
    window.location.href = `chat.html?chatID=${chatID}&sellerID=${otherParticipant}`;
};

window.openChat = function(chatID, sellerID) {
    window.location.href = `chat.html?chatID=${chatID}&sellerID=${sellerID}`;
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        if (view === "history") {
            loadChatHistory();
        } else if (chatID) {
            loadChatMessages(chatID);
        }
    } else {
        console.error("No user is signed in.");
    }
});

async function loadChatMessages(chatID) {
    const chatRef = doc(db, "chats", chatID);

    onSnapshot(chatRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            const chatData = docSnapshot.data();
            displayMessages(chatData.messages);
        } else {
            console.error("Chat document not found in Firestore.");
        }
    });
}

// Display Messages in the Chat Area
function displayMessages(messages) {
    const chatArea = document.querySelector(".chat-area");
    if (!chatArea) {
        console.error(".chat-area not found in DOM");
        return;
    }
    chatArea.innerHTML = ""; // Clear previous messages
    messages.forEach((msg) => {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add(msg.senderID === currentUser.uid ? "sender" : "seller");

        const messageBubble = document.createElement("div");
        messageBubble.classList.add("message-bubble");
        messageBubble.textContent = msg.text;
        messageContainer.appendChild(messageBubble);

        const messageTimestamp = new Date(msg.timestamp.seconds * 1000);
        const formattedTime = messageTimestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timestampElement = document.createElement("div");
        timestampElement.classList.add("timestamp");
        timestampElement.textContent = formattedTime;
        messageContainer.appendChild(timestampElement);

        chatArea.appendChild(messageContainer);
    });
    console.log("Messages displayed:", messages);
}

async function displayParticipantName(chatID) {
    try {
        const chatRef = doc(db, "chats", chatID);
        const chatSnap = await getDoc(chatRef);

        if (chatSnap.exists()) {
            const chatData = chatSnap.data();
            const otherUserID = chatData.participants.find(id => id !== currentUser.uid);

            if (otherUserID) {
                const userRef = doc(db, "users", otherUserID);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    document.getElementById("chatHeaderName").textContent = userData.name || "Unknown User";
                    console.log("Loaded participant name:", userData.name);
                } else {
                    console.error("No user document found for the other participant.");
                }
            } else {
                console.error("Other participant not found in chat.");
            }
        } else {
            console.error("Chat document not found.");
        }
    } catch (error) {
        console.error("Error loading participant name:", error);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        if (chatID) {
            loadChatMessages(chatID); // Load chat messages
            displayParticipantName(chatID); // Display participant's name
        } else {
            console.error("Chat ID not provided in URL.");
        }
    } else {
        console.error("No user is signed in.");
    }
});

// Redirect to Chat Page with Specific Chat ID
window.openChat = function(chatID, sellerID) {
    window.location.href = `chat.html?chatID=${chatID}&sellerID=${sellerID}`;
};

// Send a Message
async function sendMessage(chatID, messageText) {
    const chatRef = doc(db, "chats", chatID);
    await updateDoc(chatRef, {
        messages: arrayUnion({
            senderID: currentUser.uid,
            text: messageText,
            timestamp: new Date()
        })
    });
}

// Event Listener for Send Button
document.getElementById("sendIcon").addEventListener("click", (event) => {
    event.preventDefault();
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput ? messageInput.value.trim() : '';

    if (messageText && chatID) {
        sendMessage(chatID, messageText);
        messageInput.value = "";
    } else {
        console.warn("No message text or chatID not available");
    }
});

onSnapshot(chatsRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
            loadChatHistory(); // Refresh the chat preview list when a new message is added
        }
    });
});


// Load Chat History if 'view=history' in URL
if (view === "history") {
    loadChatHistory();
}