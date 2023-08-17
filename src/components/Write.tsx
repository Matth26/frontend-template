import { useAccount, useContractWrite } from '@starknet-react/core';
import { cairo } from 'starknet';
import { Button } from './ui/button';

const Write = () => {
  const { address } = useAccount();

  const sc_address =
    '0x0677d2b686991c53e1d005818a602fdcc63096fd1b4c3f06bad656a15c30361e';

  const { write } = useContractWrite({
    calls: address
      ? [
          {
            contractAddress: sc_address,
            entrypoint: 'approve',
            calldata: [
              '0x021CB4a871d5A777AbBE7C2cb6Fc11Bfbf27D2664717016BF908E3287b468339',
              cairo.uint256(10),
            ],
          },
          {
            contractAddress: sc_address,
            entrypoint: 'transfer',
            calldata: [
              '0x021CB4a871d5A777AbBE7C2cb6Fc11Bfbf27D2664717016BF908E3287b468339',
              cairo.uint256(10),
            ],
          },
        ]
      : undefined,
  });

  return (
    <>
      {address && (
        <div className="flex gap-2 justify-center">
          <Button onClick={() => write()}>Send 10 token</Button>
        </div>
      )}
    </>
  );
};

export default Write;
