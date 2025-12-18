#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11      
#define LDR_PIN A0

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  int luce = analogRead(LDR_PIN);
  float temperatura = dht.readTemperature();
  float umidita = dht.readHumidity();

  if (isnan(temperatura) || isnan(umidita)) {
    return;
  }

  Serial.print(luce);
  Serial.print(";");
  Serial.print(temperatura);
  Serial.print(";");
  Serial.println(umidita);

  delay(5000);
}
