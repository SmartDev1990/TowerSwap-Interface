import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import PublicSale from '../../../LaunchPadList/Abis/PublicSale.json'
import Countdown from 'react-countdown'
import Erc20Abi from '../../../LaunchPadList/Abis/Erc20.json'
import RouterAbi from '../../../LaunchPadList/Abis/Router.json'
import { ethers, utils } from 'ethers'
import { useSigner } from 'wagmi'
import { useAccount } from 'wagmi'
import { usePresaleAddress, useTokensaleAddress } from 'hooks/useContract';
import { useActiveChainId } from 'hooks/useActiveChainId'

const Admin = ({ launchpadInfo, fetchLaunchpadInfo }) => {
  const router = useRouter()
  const { address } = router.query as { address?: string }
  const [owner, setOwner] = useState(false)
  const { chainId } = useActiveChainId();
  const [softCapReached, setSoftCapReached] = useState(false)
  const [saleFinalized, setSaleFinalized] = useState(false)
  const { data: signer } = useSigner()
  const publicSaleContract = usePresaleAddress(address);
  const tokenContract = useTokensaleAddress(launchpadInfo.info.tokenContract);
  const { address: account } = useAccount()

  if (!launchpadInfo || !launchpadInfo.info) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
      const checkOwnership = async () => {
        try {
          const owner = await publicSaleContract.getCreator();
          setOwner(owner === account);
        } catch (error) {
          console.error('Error checking ownership:', error);
        }
      };
    checkOwnership();
  }, [address]);

  const handleCompleteSale = async () => {
    // let transaction;
    try {
      const owner = await publicSaleContract.getCreator();
      console.log('Owner:', owner);

      if (typeof owner === 'string' || (owner && typeof owner.getAddress === 'function' && owner.getAddress() === account)) {
        const routerAddress = await publicSaleContract.getRouter();
        const amount = ethers.constants.MaxUint256;

        // Uncomment the following line if needed
        // await tokenContract.approve(routerAddress, amount, { from: account });

        await publicSaleContract.finalizeSale({ from: account });

        const saleFinalized = await publicSaleContract.saleFinalized();
        console.log('Sale Finalized:', saleFinalized);

        // const transactionCount = await ethers.getTransactionCount(signer);
        // transaction = await ethers.eth.getTransaction(ethers.utils.hexlify(transactionCount));

        fetchLaunchpadInfo();
      } else {
        console.error('You are not the owner of the contract.');
      }
    } catch (error) {
      console.error('Error completing the sale:', error);
    }
  };


  const handleWithdrawRemaining = async () => {
    try {
      const owner = await publicSaleContract.getCreator()
      if (typeof owner === 'string' || (owner && typeof owner.getAddress === 'function' && owner.getAddress() === account)) {
        await publicSaleContract.withdrawRemaining().send({
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
      const owner = await publicSaleContract.getCreator()
      if (typeof owner === 'string' || (owner && typeof owner.getAddress === 'function' && owner.getAddress() === account)) {
        await publicSaleContract.cancelSale().send({
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
  )
}

export default Admin
