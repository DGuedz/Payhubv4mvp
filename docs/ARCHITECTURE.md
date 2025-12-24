# PAYHUB v4 - Architecture Topology

This document illustrates the Hybrid Infrastructure of PAYHUB v4, combining a Client-Side React Application with a secure Serverless Backend on Vercel, interacting with the XRPL Ledger.

```mermaid
graph TD
    subgraph Client_Side [Cliente / Navegador]
        Browser[User Browser]
        XummApp[Xumm Wallet App]
    end

    subgraph Vercel_Infra [Vercel Cloud (Hybrid)]
        subgraph Frontend_Layer [Static Edge]
            CDN[Vite SPA (React)]
        end
        
        subgraph Backend_Layer [Serverless Functions]
            Pulse[api/pulse.ts<br/>(Health & OpSec)]
            Sec[api/security/alerts.ts<br/>(Honeypot/Defense)]
            Auth[api/auth/xumm/*.ts<br/>(OAuth Handler)]
        end
    end

    subgraph Blockchain_Layer [External Networks]
        XRPL[XRPL Mainnet]
        XummAPI[Xumm Platform API]
    end

    %% Fluxos
    Browser -->|HTTPS / Load UI| CDN
    Browser -->|HTTPS / API Calls| Pulse
    Browser -->|HTTPS / Auth Init| Auth
    
    Auth -->|Handshake| XummAPI
    XummApp -->|Sign Payload| XummAPI
    
    Pulse -->|Check Secrets| Vercel_Infra
    Sec -->|Log Threats| Vercel_Infra
    
    Backend_Layer -.->|Transaction Submit| XRPL
    
    style Vercel_Infra fill:#f9f9f9,stroke:#333,stroke-width:2px
    style Backend_Layer fill:#e1f5fe,stroke:#01579b
    style Blockchain_Layer fill:#fff3e0,stroke:#ff6f00
```
