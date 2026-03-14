# TriajeSalud — Autotriaje Digital SET

Sistema de autotriaje digital basado en el **Sistema Espanol de Triaje (SET)** del Servicio Murciano de Salud (SMS), inspirado en el modelo NHS 111 Pathways y las experiencias de Mediktor en el Hospital Arnau de Vilanova.

## Caracteristicas

- **SET 5 niveles**: Resucitacion, Emergencia, Urgencia, Estandar, No urgente
- **19 categorias sintomaticas** basadas en las mas frecuentes del SMS
- **Discriminadores de gravedad** tipo web_e-PAT: preguntas criticas si/no
- **Escala EVA de dolor** (0-10) interactiva
- **Principio NHS Pathways**: cuantas menos preguntas, mas grave es la situacion
- **Triaje por voz** con Gemini 2.0 Flash API (multiidioma, 11 idiomas)
- **Generacion de QR** con datos del triaje para acelerar la atencion presencial
- **Multiidioma**: Espanol, English, Francais, العربية (con soporte RTL)
- **PWA**: Instalable como app, funciona offline
- **Sin emoticonos**: Interfaz profesional medica
- **RGPD compliant**: Disclaimer legal Ley 41/2002

## Despliegue en GitHub Pages

1. Crea un repositorio en GitHub llamado `apptriaje`
2. Sube todos los archivos de este directorio
3. Ve a Settings > Pages > Source: Deploy from branch > Branch: main > / (root)
4. La app estara disponible en `https://tu-usuario.github.io/apptriaje/`

## Estructura

```
apptriaje/
  index.html      -- Pagina principal (carga React + Babel desde CDN)
  app.jsx         -- Componente React con toda la logica
  manifest.json   -- Manifiesto PWA
  sw.js           -- Service Worker para offline
  README.md       -- Este archivo
```

## Configurar Gemini API

1. Ve a [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Crea una API key gratuita
3. En la app, ve a "Triaje por voz" y pega la key en el campo de configuracion
4. La key se guarda localmente en tu navegador (localStorage)

Sin API key, el triaje por voz funciona con analisis local (menos preciso).

## Tecnologias

- React 18 (CDN, sin build step)
- Babel standalone (compilacion JSX en el navegador)
- Web Speech API (reconocimiento de voz)
- Google Gemini 2.0 Flash API (analisis IA multiidioma)
- Anthropic Claude API (fallback)
- PWA (Service Worker + manifest)

## Basado en

- Sistema Espanol de Triaje (SET) — SEMES
- NHS 111 Online / NHS Pathways
- Mediktor — Hospital Arnau de Vilanova (Lleida)
- Protocolos del Servicio Murciano de Salud (SMS)

## Aviso legal

Esta herramienta es **orientativa** y NO sustituye la valoracion de un profesional sanitario. No constituye diagnostico medico. Ante una emergencia vital, llame al **112**. Cumplimiento Ley 41/2002.

## Autor

Carlos Galera Roman — Medico, Area II Cartagena, Servicio Murciano de Salud

## Licencia

MIT
