"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const MAX_EPOCH = 50;
    const NOISE_SCALE = 1;
    const NUMBER_OF_POINTS = 10;
    const a_r = 0.7;
    const b_r = 0;
    const x = [];
    const y_r = [];
    for (let i = 0; i < NUMBER_OF_POINTS; ++i) {
        x.push(i);
        y_r.push(a_r * x[i] + b_r + Math.random() * NOISE_SCALE);
    }
    const y_m_full = [];
    let a = 0.0;
    let b = 0.0;
    const eta = 0.01;
    // Executing the gradient descent algorithm
    for (let epoch = 0; epoch < MAX_EPOCH; ++epoch) {
        for (let i = 0; i < x.length; ++i) {
            const y_m = a * x[i] + b;
            y_m_full.push(y_m);
            const e = y_r[i] - y_m;
            a += eta * e * x[i];
            b += eta * e * 1;
        }
    }
    // Generating chart using Chart.js
    const ctx = document.getElementById('grafico');
    if (ctx) {
        new Chart(ctx, {
            type: 'line', // Change type to line
            data: {
                datasets: [{
                        label: 'Dados Reais',
                        data: x.map((value, index) => ({ x: value, y: y_r[index] })),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        pointRadius: 5,
                        pointHoverRadius: 8
                    }, {
                        label: 'Linha Ajustada',
                        data: x.map((value, index) => ({ x: value, y: y_m_full.slice(-NUMBER_OF_POINTS)[index] })),
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Ajuste de Linha por Gradiente Descendente'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Tempo(dia)'
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Crescimento(cm)'
                        }
                    }
                }
            }
        });
    }
});
