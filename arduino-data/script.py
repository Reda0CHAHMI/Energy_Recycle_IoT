#!/bin/python3
import serial

# Configure le port série
ser = serial.Serial('/dev/ttyACM0', 9600)

# Ouvrir le fichier en mode écriture (ce qui efface les anciennes données)
with open('data', 'a') as file:
    while True:
        if ser.in_waiting > 0:
            # Lire une ligne de données depuis l'Arduino
            line = ser.readline().decode('utf-8').rstrip()
            print(line)
            # Écrire la ligne dans le fichier
            file.write(line + '\n')
            file.flush()  # S'assurer que les données sont écrites immédiatement

