import { useAccount, useContractRead } from '@starknet-react/core';
import { shortString } from 'starknet';
import compiled from '../assets/compiled/erc20.json';
import { Button } from './ui/button';

const Read = () => {
  const sc_address =
    '0x0677d2b686991c53e1d005818a602fdcc63096fd1b4c3f06bad656a15c30361e';
  const { data, isLoading, error, refetch } = useContractRead({
    address: sc_address,
    abi: compiled.abi,
    functionName: 'get_name',
    args: [],
    watch: false,
  });

  const { address } = useAccount();
  const { data: dataBalance } = useContractRead({
    address: sc_address,
    abi: compiled.abi,
    functionName: 'balance_of',
    args: address ? [address] : undefined,
    watch: false,
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {JSON.stringify(error)}</span>;
  if (data === undefined) return <></>;

  return (
    <div>
      <div>Address: {sc_address}</div>
      <div className="flex gap-2 justify-center">
        <Button onClick={refetch}>Refetch</Button>
        <p className="my-auto">
          Name:{' '}
          {shortString.decodeShortString(
            '0x' + (data as unknown as bigint).toString(16)
          )}
        </p>
        {dataBalance && (
          <p className="my-auto">
            Balance: {(dataBalance as unknown as bigint).toString(10)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Read;
