const int ledPin = 13;    // Broche de la LED
const float ledVoltage = 2.0;  // Chute de tension approximative de la LED (en volts)
const float resistorValue = 330.0;  // Valeur de la résistance (en ohms)
unsigned long previousTime = 0;  // Temps précédent
unsigned long elapsedTime = 0;  // Temps écoulé

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  digitalWrite(ledPin, HIGH);  // Allume la LED
  previousTime = millis();  // Démarre le chronomètre
}

void loop() {
  unsigned long currentTime = millis();
  elapsedTime = currentTime - previousTime;

  // Calcule le courant
  float current = (5.0 - ledVoltage) / resistorValue;  // En ampères

  // Calcule la puissance
  float power = ledVoltage * current;  // En watts

  // Calcule l'énergie consommée
  float energy = power * (elapsedTime / 2000.0);  // En joules

  // Envoie les résultats par le port série
 
  Serial.print(elapsedTime / 1000.0);
  Serial.print(" secondes,");
  Serial.print(energy);
  Serial.println(" joules");

  delay(2000);  // Attendre une seconde avant la prochaine mesure
}
