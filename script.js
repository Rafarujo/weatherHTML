// Seletores dos elementos
const cityInput = document.getElementById('city');
const backgroundColorInput = document.getElementById('background-color');
const borderToggle = document.getElementById('border-toggle');
const textColorInput = document.getElementById('text-color');
const applyButton = document.getElementById('apply');
const widgetPreview = document.getElementById('widget-preview');
const codeOutput = document.getElementById('code-output');
const copyButton = document.getElementById('copy');

// Função para obter os dados climáticos
async function getWeatherData(city) {
    try {
        // Definir a cidade para obter os dados climáticos
        const apiKey = '64ed82577ced7f69cb1687f0ce536131';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

        // Realize a solicitação à API
        const response = await fetch(url);
        const data = await response.json();

        // Atualize o HTML com os dados climáticos
        const cityName = document.getElementById('city-name');
        const weatherIcon = document.getElementById('weather-icon');
        const temperature = document.getElementById('temperature');
        const weatherDescription = document.getElementById('weather-description');

        // Verifique se os dados climáticos foram retornados corretamente
        if (response.ok) {
            // Atualize o elemento com o nome da cidade e o ícone de localização
            cityName.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.name}`;

            // Obtenha o código do ícone e URL da OpenWeatherMap
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Exiba o ícone correspondente
            weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Ícone de clima" style="width: 50px; height: 50px;">`;

            // Exiba a temperatura
            temperature.textContent = `${data.main.temp.toFixed(1)}°C`;

            // Exiba a descrição do clima
            weatherDescription.textContent = data.weather[0].description;

        } else {
            console.error('Erro ao obter os dados climáticos:', data.message);
        }
    } catch (error) {
        console.error('Erro ao obter os dados climáticos:', error);
    }
}

// Função para criar o código HTML com base nas configurações do usuário
function createWidgetCode(city, backgroundColor, border, textColor) {
    const borderStyle = border ? '1px solid #ccc' : 'none';
    
    // Código HTML a ser pré-visualizado e atualizado
    const widgetCode = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Widget de Clima</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* Estilo para o widget de clima */
        #weather-widget {
            background-color: ${backgroundColor};
            color: ${textColor};
            border: ${borderStyle};
            padding: 10px;
            border-radius: 5px;
            max-width: 300px;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        /* Estilo para a seção à esquerda */
        .left-section {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        /* Estilo para o ícone de localização e nome da cidade */
        #city-name {
            font-weight: bold;
        }

        #city-name i {
            margin-right: 5px;
        }

        /* Estilo para a temperatura */
        #temperature {
            font-size: 2.2em;
        }

        /* Estilo para a seção à direita */
        .right-section {
            text-align: right;
        }

        /* Estilo para o ícone do tempo */
        #weather-icon {
            font-size: 1.5em;
            margin-bottom: 10px;
        }

        /* Estilo para a descrição do clima */
        #weather-description {
            font-size: 0.9em;
            margin-top: 5px;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <!-- Estrutura do widget de clima -->
    <div id="weather-widget">
        <!-- Seção à esquerda -->
        <div class="left-section">
            <div id="city-name"><i class="fas fa-map-marker-alt"></i>${city}</div>
            <div id="temperature">--°C</div>
        </div>

        <!-- Seção à direita -->
        <div class="right-section">
            <div id="weather-icon"></div>
            <div id="weather-description">--</div>
        </div>
    </div>

    <script>
        // Chave de API da OpenWeatherMap
        const apiKey = '64ed82577ced7f69cb1687f0ce536131';

        // Função para obter os dados climáticos
        async function getWeatherData() {
            try {
                // Defina a cidade para obter os dados climáticos
                const city = '${city}';

                // URL da API de clima com base na cidade e na chave de API
                const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}&units=metric&lang=pt_br\`;

                // Realize a solicitação à API
                const response = await fetch(url);
                const data = await response.json();

                // Atualize o HTML com os dados climáticos
                const cityName = document.getElementById('city-name');
                const weatherIcon = document.getElementById('weather-icon');
                const temperature = document.getElementById('temperature');
                const weatherDescription = document.getElementById('weather-description');

                // Atualize o elemento com o nome da cidade e o ícone de localização
                cityName.innerHTML = \`<i class="fas fa-map-marker-alt"></i> \${data.name}\`;

                // Obtenha o código do ícone e URL da OpenWeatherMap
                const iconCode = data.weather[0].icon;
                const iconUrl = \`http://openweathermap.org/img/wn/\${iconCode}@2x.png\`;

                // Exiba o ícone correspondente
                weatherIcon.innerHTML = \`<img src="\${iconUrl}" alt="Ícone de clima" style="width: 50px; height: 50px;">\`;

                // Exiba a temperatura
                temperature.textContent = \`\${data.main.temp.toFixed(1)}°C\`;

                // Exiba a descrição do clima
                weatherDescription.textContent = data.weather[0].description;

            } catch (error) {
                console.error('Erro ao obter os dados climáticos:', error);
            }
        }

        // Chame a função para obter os dados climáticos ao carregar a página
        getWeatherData();
    </script>
</body>

</html>
`;

    return widgetCode;
}

// Função para criar e exibir o widget de clima
function createAndDisplayWeatherWidget() {
    const city = cityInput.value || 'Brasília';
    const backgroundColor = backgroundColorInput.value;
    const border = borderToggle.checked;
    const textColor = textColorInput.value;

    // Crie o código do widget de clima
    const widgetCode = createWidgetCode(city, backgroundColor, border, textColor);
    
    // Exiba o widget na pré-visualização
    widgetPreview.innerHTML = widgetCode;

    // Após inserir o widget na pré-visualização, chame a função getWeatherData()
    getWeatherData(city);

    // Exiba o código HTML no textarea
    codeOutput.value = widgetCode;
}

// Adicione o evento de clique ao botão "Aplicar"
applyButton.addEventListener('click', createAndDisplayWeatherWidget);

// Adicione o evento de clique ao botão "Copiar"
copyButton.addEventListener('click', () => {
    codeOutput.select();
    document.execCommand('copy');
});
