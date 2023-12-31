import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ethers, utils } from 'ethers'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useSigner, useAccount } from 'wagmi';
import { useFairsaleAddress, useTokensaleAddress } from 'hooks/useContract';
import { useActiveChainId } from 'hooks/useActiveChainId';

const Admin = ({ launchpadInfo, fetchLaunchpadInfo }) => {
  const router = useRouter();
  const { address } = router.query as { address?: string };
  const { address: account } = useAccount();
  const { chainId } = useActiveChainId();
  const [owner, setOwner] = useState(true);
  const { data: signer } = useSigner();
  const fairSaleContract = useFairsaleAddress(address);

  if (!launchpadInfo || !launchpadInfo.info) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const owner = await fairSaleContract.getCreator();
        setOwner(owner === account);
      } catch (error) {
        console.error('Error checking ownership:', error);
      }
    };

    checkOwnership();
  }, [address]);

  const handleCompleteSale = async () => {
    try {
      const owner = await fairSaleContract.getCreator();
      if (typeof owner === 'string' || (owner && typeof owner.getAddress === 'function' && owner.getAddress() === account)) {
        if (launchpadInfo.info.totalBNBContributed >= launchpadInfo.info.onlySoftcap) {
          const routerAddress = launchpadInfo.info.router;
          const amount = ethers.constants.MaxUint256;
          const tokenContract = useTokensaleAddress(launchpadInfo.info.tokenAddress);

          await tokenContract.approve(routerAddress, amount).send({
            from: account,
          });

          await fairSaleContract.finalizeSale().send({
            from: account,
          });

          await fetchLaunchpadInfo();
        }
      } else {
        console.error('You are not the owner of the contract.');
      }
    } catch (error) {
      console.error('Error completing the sale:', error);
    }
  };

  const handleWithdrawRemaining = async () => {
    try {
      const owner = await fairSaleContract.getCreator();
      if (typeof owner === 'string' || (owner && typeof owner.getAddress === 'function' && owner.getAddress() === account)) {
        await fairSaleContract.withdrawRemaining().send({
          from: account,
        });
      } else {
        console.error('You are not the owner of the contract.');
      }
    } catch (error) {
      console.error('Error withdrawing remaining funds:', error);
    }
  };

  const handleCancelSale = async () => {
    try {
      const owner = await fairSaleContract.getCreator();
      if (typeof owner === 'string' || (owner && typeof owner.getAddress === 'function' && owner.getAddress() === account)) {
        await fairSaleContract.cancelSale().send({
          from: account,
        });
      } else {
        console.error('You are not the owner of the contract.');
      }
    } catch (error) {
      console.error('Error canceling the sale:', error);
    }
  };

  return (
    <Card style={{ marginTop: '10px', padding: '20px' }}>
      <div className="launchpad-detail-container">
        {owner && (
          <Grid item xs={12}>
            <>
              <Typography
                style={{
                  color: 'black',
                  marginLeft: '10px',
                  marginBottom: '20px',
                  fontSize: '18px',
                  borderBottom: '1px solid black',
                }}
              >
                Creator Panel
              </Typography>
              {owner && (
                <Grid item xs={12} style={{ marginBottom: '10px' }}>
                  <Button variant="contained" color="primary" onClick={handleCompleteSale}>
                    Finalize Sale
                  </Button>
                </Grid>
              )}
              {owner && (
                <Grid item xs={12} style={{ marginBottom: '10px' }}>
                  <Button variant="contained" color="secondary" onClick={handleCancelSale}>
                    Cancel Sale
                  </Button>
                </Grid>
              )}
              {owner && launchpadInfo.info.saleFinalized && (
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleWithdrawRemaining}>
                    Withdraw Remaining
                  </Button>
                </Grid>
              )}
            </>
          </Grid>
        )}
      </div>
    </Card>
  );
};

export default Admin;
