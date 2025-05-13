// admin.js
class AdminController {
    constructor() {
        this.socket = new WebSocket('wss://your-websocket-server.com');
        this.isAdmin = false;
        this.isPanelOpen = false;
        this.connectedUsers = 0;
        this.setupWebSocket();
        this.createFloatingButton();
    }

    createFloatingButton() {
        const button = document.createElement('div');
        button.className = 'admin-float-button';
        button.innerHTML = '<i class="fas fa-shield-alt"></i>';
        document.body.appendChild(button);

        button.addEventListener('click', () => this.toggleAdminPanel());
    }

    setupWebSocket() {
        this.socket.onopen = () => {
            console.log('Connected to admin control server');
            // Send initial connection message
            this.socket.send(JSON.stringify({
                type: 'connect',
                isAdmin: this.isAdmin
            }));
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'userCount') {
                this.updateUserCount(data.count);
            } else {
                this.handleCommand(data);
            }
        };
    }

    toggleAdminPanel() {
        if (!this.isAdmin) return;
        
        if (!this.isPanelOpen) {
            this.showAdminPanel();
        } else {
            this.hideAdminPanel();
        }
        this.isPanelOpen = !this.isPanelOpen;
    }

    showAdminPanel() {
        const panel = document.createElement('div');
        panel.id = 'admin-panel';
        panel.className = 'admin-panel panel-hidden';
        
        panel.innerHTML = `
            <div class="admin-header">
                <h2>admin control panel</h2>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="control-grid">
                <!-- Control buttons here -->
                <button class="control-button" data-effect="freeze">
                    <i class="fas fa-icicles"></i> freeze users
                </button>
                <button class="control-button" data-effect="rickroll">
                    <i class="fas fa-music"></i> rickroll
                </button>
                <!-- Add more buttons -->
            </div>
            <div class="users-counter">
                <i class="fas fa-users"></i>
                <span id="user-count">${this.connectedUsers}</span> users online
            </div>
        `;

        document.body.appendChild(panel);
        
        // Add close button handler
        panel.querySelector('.close-panel').addEventListener('click', () => {
            this.hideAdminPanel();
        });

        // Add effect button handlers
        panel.querySelectorAll('.control-button').forEach(button => {
            button.addEventListener('click', () => {
                const effect = button.dataset.effect;
                this.toggleEffect(effect);
                button.classList.toggle('active');
            });
        });

        // Animate panel in
        requestAnimationFrame(() => {
            panel.classList.remove('panel-hidden');
        });
    }

    hideAdminPanel() {
        const panel = document.getElementById('admin-panel');
        if (panel) {
            panel.classList.add('panel-hidden');
            setTimeout(() => panel.remove(), 300);
        }
        this.isPanelOpen = false;
    }

    updateUserCount(count) {
        this.connectedUsers = count;
        const countElement = document.getElementById('user-count');
        if (countElement) {
            countElement.textContent = count;
        }
    }

    setAdmin(status) {
        this.isAdmin = status;
        const floatButton = document.querySelector('.admin-float-button');
        if (floatButton) {
            floatButton.style.display = status ? 'flex' : 'none';
        }
    }

    // Add this to your CSS
    const styles = `
        .admin-float-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #1a1a1a;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 9998;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
        }

        .admin-float-button i {
            color: #ffffff;
            font-size: 24px;
        }

        .admin-float-button:hover {
            transform: scale(1.1);
            background: #2a2a2a;
        }

        .admin-panel {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 400px;
            background: rgba(26, 26, 26, 0.95);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            z-index: 9999;
            backdrop-filter: blur(10px);
        }

        .panel-hidden {
            opacity: 0;
            transform: translateY(20px);
            pointer-events: none;
        }

        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .close-panel {
            background: none;
            border: none;
            color: #ffffff;
            cursor: pointer;
            padding: 5px;
            transition: transform 0.3s ease;
        }

        .close-panel:hover {
            transform: rotate(90deg);
        }

        .users-counter {
            text-align: center;
            padding: 15px;
            margin-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            font-weight: 800;
        }

        .users-counter i {
            margin-right: 8px;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// WebSocket Server (Node.js)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map();
let adminConnections = new Set();
let regularUsers = new Set();

wss.on('connection', (ws) => {
    ws.id = Date.now();
    clients.set(ws, { isAdmin: false });

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.type === 'connect') {
            clients.get(ws).isAdmin = data.isAdmin;
            if (data.isAdmin) {
                adminConnections.add(ws);
            } else {
                regularUsers.add(ws);
            }
            broadcastUserCount();
        } else if (data.type === 'effect') {
            // Broadcast effect to all regular users
            regularUsers.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        }
    });

    ws.on('close', () => {
        const wasAdmin = clients.get(ws).isAdmin;
        clients.delete(ws);
        if (wasAdmin) {
            adminConnections.delete(ws);
        } else {
            regularUsers.delete(ws);
        }
        broadcastUserCount();
    });

    broadcastUserCount();
});

function broadcastUserCount() {
    const count = regularUsers.size;
    const message = JSON.stringify({
        type: 'userCount',
        count: count
    });
    
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}
