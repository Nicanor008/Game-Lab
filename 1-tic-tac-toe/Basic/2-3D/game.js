const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const boardSize = 3;
const spacing = 2;
let currentPlayer = 'X';
const boardState = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

function createBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const geometry = new THREE.BoxGeometry(1, 0.1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(i * spacing - spacing, 0, j * spacing - spacing);
            cube.userData = { x: i, z: j }; // Store position for later use
            scene.add(cube);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onBoardClick(event) {
    const mouse = new THREE.Vector2();
    const rect = renderer.domElement.getBoundingClientRect();
    
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    
    if (intersects.length > 0) {
        const cube = intersects[0].object;
        const { x, z } = cube.userData;

        if (!boardState[z][x]) {
            boardState[z][x] = currentPlayer;
            cube.material.color.set(currentPlayer === 'X' ? 0xff0000 : 0x0000ff);
            if (checkWin(currentPlayer)) {
                alert(`${currentPlayer} wins!`);
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }
}

function checkWin(player) {
    // Check rows and columns
    for (let i = 0; i < boardSize; i++) {
        if ((boardState[i].every(cell => cell === player)) || 
            (boardState.map(row => row[i]).every(cell => cell === player))) {
            return true;
        }
    }

    // Check diagonals
    if ((boardState[0][0] === player && boardState[1][1] === player && boardState[2][2] === player) ||
        (boardState[0][2] === player && boardState[1][1] === player && boardState[2][0] === player)) {
        return true;
    }

    return false;
}

function resetGame() {
    boardState.forEach(row => row.fill(null));
    scene.children.forEach(cube => {
        if (cube instanceof THREE.Mesh) {
            cube.material.color.set(0x00ff00); // Reset color
        }
    });
}

createBoard();
camera.position.z = 5;

window.addEventListener('click', onBoardClick);
animate();
