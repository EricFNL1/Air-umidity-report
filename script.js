const rainCanvas = document.getElementById('rainCanvas');
const rainCtx = rainCanvas.getContext('2d');
const humidityRange = document.getElementById('humidityRange');
const humidityValue = document.getElementById('humidityValue');

// Configurações do canvas
rainCanvas.width = 400;
rainCanvas.height = 200;

// Array para armazenar as gotas
let drops = [];
let humidityPercentage = 50; // Porcentagem inicial de umidade

// Função para criar uma gota
function createDrop() {
    return {
        x: Math.random() * rainCanvas.width, // posição horizontal aleatória
        y: Math.random() * -rainCanvas.height, // começa fora da tela
        length: Math.random() * 10 + 5, // comprimento da gota
        speedY: Math.random() * 2 + 2, // velocidade de queda
        opacity: Math.random() * 0.3 + 0.2 // opacidade para efeito translúcido
    };
}

// Função para desenhar gotas na tela
function drawDrop(drop) {
    rainCtx.beginPath();
    rainCtx.moveTo(drop.x, drop.y);
    rainCtx.lineTo(drop.x, drop.y + drop.length);
    rainCtx.strokeStyle = `rgba(54, 162, 235, ${drop.opacity})`;
    rainCtx.lineWidth = 4;
    rainCtx.stroke();
}

// Função para atualizar a posição das gotas
function updateDrops() {
    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    
    drops.forEach(drop => {
        drop.y += drop.speedY;

        // Se a gota sair da tela, a reposiciona no topo
        if (drop.y > rainCanvas.height) {
            drop.y = Math.random() * -20;
            drop.x = Math.random() * rainCanvas.width;
        }

        drawDrop(drop);
    });

    requestAnimationFrame(updateDrops);
}

// Função para ajustar a quantidade de gotas de acordo com a porcentagem de umidade
function adjustDrops() {
    drops = [];
    const numberOfDrops = Math.floor(humidityPercentage * 3); // Ajusta a quantidade de gotas conforme a umidade
    for (let i = 0; i < numberOfDrops; i++) {
        drops.push(createDrop());
    }
}

// Evento para ajustar a porcentagem de umidade
humidityRange.addEventListener('input', (e) => {
    humidityPercentage = e.target.value;
    humidityValue.textContent = humidityPercentage;
    adjustDrops();
});

// Inicializa as gotas e inicia a animação
adjustDrops();
updateDrops();
