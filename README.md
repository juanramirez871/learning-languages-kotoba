# Kotoba

![Logo](/kotoba/assets/images/icon.jpeg)

Aplicación móvil para **iOS y Android** enfocada en el aprendizaje de **vocabulario en inglés y japonés**, junto con el estudio de sus sistemas de escritura.

Kotoba está diseñada para que el aprendizaje sea **constante, intuitivo e interactivo**, combinando:

* práctica activa dentro de la app
* exposición pasiva mediante widgets y notificaciones

![Home](/kotoba/assets/images/homeScreen.jpeg)

## Funcionalidades

### Vocabulario interactivo

Kotoba incluye listas de palabras organizadas por idioma (**inglés y japonés**) pensadas para aprendizaje progresivo.

Cada palabra no es solo texto:

* Al presionarla:

  * Se reproduce su pronunciación
  * Se muestra su traducción inmediata

Esto permite:

* Asociar sonido + significado
* Mejorar la memoria auditiva
* Aprender sin fricción ni navegación adicional
(Las mascotas de las pantallas de palabras estan hechas en blender en /models/blender/)

![English Words](/kotoba/assets/images/englishWordScreen.jpeg)
![Japanese Words](/kotoba/assets/images/japaneseWordScreen.jpeg)

### Sistemas de escritura

La app no se limita al vocabulario: también incluye aprendizaje estructurado de los sistemas de escritura.

Secciones disponibles:

* Abecedario en inglés
* Hiragana
* Katakana

Cada carácter:

* Tiene su pronunciación
* Puede reproducirse en audio
* Permite familiarizarse visual y fonéticamente

![Alphabet](/kotoba/assets/images/AlphabetScreen.jpeg)
![Hiragana](/kotoba/assets/images/HiraganaScreen.jpeg)
![Katakana](/kotoba/assets/images/katakanaScreen.jpeg)

### Widgets

Kotoba incluye widgets para la pantalla de inicio del dispositivo.

Funcionamiento:

* Muestran **2 palabras nuevas cada hora**
* Incluyen palabra mas traducción

Objetivo:

* Exposición constante al idioma
* Refuerzo pasivo de memoria
* Aprendizaje sin esfuerzo consciente

![Widgets](/kotoba/assets/images/widgets.jpeg)

## Configuración

La sección de configuración permite personalizar completamente la experiencia de aprendizaje.

Opciones disponibles:

### Control de audio

* Activar o desactivar las pronunciaciones
* Útil si estás en entornos silenciosos o no deseas sonido

### Notificaciones inteligentes

Sistema configurable de notificaciones para reforzar el aprendizaje durante el día.

Puedes definir:

* Rango de horas (ej: 8:00 AM – 10:00 PM)
* Cantidad de notificaciones dentro de ese rango

Cada notificación incluye:

* Una palabra
* Su traducción

Esto permite:

* Aprender sin abrir la app
* Mantener contacto constante con el idioma
* Adaptar la frecuencia a tu rutina diaria

![Settings](/kotoba/assets/images/configScreen.jpeg)

## Cómo funciona

Kotoba integra modelos y servicios para automatizar traducción y pronunciación:

* Traducción automática usando modelo de HuggingFace:

  * `Helsinki-NLP/opus-mt-en-es`

* Generación de voz:

  * `ElevenLabs`

Esto permite:

## Tecnologías

* React Native
* Expo
* Widgets nativos (iOS y Android)
* blender
* Consumo de modelos de IA para traducción y voz

## Demo

![/kotoba/assets/images/review.mp4](/kotoba/assets/images/review.mp4)
