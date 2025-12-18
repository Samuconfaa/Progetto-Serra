const API_URL = "https://samuconfa.it/api/serra/";
const tempEl = document.getElementById("temp");
const humEl  = document.getElementById("hum");
const luxEl  = document.getElementById("lux");

const chkTemp  = document.getElementById("chkTemp");
const chkHum   = document.getElementById("chkHum");
const chkLux   = document.getElementById("chkLux");
const resetBtn = document.getElementById("resetBtn");

const ctx = document.getElementById("chart");

let labels   = [];
let tempData = [];
let humData  = [];
let luxData  = [];

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: tempData,
        borderColor: "#ff4d4d",
        backgroundColor: "transparent",
        yAxisID: "yTemp",
        tension: 0.3
      },
      {
        label: "Umidità (%)",
        data: humData,
        borderColor: "#4d79ff",
        backgroundColor: "transparent",
        yAxisID: "yTemp",
        tension: 0.3
      },
      {
        label: "Luminosità",
        data: luxData,
        borderColor: "#ffb84d",
        backgroundColor: "transparent",
        yAxisID: "yLux",
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    plugins: {
      legend: {
        labels: {
          color: "#000"
        }
      }
    },
    scales: {
      yTemp: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Temperatura / Umidità"
        }
      },
      yLux: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Luminosità"
        },
        grid: {
          drawOnChartArea: false
        }
      },
      x: {
        title: {
          display: true,
          text: "Orario"
        }
      }
    }
  }
});


async function aggiorna() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return;

    const dati = await res.json();
    if (!Array.isArray(dati) || dati.length === 0) return;

    const last = dati[dati.length - 1];

    tempEl.textContent = `${last.temperatura} °C`;
    humEl.textContent  = `${last.umidita} %`;
    luxEl.textContent  = last.luce;

    const timeLabel = new Date(last.timestamp).toLocaleTimeString();

    labels.push(timeLabel);
    tempData.push(last.temperatura);
    humData.push(last.umidita);
    luxData.push(last.luce);

    chart.update();

  } catch (err) {
    console.error("Errore aggiornamento dati:", err);
  }
}


chkTemp.addEventListener("change", () => {
  chart.data.datasets[0].hidden = !chkTemp.checked;
  chart.update();
});

chkHum.addEventListener("change", () => {
  chart.data.datasets[1].hidden = !chkHum.checked;
  chart.update();
});

chkLux.addEventListener("change", () => {
  chart.data.datasets[2].hidden = !chkLux.checked;
  chart.update();
});

resetBtn.addEventListener("click", () => {
  labels.length = 0;
  tempData.length = 0;
  humData.length = 0;
  luxData.length = 0;
  chart.update();
});


setInterval(aggiorna, 5000);
aggiorna();
