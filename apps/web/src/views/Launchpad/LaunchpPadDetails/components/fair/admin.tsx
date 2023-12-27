import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import FairSale from '../../../LaunchPadList/Abis/FairSale.json'
import Countdown from 'react-countdown'
import Erc20Abi from '../../../LaunchPadList/Abis/Erc20.json'
import RouterAbi from '../../../LaunchPadList/Abis/Router.json'
import { BigNumber, ethers } from 'ethers'
  import { useSigner } from 'wagmi'

const Admin = () => {
  const router = useRouter()
  const { address } = router.query as { address?: string }
  const [launchpadInfo, setLaunchpadInfo] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [softCapReached, setSoftCapReached] = useState(false)
  const [saleFinalized, setSaleFinalized] = useState(false)
  const { data: signer } = useSigner()

  const fetchLaunchpadInfo = async () => {
    try {

      const fairSaleContract = new ethers.Contract(address, FairSale.abi, signer)

      const softCap = await fairSaleContract.getSoftCap()
      const tokenBalance = await fairSaleContract.getTokenBalance()
      const ethBalance = await fairSaleContract.getEtherBalance()
      const liquidityPercent = await fairSaleContract.getLiquidityPercent()
      const tokenAddress = await fairSaleContract.getTokenAddress()
      const router = await fairSaleContract.getRouter()
      const contributions = await fairSaleContract.getContributions()
      const totalBNBContributed = await fairSaleContract.getTotalBNBContributed()
      const totalContributions = await fairSaleContract.getTotalContributions()
      const saleFinalized = await fairSaleContract.saleFinalized()

      setLaunchpadInfo({
        address,
        info: {
          softCap,
          contributions,
          totalBNBContributed,
          totalContributions,
          liquidityPercent,
          tokenAddress,
          router,
          tokenBalance,
          ethBalance,
          saleFinalized,
        },
      })
      setSoftCapReached(totalBNBContributed >= softCap)
    } catch (error) {
      console.error(`Error fetching launchpad info for address ${address}:`, error)
    }
  }

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const fairSaleContract = new ethers.Contract(address, FairSale.abi, signer)
        const owner: void | [] | (unknown[] & []) = await fairSaleContract.getCreator()

        if (typeof owner === 'string') {
          setIsOwner(owner === signer)
        } else {
          setIsOwner(false) // or handle other cases
        }
      } catch (error) {
        console.error('Error checking ownership:', error)
      }
    }

    checkOwnership()
    fetchLaunchpadInfo()
  }, [address])

  const handleCompleteSale = async () => {
    // let transaction;
    let tokenContract;

    try {
      const fairSaleContract = new ethers.Contract(address, FairSale.abi, signer);
      const tokenAddress = await fairSaleContract.getTokenAddress();

      if (typeof tokenAddress === 'string') {
        tokenContract = new ethers.Contract(tokenAddress, Erc20Abi.abi);
      } else {
        console.error('Invalid token address:', tokenAddress);
        return; // Exit the function if the token address is invalid
      }

      const isOwner = await fairSaleContract.getCreator().call({ from: signer });

      if (typeof isOwner === 'string' || (isOwner && typeof isOwner.getAddress === 'function' && isOwner.getAddress() === signer)) {
        if (launchpadInfo.info.totalContributions >= launchpadInfo.info.softCap) {
          const routerAddress = launchpadInfo.info.router;
          const amount = ethers.constants.MaxUint256;

          await tokenContract.approve(routerAddress, amount).send({
            from: signer,
          });

          await fairSaleContract.finalizeSale().send({
            from: signer,
          });

          const saleFinalized = await fairSaleContract.saleFinalized();
          console.log('saleFinalized:', saleFinalized);

          // const transactionCount = await ethers.provider.getTransactionCount(signer);
          // transaction = await ethers.provider.getTransaction(ethers.utils.hexlify(transactionCount));


          fetchLaunchpadInfo();
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
      const fairSaleContract = new ethers.Contract(address, FairSale.abi, signer)

      const isOwner = await fairSaleContract.getCreator().call({ from: signer })

      if (typeof isOwner === 'string' || (isOwner && typeof isOwner.getAddress === 'function' && isOwner.getAddress() === signer)) {
        await fairSaleContract.withdrawRemaining().send({
          from: signer,
        })

        // Refresh the launchpad information after withdrawing remaining funds
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
      const fairSaleContract = new ethers.Contract(address, FairSale.abi, signer)
      const isOwner = await fairSaleContract.getCreator().call({ from: signer })
      if (typeof isOwner === 'string' || (isOwner && typeof isOwner.getAddress === 'function' && isOwner.getAddress() === signer)) {
        await fairSaleContract.cancelSale().send({
          from: signer,
        })
        fetchLaunchpadInfo()
      } else {
        console.error('You are not the owner of the contract.')
      }
    } catch (error) {
      console.error('Error canceling the sale:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchLaunchpadInfo()
    }

    fetchData()
  }, [address])

  if (!launchpadInfo) {
    return <div>Loading...</div>
  }

  return (
    <Card style={{ marginTop: '10px' }}>
      <div className="launchpad-detail-container">
        {isOwner && (
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
              {launchpadInfo.info.softCap && (
                <Grid item xs={12} style={{ marginBottom: '10px' }}>
                  <Button variant="contained" color="primary" onClick={handleCompleteSale}>
                    Finalize Sale
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} style={{ marginBottom: '10px' }}>
                <Button variant="contained" color="secondary" onClick={handleCancelSale}>
                  Cancel Sale
                </Button>
              </Grid>
              {isOwner && launchpadInfo.info.saleFinalized && (
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
