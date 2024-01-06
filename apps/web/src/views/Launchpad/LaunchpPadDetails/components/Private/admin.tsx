import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import Countdown from 'react-countdown'
import { ethers, utils } from 'ethers'
import { useSigner } from 'wagmi'
import { useAccount } from 'wagmi'
import { usePrivatesaleAddress, useTokensaleAddress } from 'hooks/useContract';
import { useActiveChainId } from 'hooks/useActiveChainId'

const Admin = ({ launchpadInfo, fetchLaunchpadInfo }) => {
  const router = useRouter();
  const { address } = router.query as { address?: string };
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId();
  const [owner, setOwner] = useState(true);
  const { data: signer } = useSigner();
  const privateSaleContract = usePrivatesaleAddress(address);
  const tokenContract = useTokensaleAddress(launchpadInfo.info.tokenContract);

  if (!launchpadInfo || !launchpadInfo.info) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
      const checkOwnership = async () => {
        try {
          const owner = await privateSaleContract.getCreator();
          setOwner(owner === account);
        } catch (error) {
          console.error('Error checking ownership:', error);
        }
      };
    checkOwnership();
  }, [address]);

  const handleCompleteSale = async () => {
  try {
    console.log('tokenContract:', tokenContract)
    const routerAddress = await privateSaleContract.getRouter();
    const caps = await privateSaleContract.getCaps()
    const softCap = caps[0]
    const totalBNBContributed = await privateSaleContract.getTotalBNBContributed()
    console.log('routerAddress:', routerAddress)
    const owner = await privateSaleContract.getCreator();
    if (typeof owner === 'string' || (owner && typeof owner.getAddress === 'function' && owner.getAddress() === account)) {
      if (totalBNBContributed >= softCap) {
        const amount = ethers.constants.MaxUint256;

        await tokenContract.approve(routerAddress, amount, { from: account})

        await privateSaleContract.finalizeSale({from: account});

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
      const owner = await privateSaleContract.getCreator();
      if (typeof owner === 'string' || (owner && typeof owner.getAddress === 'function' && owner.getAddress() === account)) {
        await privateSaleContract.withdrawRemaining().send({
          from: account,
        })
        fetchLaunchpadInfo()
      } else {
        console.error('You are not the owner of the contract.')
      }
    } catch (error) {
      console.error('Error withdrawing remaining funds:', error)
    }
  }

  const handleCancelSale = async () => {
    try {
      const owner = await privateSaleContract.getCreator();
      if (typeof owner === 'string' || (owner && typeof owner.getAddress === 'function' && owner.getAddress() === account)) {
        await privateSaleContract.cancelSale().send({
          from: account,
        })
        fetchLaunchpadInfo()
      } else {
        console.error('You are not the owner of the contract.')
      }
    } catch (error) {
      console.error('Error canceling the sale:', error)
    }
  }

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
              {owner && launchpadInfo.info.caps[0] && (
                <Grid item xs={12} style={{ marginBottom: '10px' }}>
                  <Button variant="contained" color="primary" onClick={handleCompleteSale}>
                    Finalize Sale
                  </Button>
                </Grid>
              )}
              {owner && launchpadInfo.info.caps[0] && (
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
  )
}

export default Admin
