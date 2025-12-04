import React from 'react';
import ReactDOM from 'react-dom/client';

// 🎯 TRÊS VERSÕES DISPONÍVEIS:

// 1️⃣ INSTITUCIONAL - Azul Marinho + Verde Neon (UI ↔ API mapping)
import AppInstitucional from './AppInstitucional'; // ⭐ ATIVA

// 2️⃣ SIMPLIFICADA - Para comerciante (sem termos técnicos)
// import AppSimples from './AppSimples';

// 3️⃣ TÉCNICA - Para desenvolvedor (todas features visíveis)
// import App from './App';

import './styles/globals.css';

// 🎨 VERSÃO ATIVA: INSTITUCIONAL (Azul Marinho Minimalista)
// Para trocar: comente/descomente os imports acima

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppInstitucional />
  </React.StrictMode>
);
