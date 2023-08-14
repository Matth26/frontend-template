import { useContractRead } from '@starknet-react/core';
import { shortString } from 'starknet';
import compiled from '../assets/compiled/test.json';
import { Button } from './ui/button';

const Read = () => {
  const sc_address =
    '0x06822ec1e50939e5693f47bbb87cb37ac38c45238e64b2264de36f733eb0ea8a';
  const { data, isLoading, error, refetch } = useContractRead({
    address: sc_address,
    abi: compiled.abi,
    functionName: 'name_get',
    args: [],
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
      </div>
    </div>
  );
};

export default Read;
