"use strict";
window.onload = function () {
    // Configurações iniciais
    let MAX_EPOCH = 50;
    let NOISE_SCALE = 0.1; // Escala de ruído
    let NUMBER_OF_POINTS = 30;
    let a_r = 1; // Parâmetro 'a' da função senoide original
    let b_r = 1; // Parâmetro 'b' da função senoide original
    let eta = 0.1; // Taxa de aprendizado
    // Gerar dados baseados na função senoide original com ruído
    let x = [];
    let y_r = [];
    for (let i = 0; i < NUMBER_OF_POINTS; ++i) {
        x.push(i * 0.1); // Espalhar os pontos ao longo de um intervalo maior
        y_r.push(a_r * Math.sin(b_r * x[i]) + Math.random() * NOISE_SCALE); // Adicionar ruído à função senoide
    }
    // Inicializar parâmetros da senoide
    let a = 1.0; // Amplitude inicial
    let b = 1.0; // Frequência inicial
    let a_k = [a];
    let b_k = [b];
    // Arrays para armazenar os valores previstos e os erros
    let y_m_full = [];
    let e_full = [];
    // Ajuste pelo algoritmo dos mínimos quadrados
    for (let epoch = 0; epoch < MAX_EPOCH; ++epoch) {
        for (let i = 0; i < x.length; ++i) {
            let y_m = a * Math.sin(b * x[i]); // Valor previsto pela senoide
            y_m_full.push(y_m);
            let e = y_r[i] - y_m; // Erro entre o valor real e o previsto
            e_full.push(e);
            a += eta * e * Math.sin(b * x[i]); // Atualização do parâmetro 'a' (amplitude)
            b += eta * e * a * b * Math.cos(b * x[i]); // Atualização do parâmetro 'b' (frequência)
            a_k.push(a);
            b_k.push(b);
        }
    }
    // Calcular a diferença entre os dados reais com ruído e a senoide ajustada
    let difference = y_r.map((yr, index) => yr - y_m_full[index]);
    // Mostrar resultados finais no console
    console.log("a_r (amplitude):", a_r);
    console.log("a_k (amplitude) (final):", a_k[a_k.length - 1]);
    console.log("b_r (frequência):", b_r);
    console.log("b_k (frequência) (final):", b_k[b_k.length - 1]);
    console.log("y_r:", y_r);
    console.log("y_m:", y_m_full.slice(y_m_full.length - y_r.length, y_m_full.length));
    console.log("e_full:", e_full);
    // Plotar os dados usando Plotly
    const trace1 = {
        x: x,
        y: y_r,
        mode: 'markers',
        name: 'Dados Reais com Ruído'
    };
    const trace2 = {
        x: x,
        y: y_m_full.slice(y_m_full.length - y_r.length, y_m_full.length),
        mode: 'lines',
        name: 'Senoide Ajustada'
    };
    const data1 = [trace1, trace2];
    const layout1 = {
        title: 'Ajuste de Senoide aos Dados com Ruído',
        xaxis: { title: 'x' },
        yaxis: { title: 'y' }
    };
    Plotly.newPlot('myDiv1', data1, layout1);
    // Plotar a diferença entre os dados reais com ruído e a senoide ajustada
    const trace3 = {
        x: x,
        y: difference,
        mode: 'lines',
        name: 'Diferença (Real - Senoide Ajustada)'
    };
    const data2 = [trace3];
    const layout2 = {
        title: 'Diferença entre Dados Reais e Senoide Ajustada',
        xaxis: { title: 'x' },
        yaxis: { title: 'Diferença' }
    };
    Plotly.newPlot('myDiv2', data2, layout2);
};
