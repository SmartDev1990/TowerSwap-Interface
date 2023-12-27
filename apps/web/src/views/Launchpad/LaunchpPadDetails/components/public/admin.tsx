import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import PublicSale from '../../../LaunchPadList/Abis/PublicSale.json'
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
      const publicSaleContract = new ethers.Contract(address, PublicSale.abi, signer)
      const caps = await publicSaleContract.getCaps()
      const tokenBalance = await publicSaleContract.getTokenBalance()
      const ethBalance = await publicSaleContract.getEtherBalance()
      const rates = await publicSaleContract.getRates()
      const liquidityPercent = await publicSaleContract.getLiquidityPercent()
      const tokenAddress = await publicSaleContract.getTokenAddress()
      const router = await publicSaleContract.getRouter()
      const contributions = await publicSaleContract.getContributions()
      const totalBNBContributed = await publicSaleContract.getTotalBNBContributed()
      const totalContributions = await publicSaleContract.getTotalContributions()
      const saleFinalized = await publicSaleContract.saleFinalized()

      setLaunchpadInfo({
        address,
        info: {
          caps,
          rates,
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

      const softCap = caps[0]
      setSoftCapReached(totalBNBContributed >= softCap)
    } catch (error) {
      console.error(`Error fetching launchpad info for address ${address}:`, error)
    }
  }

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const fairSaleContract = new ethers.Contract(address, PublicSale.abi, signer); // Assuming you want to use the first account
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

    checkOwnership();
    fetchLaunchpadInfo();
  }, [address]);

  const handleCompleteSale = async () => {
    // let transaction
    let tokenContract
    try {
      const publicSaleContract = new ethers.Contract(address, PublicSale.abi, signer)

      const tokenAddress = await publicSaleContract.getTokenAddress()
      if (typeof tokenAddress === 'string') {
        const tokenContract = new ethers.Contract(tokenAddress, Erc20Abi.abi)
      } else {
        console.error('Invalid token address:', tokenAddress)
      }

      const isOwner = await publicSaleContract.getCreator().call({ from: signer })

      if (typeof isOwner === 'string' || (isOwner && typeof isOwner.getAddress === 'function' && isOwner.getAddress() === signer)) {
        if (launchpadInfo.info.totalContributions >= launchpadInfo.info.caps[0]) {
          const routerAddress = launchpadInfo.info.router
          const amount = ethers.constants.MaxUint256
          await tokenContract.approve(routerAddress, amount).send({
            from: signer,
          })

          // Now call finalizeSale function
          await publicSaleContract.finalizeSale().send({
            from: signer,
          })

          const saleFinalized = await publicSaleContract.saleFinalized()
          console.log('saleFinalized:', saleFinalized)

          // const transactionCount = await ethers.getTransactionCount(signer);
          // transaction = await ethers.eth.getTransaction(ethers.utils.hexlify(transactionCount))

          fetchLaunchpadInfo()
        }
      } else {
        console.error('You are not the owner of the contract.')
      }
    } catch (error) {
      console.error('Error completing the sale:', error)
    }
  }

  const handleWithdrawRemaining = async () => {
    try {

      const publicSaleContract = new ethers.Contract(address, PublicSale.abi, signer)

      const isOwner = await publicSaleContract.getCreator()

      if (typeof isOwner === 'string' || (isOwner && typeof isOwner.getAddress === 'function' && isOwner.getAddress() === signer)) {
        await publicSaleContract.withdrawRemaining().send({
          from: signer,
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
      const publicSaleContract = new ethers.Contract(address, PublicSale.abi, signer)
      const isOwner = await publicSaleContract.getCreator().call({ from: signer })
      if (typeof isOwner === 'string' || (isOwner && typeof isOwner.getAddress === 'function' && isOwner.getAddress() === signer)) {
        await publicSaleContract.cancelSale().send({
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
              {launchpadInfo.info.caps[0] && (
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
