import serial
import requests
import time
import sys

# =========================
# CONFIGURAZIONE
# =========================

SERIAL_PORT = "/dev/ttyUSB0"   
BAUDRATE = 9600

API_URL = "https://samuconfa.it/api/serra/"
API_TOKEN = "AHvxK3A9XKlbFjK73e6fO3mW90N3WS"

SERIAL_TIMEOUT = 2
RETRY_DELAY = 5

# =========================
# APERTURA SERIALE
# =========================

def open_serial():
    while True:
        try:
            ser = serial.Serial(
                SERIAL_PORT,
                BAUDRATE,
                timeout=SERIAL_TIMEOUT
            )
            print(f"[OK] Seriale aperta su {SERIAL_PORT}")
            time.sleep(2)  # tempo reset Arduino
            return ser
        except serial.SerialException as e:
            print(f"[ERRORE] Seriale non disponibile: {e}")
            time.sleep(RETRY_DELAY)

# =========================
# MAIN
# =========================

def main():
    ser = open_serial()

    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }

    while True:
        try:
            line = ser.readline().decode("utf-8").strip()

            if not line:
                continue

            # Formato atteso: luce;temperatura;umidita
            parts = line.split(";")
            if len(parts) != 3:
                print(f"[SCARTATO] Formato non valido: {line}")
                continue

            luce = int(parts[0])
            temperatura = float(parts[1])
            umidita = float(parts[2])

            payload = {
                "luce": luce,
                "temperatura": temperatura,
                "umidita": umidita
            }

            r = requests.post(API_URL, json=payload, headers=headers, timeout=5)

            if r.status_code == 200:
                print(f"[INVIATO] {payload}")
            else:
                print(f"[API ERROR] {r.status_code} - {r.text}")

        except (ValueError, IndexError) as e:
            print(f"[ERRORE DATI] {line} -> {e}")

        except requests.RequestException as e:
            print(f"[ERRORE RETE] {e}")
            time.sleep(RETRY_DELAY)

        except serial.SerialException as e:
            print(f"[ERRORE SERIALE] {e}")
            ser.close()
            time.sleep(RETRY_DELAY)
            ser = open_serial()

        except KeyboardInterrupt:
            print("\n[STOP] Terminato dall'utente")
            ser.close()
            sys.exit(0)

# =========================
# ENTRY POINT
# =========================

if __name__ == "__main__":
    main()
