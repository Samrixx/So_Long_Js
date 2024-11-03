// Variables globales
const gameBoard = document.getElementById("game-board");
const gridSize = 10;  // Taille de la grille 10x10
let playerPosition = { x: 0, y: 0 };
let collected = 0;

// Grille prédéfinie : 0 = vide, 1 = mur, 2 = objet, 3 = sortie, 4 = joueur
const gridLayout = [
    [4, 0, 0, 0, 1, 1, 1, 0, 2, 0],
    [1, 1, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 2, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [0, 1, 2, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 0, 0]
];

// Initialiser la grille en fonction de la disposition prédéfinie
function createBoard() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;

            // Appliquer la classe en fonction de la grille prédéfinie
            switch (gridLayout[y][x]) {
                case 1:
                    cell.classList.add("wall");
                    break;
                case 2:
                    cell.classList.add("collectible");
                    break;
                case 3:
                    cell.classList.add("exit");
                    break;
                case 4:
                    cell.classList.add("player");
                    playerPosition = { x, y };  // Mettre à jour la position initiale du joueur
                    break;
            }
            gameBoard.appendChild(cell);
        }
    }
}

// Fonction pour mettre à jour uniquement la position du joueur
function updatePlayerPosition() {
    // Retire la classe "player" de l'ancienne position
    document.querySelector(".player").classList.remove("player");

    // Ajoute la classe "player" à la nouvelle position
    const newPlayerCell = document.querySelector(`[data-x="${playerPosition.x}"][data-y="${playerPosition.y}"]`);
    newPlayerCell.classList.add("player");
}

// Déplacement du joueur
function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    // Vérifier les limites du plateau et éviter les murs
    if (
        newX >= 0 && newX < gridSize &&
        newY >= 0 && newY < gridSize &&
        gridLayout[newY][newX] !== 1  // S'assurer que la nouvelle cellule n'est pas un mur
    ) {
        // Mettre à jour la position du joueur
        playerPosition.x = newX;
        playerPosition.y = newY;

        // Vérifier si le joueur collecte un objet
        if (gridLayout[newY][newX] === 2) {
            collected++;
            gridLayout[newY][newX] = 0;  // Retirer l'objet de la grille
            const collectibleCell = document.querySelector(`[data-x="${newX}"][data-y="${newY}"]`);
            collectibleCell.classList.remove("collectible");
        }

        // Vérifier si le joueur atteint la sortie
        if (gridLayout[newY][newX] === 3 && collected === 3) {
            alert("Félicitations, tu as gagné !");
        }
        
        // Mettre à jour uniquement la position du joueur
        updatePlayerPosition();
    }
}

// Gestion des touches pour déplacer le joueur
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            movePlayer(0, -1);
            break;
        case "ArrowDown":
            movePlayer(0, 1);
            break;
        case "ArrowLeft":
            movePlayer(-1, 0);
            break;
        case "ArrowRight":
            movePlayer(1, 0);
            break;
    }
});

// Créer le plateau initial
createBoard();
