# Serra Smart – Sistema per Monitoraggio Ambientale

**Serra Smart** è un sistema progettato per il monitoraggio ambientale di una serra. Il sistema acquisisce dati da sensori fisici, li trasmette attraverso una rete sicura e li visualizza in tempo reale tramite un'interfaccia web.

Il progetto integra componenti hardware e software seguendo un’architettura **client-server**, utilizzando Arduino, RasberryPI e una VPS Ubuntu .

---

## Architettura del Sistema

Il sistema è strutturato su quattro livelli principali:

### 1. Livello di Acquisizione (Arduino)
* **Lettura sensori:**
    * Fotoresistenza (Luce)
    * Sensore DHT (Temperatura e Umidità)
* **Comunicazione:** Invio dei dati grezzi tramite comunicazione seriale USB a Rasberry.

### 2. Livello di Gateway (Raspberry Pi)
* **Script Python:** Legge i dati dalla seriale, effettua la validazione e la conversione dei valori.
* **Trasmissione:** Invia i dati al backend tramite richieste HTTP POST.
* **Ruolo:** Funge da ponte tra arduino e la rete internet.

### 3. Livello Backend (VPS – ASP.NET Core)
* **API REST:** Sviluppata in ASP.NET Core.
* **Endpoint:**
    * `POST`: Ricezione dati dai sensori.
    * `GET`: Erogazione dati al frontend.
* **Sicurezza:**
    * Autenticazione tramite **Token** per le richieste in scrittura.
    * Connessione protetta via **HTTPS**.
    * Deploy su VPS Linux con **Nginx** come reverse proxy.

### 4. Livello Frontend (Sito Web)
* **Interfaccia:** Web responsive progettata per una visualizzazione chiara su ogni dispositivo.
* **Visualizzazione:** Dashboard con valori in tempo reale e grafico storico dell’andamento dei dati.
* **Tecnologie:** HTML, CSS, JavaScript.

---

## Tecnologie Utilizzate

| Hardware | Software | Infrastruttura |
| :--- | :--- | :--- |
| Arduino | Python 3 | Linux (Ubuntu Server) |
| Raspberry Pi | ASP.NET Core | Nginx (Reverse Proxy) |
| Sensore DHT (Temp/Hum) | Chart.js | Cloudflare (HTTPS/Proxy) |
| Fotoresistenza (LDR) | HTML5 / CSS3 / JS | - |

---

## Flusso di Funzionamento

1. **Arduino** legge i valori dai sensori ogni 5 secondi.
2. I dati vengono inviati via **seriale** al Raspberry Pi.
3. Il **Raspberry Pi** invia i dati all'API tramite HTTPS e Token.
4. L'**API** valida e memorizza temporaneamente i dati ricevuti.
5. Il **Sito Web** interroga periodicamente l’API con richieste GET.
6. I dati vengono visualizzati in tempo reale e tramite grafici dinamici.

---

## Endpoint API

### `POST /api/serra/`
Utilizzato dal Raspberry Pi per inviare i dati.
* **Auth:** Richiede Header `Authorization` con token.
* **Payload:** JSON contenente luce, temperatura e umidità.

### `GET /api/serra/`
Utilizzato dal sito web per recuperare lo storico dei dati e quelli attuali.
* **Auth:** Non richiede autenticazione (sola lettura).

---

## Sicurezza
* **HTTPS:** Comunicazione cifrata tra gateway, server e client.
* **Token Auth:** Impedisce l'invio di dati da fonti non autorizzate.
* **Reverse Proxy:** Utilizzo di Nginx per isolare il backend e non esporlo direttamente a Internet.

---

**Autore:** *Progetto realizzato da Samuele Confalonieri come sistema completo per il monitoraggio ambientale, integrando hardware, backend, networking e frontend web.*