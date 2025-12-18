# README SERRA

# Serra Smart – Sistema per monitoraggio ambientale

## Descrizione del progetto

**Serra Smart** è un sistema per il monitoraggio ambientale di una serra, progettato per acquisire dati da sensori fisici, trasmetterli tramite rete e visualizzarli in tempo reale attraverso una dashboard web.

Il progetto integra componenti hardware e software seguendo un’architettura ****client-server****, utilizzando Arduino, RasberryPI e una VPS Ubuntu .

---

## Architettura del sistema

Il sistema è suddiviso in quattro livelli principali:

### 1. Livello di acquisizione (Arduino)

- Lettura dei sensori:
    - Fotoresistenza (luminosità)
    - Sensore DHT (temperatura e umidità)
- Elaborazione dei valori analogici e digitali
- Invio dei dati tramite comunicazione seriale USB

### 2. Livello di gateway (Raspberry Pi)

- Script Python che:
    - legge i dati dalla porta seriale
    - valida e converte i valori
    - invia i dati all’API tramite richieste HTTP POST
- Funzione di gateway tra hardware e rete
- Separazione delle credenziali tramite file di configurazione escluso dal controllo di versione

### 3. Livello backend (VPS – ASP.NET Core)

- API REST sviluppata in ASP.NET Core
- Funzionalità principali:
    - ricezione dei dati tramite POST
    - memorizzazione temporanea in memoria
    - esposizione dei dati tramite GET
- Sicurezza:
    - autenticazione tramite token per le richieste POST
    - connessione HTTPS
- Deploy su VPS Linux con reverse proxy Nginx

### 4. Livello frontend (Dashboard web)

- Sito web responsive accessibile da browser
- Visualizzazione:
    - valori ambientali in tempo reale
    - andamento storico tramite grafico dinamico
- Funzionalità avanzate:
    - grafico multi-asse (luminosità su asse separato)
    - attivazione/disattivazione delle grandezze
    - reset del grafico lato frontend
- Tecnologie utilizzate:
    - HTML
    - CSS
    - JavaScript

---

## Tecnologie utilizzate

### Hardware

- Arduino
- Raspberry Pi
- Sensore DHT (temperatura e umidità)
- Fotoresistenza (LDR)

### Software

- Python 3
- ASP.NET Core
- Nginx (reverse proxy)
- Chart.js
- HTML / CSS / JavaScript
- Linux (Ubuntu Server)
- Cloudflare (HTTPS e proxy)

---

## Funzionamento del sistema

1. Arduino legge i valori dei sensori a intervalli regolari
2. I dati vengono inviati via seriale al Raspberry Pi
3. Il Raspberry Pi invia i dati all’API tramite HTTPS e token di autenticazione
4. L’API valida e memorizza temporaneamente i dati
5. Il sito web interroga periodicamente l’API tramite richieste GET
6. I dati vengono visualizzati in tempo reale e tramite grafici interattivi

---

## API REST

### POST /api/serra/

- Utilizzato dal Raspberry Pi
- Riceve i dati dei sensori in formato JSON
- Protetto tramite token di autenticazione

### GET /api/serra/

- Utilizzato dal sito web
- Restituisce lo storico dei dati
- Non richiede autenticazione

---

## Sicurezza

- Comunicazione cifrata tramite HTTPS
- Autenticazione a token per impedire invii non autorizzati
- Separazione delle credenziali dal codice sorgente
- Backend non esposto direttamente a Internet grazie a reverse proxy

---

## Interfaccia web

La dashboard web consente:

- visualizzazione immediata dei valori correnti
- analisi dell’andamento nel tempo tramite grafico
- selezione delle grandezze da visualizzare
- azzeramento del grafico senza interrompere la raccolta dati

Il grafico utilizza assi separati per gestire correttamente grandezze con scale diverse, migliorando la leggibilità.

---

## Autore

*Progetto realizzato da Confalonieri Samuele per il monitoraggio ambientale di una serra.*