import { InjectedConnector, StarknetConfig } from '@starknet-react/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RpcProvider } from 'starknet';
import App from './App.tsx';
import './index.css';

const connectors = [
  new InjectedConnector({ options: { id: 'braavos' } }),
  new InjectedConnector({ options: { id: 'argentX' } }),
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StarknetConfig
      connectors={connectors}
      defaultProvider={
        new RpcProvider({
          nodeUrl:
            import.meta.env.INFURA_RPC ||
            'https://starknet-testnet.public.blastapi.io',
        })
      }
    >
      <App />
    </StarknetConfig>
  </React.StrictMode>
);
