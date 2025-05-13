// admin.js

class AdminController {
    constructor() {
        // Connect to WebSocket server
        this.socket = new WebSocket('wss://your-websocket-server.com');
        this.setupWebSocket();
        this.effects = {
            frozen: false,
            glitching: false,
            rickroll: false,
            matrix: false,
            shake: false
        };
        this.initialize();
    }

    setupWebSocket() {
        this.socket.onopen = () => {
            console.log('Connected to admin control server');
        };

        this.socket.onmessage = (event) => {
            const command = JSON.parse(event.data);
            this.handleCommand(command);
        };
    }

    initialize() {
        // Add admin panel to DOM
        const adminPanel = `
            <div id="admin-panel" class="admin-panel">
                <div class="admin-controls">
                    <h3>admin control panel</h3>
                    <div class="control-buttons">
                        <button onclick="adminController.toggleFreeze()">freeze users</button>
                        <button onclick="adminController.toggleRickroll()">rickroll</button>
                        <button onclick="adminController.toggleGlitch()">glitch effect</button>
                        <button onclick="adminController.toggleShake()">screen shake</button>
                        <button onclick="adminController.toggleMatrix()">matrix effect</button>
                        <button onclick="adminController.nukeScreen()">screen nuke</button>
                    </div>
                    <div class="admin-status">
                        <span>connected users: <span id="user-count">0</span></span>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', adminPanel);
    }

    broadcastCommand(command) {
        this.socket.send(JSON.stringify(command));
    }

    handleCommand(command) {
        switch(command.type) {
            case 'freeze':
                this.executeFreeze(command.state);
                break;
            case 'rickroll':
                this.executeRickroll(command.state);
                break;
            case 'glitch':
                this.executeGlitch(command.state);
                break;
            case 'shake':
                this.executeShake(command.state);
                break;
            case 'matrix':
                this.executeMatrix(command.state);
                break;
            case 'nuke':
                this.executeNuke();
                break;
        }
    }

    // Effect Toggle Functions
    toggleFreeze() {
        this.effects.frozen = !this.effects.frozen;
        this.broadcastCommand({
            type: 'freeze',
            state: this.effects.frozen
        });
    }

    toggleRickroll() {
        this.effects.rickroll = !this.effects.rickroll;
        this.broadcastCommand({
            type: 'rickroll',
            state: this.effects.rickroll
        });
    }

    toggleGlitch() {
        this.effects.glitching = !this.effects.glitching;
        this.broadcastCommand({
            type: 'glitch',
            state: this.effects.glitching
        });
    }

    toggleShake() {
        this.effects.shake = !this.effects.shake;
        this.broadcastCommand({
            type: 'shake',
            state: this.effects.shake
        });
    }

    toggleMatrix() {
        this.effects.matrix = !this.effects.matrix;
        this.broadcastCommand({
            type: 'matrix',
            state: this.effects.matrix
        });
    }

    nukeScreen() {
        this.broadcastCommand({
            type: 'nuke'
        });
    }

    // Effect Execution Functions
    executeFreeze(state) {
        document.body.classList.toggle('frozen', state);
        if (state) {
            document.body.style.pointerEvents = 'none';
        } else {
            document.body.style.pointerEvents = 'auto';
        }
    }

    executeRickroll(state) {
        if (state) {
            const rickroll = document.createElement('iframe');
            rickroll.id = 'rickroll';
            rickroll.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;';
            rickroll.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
            document.body.appendChild(rickroll);
        } else {
            const rickroll = document.getElementById('rickroll');
            if (rickroll) rickroll.remove();
        }
    }

    executeGlitch(state) {
        if (state) {
            document.body.classList.add('glitch-effect');
        } else {
            document.body.classList.remove('glitch-effect');
        }
    }

    executeShake(state) {
        if (state) {
            document.body.classList.add('shake-effect');
        } else {
            document.body.classList.remove('shake-effect');
        }
    }

    executeMatrix(state) {
        if (state) {
            this.startMatrixEffect();
        } else {
            this.stopMatrixEffect();
        }
    }

    executeNuke() {
        const nuke = document.createElement('div');
        nuke.className = 'screen-nuke';
        document.body.appendChild(nuke);
        setTimeout(() => nuke.remove(), 2000);
    }

    startMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9998;pointer-events:none;';
        document.body.appendChild(canvas);
        this.matrixEffect = new MatrixEffect(canvas);
    }

    stopMatrixEffect() {
        const canvas = document.getElementById('matrix-canvas');
        if (canvas) {
            canvas.remove();
            this.matrixEffect = null;
        }
    }
}

// Matrix Effect Class
class MatrixEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.chars = '01';
        this.fontSize = 10;
        this.columns = this.canvas.width / this.fontSize;
        this.drops = new Array(Math.floor(this.columns)).fill(1);
        this.animate();
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        requestAnimationFrame(() => this.animate());
    }
}

// Add required CSS
const styles = `
    .admin-panel {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        padding: 20px;
        border-radius: 10px;
        z-index: 99999;
        color: white;
        font-family: 'Inter', sans-serif;
    }

    .control-buttons {
        display: grid;
        gap: 10px;
        margin-top: 15px;
    }

    .control-buttons button {
        background: #2a2a2a;
        border: none;
        padding: 10px;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        text-transform: lowercase;
        transition: background 0.3s;
    }

    .control-buttons button:hover {
        background: #3a3a3a;
    }

    .glitch-effect {
        animation: glitch 0.3s infinite;
    }

    .shake-effect {
        animation: shake 0.5s infinite;
    }

    .screen-nuke {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 99999;
        animation: nuke 2s forwards;
    }

    @keyframes glitch {
        0% { transform: translate(0) }
        20% { transform: translate(-5px, 5px) }
        40% { transform: translate(5px, -5px) }
        60% { transform: translate(-5px, -5px) }
        80% { transform: translate(5px, 5px) }
        100% { transform: translate(0) }
    }

    @keyframes shake {
        0%, 100% { transform: translate(0, 0) }
        25% { transform: translate(5px, 5px) }
        50% { transform: translate(-5px, -5px) }
        75% { transform: translate(-5px, 5px) }
    }

    @keyframes nuke {
        0% { opacity: 0 }
        10% { opacity: 1 }
        100% { opacity: 0 }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Initialize admin controller
const adminController = new AdminController();
