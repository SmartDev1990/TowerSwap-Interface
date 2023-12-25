import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import Web3 from 'web3'
import PrivateSale from '../../../LaunchPadList/Abis/PrivateSale.json'
import Countdown from 'react-countdown'
import Erc20Abi from '../../../LaunchPadList/Abis/Erc20.json'
import RouterAbi from '../../../LaunchPadList/Abis/Router.json'
import { BigNumber, ethers } from 'ethers'

const Admin = () => {
  const router = useRouter()
  const { address } = router.query as { address?: string }
  const [launchpadInfo, setLaunchpadInfo] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [softCapReached, setSoftCapReached] = useState(false)
  const [saleFinalized, setSaleFinalized] = useState(false)

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
      const web3 = new Web3(window.ethereum)
      const publicSaleContract = new web3.eth.Contract(PrivateSale.abi, address)

      const caps = await publicSaleContract.methods.getCaps().call()
      const tokenBalance = await publicSaleContract.methods.getTokenBalance().call()
      const ethBalance = await publicSaleContract.methods.getEtherBalance().call()
      const rates = await publicSaleContract.methods.getRates().call()
      const liquidityPercent = await publicSaleContract.methods.getLiquidityPercent().call()
      const tokenAddress = await publicSaleContract.methods.getTokenAddress().call()
      const router = await publicSaleContract.methods.getRouter().call()
      const contributions = await publicSaleContract.methods.getContributions().call()
      const totalBNBContributed = await publicSaleContract.methods.getTotalBNBContributed().call()
      const totalContributions = await publicSaleContract.methods.getTotalContributions().call()
      const saleFinalized = await publicSaleContract.methods.saleFinalized().call()

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
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        const publicSaleContract = new web3.eth.Contract(PrivateSale.abi, address)

        // Check if the connected account is the owner
        const owner: void | [] | (unknown[] & []) = await publicSaleContract.methods.getCreator().call()

        // Add a type check for owner
        if (typeof owner === 'string') {
          setIsOwner(owner === accounts[0])
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
    let transaction
    let tokenContract
    try {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      const publicSaleContract = new web3.eth.Contract(PrivateSale.abi, launchpadInfo.address)

      const tokenAddress = await publicSaleContract.methods.getTokenAddress().call()
      if (typeof tokenAddress === 'string') {
        const tokenContract = new web3.eth.Contract(Erc20Abi.abi, tokenAddress)
      } else {
        console.error('Invalid token address:', tokenAddress)
      }

      const isOwner = await publicSaleContract.methods.getCreator().call({ from: accounts[0] })

      if (typeof isOwner === 'string' && isOwner === accounts[0]) {
        if (launchpadInfo.info.totalContributions >= launchpadInfo.info.caps[0]) {
          const routerAddress = launchpadInfo.info.router
          const amount = ethers.constants.MaxUint256
          await tokenContract.methods.approve(routerAddress, amount).send({
            from: accounts[0],
          })
          const tokenBalance = await publicSaleContract.methods.getTokenBalance().call()
          const ethBalance = await publicSaleContract.methods.getEtherBalance().call()
          const totalContributions = launchpadInfo.info.totalContributions
          const softCap = launchpadInfo.info.rates[1]
          const liquidityPercent = launchpadInfo.info.liquidityPercent
          const tokenAmount = (totalContributions * softCap * liquidityPercent) / 100 / 10 ** 18

          await publicSaleContract.methods.finalizeSale().send({
            from: accounts[0],
          })

          const saleFinalized = await publicSaleContract.methods.saleFinalized().call()

          const transactionCount = await web3.eth.getTransactionCount(accounts[0])
          transaction = await web3.eth.getTransaction(ethers.utils.hexlify(transactionCount))

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
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      const publicSaleContract = new web3.eth.Contract(PrivateSale.abi, address)

      const isOwner = await publicSaleContract.methods.getCreator().call({ from: accounts[0] })

      if (typeof isOwner === 'string' && isOwner === accounts[0]) {
        await publicSaleContract.methods.withdrawRemaining().send({
          from: accounts[0],
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
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      const publicSaleContract = new web3.eth.Contract(PrivateSale.abi, launchpadInfo.address)

      const owner: void | [] | (unknown[] & []) = await publicSaleContract.methods.getCreator().call()

      if (typeof isOwner === 'string' && isOwner === accounts[0]) {
        // Call the cancelSale function
        await publicSaleContract.methods.cancelSale().send({
          from: accounts[0],
        })

        // Refresh the launchpad information after canceling the sale
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
