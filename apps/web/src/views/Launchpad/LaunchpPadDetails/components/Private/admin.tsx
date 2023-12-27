import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import PrivateSale from '../../../LaunchPadList/Abis/PrivateSale.json'
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

  const [vestingForm, setVestingForm] = useState({
    beneficiary: '',
    cliff: '',
    duration: '',
    percentReleasedPerInterval: '',
    intervals: '',
  })

  const handleVestingChange = (event) => {
    setVestingForm({
      ...vestingForm,
      [event.target.name]: event.target.value,
    })
  }

  const fetchLaunchpadInfo = async () => {
    try {
      const privateSaleContract = new ethers.Contract(address, PrivateSale.abi, signer)
      console.log('address:', address)
      const caps = await privateSaleContract.getCaps()
      const tokenBalance = await privateSaleContract.getTokenBalance()
      const ethBalance = await privateSaleContract.getEtherBalance()
      const rates = await privateSaleContract.getRates()
      const liquidityPercent = await privateSaleContract.getLiquidityPercent()
      const tokenAddress = await privateSaleContract.getTokenAddress()
      const router = await privateSaleContract.getRouter()
      const contributions = await privateSaleContract.getContributions()
      const totalBNBContributed = await privateSaleContract.getTotalBNBContributed()
      const totalContributions = await privateSaleContract.getTotalContributions()
      const saleFinalized = await privateSaleContract.saleFinalized()

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
        const fairSaleContract = new ethers.Contract(address, PrivateSale.abi, signer);
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
      const privateSaleContract = new ethers.Contract(address, PrivateSale.abi, signer)
      const tokenAddress = await privateSaleContract.getTokenAddress()
      if (typeof tokenAddress === 'string') {
        const tokenContract = new ethers.Contract(tokenAddress, Erc20Abi.abi)
      } else {
        console.error('Invalid token address:', tokenAddress)
      }
      const isOwner = await privateSaleContract.getCreator().call({ from: signer })
      if (typeof isOwner === 'string' || (isOwner && typeof isOwner.getAddress === 'function' && isOwner.getAddress() === signer)) {
        if (launchpadInfo.info.totalContributions >= launchpadInfo.info.caps[0]) {
          const routerAddress = launchpadInfo.info.router
          const amount = ethers.constants.MaxUint256
          await tokenContract.methods.approve(routerAddress, amount).send({
            from: signer,
          })

          await privateSaleContract.finalizeSale().send({
            from: signer,
          })
          const saleFinalized = await privateSaleContract.saleFinalized()

          // const transactionCount = await ethers.getTransactionCount(signer)
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
      const privateSaleContract = new ethers.Contract(address, PrivateSale.abi, signer)

      const isOwner = await privateSaleContract.getCreator().call({ from: signer })

      if (typeof isOwner === 'string' || (isOwner && typeof isOwner.getAddress === 'function' && isOwner.getAddress() === signer)) {
        await privateSaleContract.withdrawRemaining().send({
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
      const privateSaleContract = new ethers.Contract(address, PrivateSale.abi, signer)
      const isOwner = await privateSaleContract.getCreator().call({ from: signer })
      if (typeof isOwner === 'string' || (isOwner && typeof isOwner.getAddress === 'function' && isOwner.getAddress() === signer)) {
        await privateSaleContract.cancelSale().send({
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
