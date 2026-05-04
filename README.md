# CORTEX-SHIELD 🚀&#10;&#10;[![GitHub Repo](https://img.shields.io/badge/GitHub-cyber_mind-blue?logo=github)](https://github.com/rudra-prasad-panigrahi/cyber_mind)&#10;&#10;CORTEX-SHIELD is an **AI-Powered Cyber Defense Platform** featuring a real-time Security Operations Center (SOC) dashboard. Built with React frontend and Flask backend with ML models for threat detection.&#10;&#10;## Features&#10;- Real-time attack visualization (maps, charts, timelines)&#10;- ML-based anomaly detection on network traffic&#10;- Attack simulation & automated defense actions&#10;- SMS alerts & investigation panels&#10;- Threat database & stat cards&#10;&#10;## Tech Stack&#10;- **Frontend**: React 18, Chart.js, Leaflet maps, Framer Motion&#10;- **Backend**: Flask, Scikit-learn/PyTorch ML, CSV datasets&#10;- **Proxy**: Frontend proxies to backend @ localhost:5005&#10;&#10;## Quick Start&#10;### Backend&#10;```bash&#10;cd backend&#10;python -m venv venv&#10;venv\\Scripts\\activate&#10;pip install -r requirements.txt&#10;flask run&#10;```&#10;&#10;### Frontend&#10;```bash&#10;cd frontend&#10;npm install&#10;npm start&#10;```&#10;&#10;Open http://localhost:3000&#10;&#10;## Project Structure&#10;```
backend/          # Flask API, ML models, datasets, attack sim
├── app.py
├── requirements.txt
├── datasets/
├── ml_models/
└── logs/
frontend/         # React CRA SOC dashboard
├── src/
│   ├── components/  # Charts, Maps, Modals, Timeline etc.
│   └── pages/       # Login, MainSOC
├── public/
└── package.json
```&#10;&#10;**Built with ❤️ by BLACKBOXAI**
