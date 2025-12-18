const API_URL = "https://samuconfa.it/api/serra/";

const tempEl = document.getElementById("temp");
const humEl = document.getElementById("hum");
const luxEl = document.getElementById("lux");

const ctx = document.getElementById("chart");

let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Temperatura (°C)",
        data: [],
        borderColor: "red",
        tension: 0.3
      },
      {
        label: "Umidità (%)",
        data: [],
        borderColor: "blue",
        tension: 0.3
      }
    ]
  }
});

async function aggiorna() {
  const res = await fetch(API_URL);
  const dati = await res.json();

  if (dati.length === 0) return;

  const last = dati[dati.length - 1];

  tempEl.textContent = last.temperatura + " °C";
  humEl.textContent = last.umidita + " %";
  luxEl.textContent = last.luce;

  chart.data.labels = dati.map(d =>
    new Date(d.timestamp).toLocaleTimeString()
  );

  chart.data.datasets[0].data = dati.map(d => d.temperatura);
  chart.data.datasets[1].data = dati.map(d => d.umidita);

  chart.update();
}

setInterval(aggiorna, 5000);
aggiorna();
