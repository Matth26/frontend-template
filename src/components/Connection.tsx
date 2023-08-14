import { Button } from '@/components/ui/button';
import { useAccount, useConnectors } from '@starknet-react/core';
import { useEffect } from 'react';

const Connection = () => {
  const { address, status } = useAccount();
  const { connect, available, disconnect, refresh } = useConnectors();

  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className="flex gap-2">
      {status === 'disconnected' ? (
        available.map((connector) => (
          <Button key={connector.id} onClick={() => connect(connector)}>
            Connect {connector.id}
          </Button>
        ))
      ) : (
        <div className="flex flex-row items-center gap-4 justify-self-end">
          <div>{address}</div>
          <Button onClick={disconnect}>Disconnect</Button>
        </div>
      )}
    </div>
  );
};

export default Connection;
