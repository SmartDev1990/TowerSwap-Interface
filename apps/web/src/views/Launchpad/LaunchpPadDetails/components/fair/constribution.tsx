// LaunchpadDetail.js
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import PublicSale from '../../../LaunchPadList/Abis/FairSale.json'
import Countdown from 'react-countdown'
import styled from 'styled-components'
import { CURRENCY_TEXT } from '../../../Logo/currencylogo'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useSigner } from 'wagmi'

const CapsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px; /* Add padding for better spacing */
`

const CountdownTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 5px;
  box-shadow: 10px;
`

const Contributions = () => {
  const router = useRouter()
  const { address } = router.query as { address?: string }
  const [launchpadInfo, setLaunchpadInfo] = useState(null)
  const [contributionAmount, setContributionAmount] = useState('')
  const [presaleComplete, setPresaleComplete] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const { chainId } = useActiveChainId()
  const currencyText = CURRENCY_TEXT[chainId] || ''
  const [participantInfo, setParticipantInfo] = useState({
    contributionAmount: 0,
    claimableTokens: 0,
  })
  const { data: signer } = useSigner()

  const formatDateTime = (timestamp) => {
    const options = {
      weekday: 'long' as const,
      year: 'numeric' as const, // Specify the type as 'numeric'
      month: 'long' as const,
      day: 'numeric' as const,
      hour: 'numeric' as const,
      minute: 'numeric' as const,
      second: 'numeric' as const,
      timeZoneName: 'short' as const,
    }
    return new Date(timestamp * 1000).toLocaleDateString(undefined, options)
  }

  useEffect(() => {
    const fetchLaunchpadInfo = async () => {
      try {
        const publicSaleContract = new ethers.Contract(address, PublicSale.abi, signer)
        const softCap = await publicSaleContract.getSoftCap()
        const tokenSymbol = await publicSaleContract.getTokenSymbol()
        const contributions = await publicSaleContract.getContributions()
        const saleFinalized = await publicSaleContract.saleFinalized()
        const allToken = await publicSaleContract.getTokenForSale()
        const totalBNBContributed = await publicSaleContract.getTotalBNBContributed()
        const totalContributions = await publicSaleContract.getTotalContributions()
        const participantNumber = await publicSaleContract.getNumberOfParticipants()
        const times = await publicSaleContract.getTimes()
        const startTime = times[0]
        const endTime = times[1]
        const progressPercentage = (Number(totalBNBContributed) / Number(softCap)) * 100
        const percentage = progressPercentage / 10 ** 18

        setLaunchpadInfo({
          address,
          info: {
            softCap,
            contributions,
            percentage,
            progressPercentage,
            totalBNBContributed,
            participantNumber,
            startTime,
            endTime,
            tokenSymbol,
            totalContributions,
            allToken,
            saleFinalized,
          },
        })
      } catch (error) {
        console.error(`Error fetching launchpad info for address ${address}:`, error)
      }
    }

    fetchLaunchpadInfo()
  }, [address])

  if (!launchpadInfo) {
    return <div>Loading...</div>
  }

  const handleContribute = async (fetchLaunchpadInfo) => {
    try {
      const publicSaleContract = new ethers.Contract(address, PublicSale.abi)

      const contributionInWei = ethers.utils.hexlify(contributionAmount);
      await publicSaleContract.methods
        .contribute()
        .send({
          from: signer,
          value: contributionInWei,
        })
        .on('error', (error) => {
          console.error('Error contributing to the sale:', error.message)
        })

      fetchLaunchpadInfo()
      await fetchParticipantInfo()
    } catch (error) {
      console.error('Error contributing to the sale:', error)
    }
  }

  const handleClaimTokens = async (fetchLaunchpadInfo) => {
    try {
      const publicSaleContract = new ethers.Contract(address, PublicSale.abi)

      // Call the claimTokens function
      await publicSaleContract.claimTokens().send({
        from: signer,
      })

      // Refresh the launchpad information after claiming tokens
      fetchLaunchpadInfo()
    } catch (error) {
      console.error('Error claiming tokens:', error)
    }
  }

  const handleClaimRefund = async (fetchLaunchpadInfo) => {
    try {
      const publicSaleContract = new ethers.Contract(address, PublicSale.abi)

      // Call the claimRefund function
      await publicSaleContract.claimRefund().send({
        from: signer,
      })

      // Refresh the launchpad information after claiming refund
      fetchLaunchpadInfo()
    } catch (error) {
      console.error('Error claiming refund:', error)
    }
  }

  const fetchParticipantInfo = async () => {
    try {
      const publicSaleContract = new ethers.Contract(address, PublicSale.abi)

      const result = await publicSaleContract.getParticipantInfo()

      setParticipantInfo({
        contributionAmount: result[0],
        claimableTokens: result[1],
      })
      console.log('contributionAmount:', contributionAmount)
      fetchParticipantInfo()
      fetchParticipantInfo()
    } catch (error) {
      console.error('Error fetching participant info:', error)
    }
  }

  const contributionInBNB = Number(launchpadInfo.info.totalBNBContributed) / 10 ** 18
  const softCapInBNB = Number(launchpadInfo.info.softCap) / 10 ** 18
  const progressPercentage = Number(contributionInBNB / softCapInBNB) * 100

  return (
    <div className="launchpad-detail-container">
      <Grid item xs={12}>
        <CountdownTime>
          {new Date().getTime() < Number(launchpadInfo.info.startTime) * 1000 ? (
            <p
              style={{
                color: 'black',
              }}
            >
              Presale start in <Countdown date={new Date(launchpadInfo.info.startTime * 1000)} />
            </p>
          ) : new Date().getTime() < Number(launchpadInfo.info.endTime) * 1000 ? (
            <p
              style={{
                color: 'black',
              }}
            >
              Presale will end in <Countdown date={new Date(launchpadInfo.info.endTime * 1000)} />
            </p>
          ) : (
            <p
              style={{
                color: 'black',
              }}
            >
              Presale Complete
            </p>
          )}
        </CountdownTime>
        <div className="caps">
          <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'center', fontSize: '12px' }}>
            Progress : {`(${progressPercentage.toFixed(2)}%)`}
          </Typography>
          <Box display="flex" alignItems="center">
            <LinearProgress
              variant="determinate"
              value={Number(launchpadInfo.info.totalBNBContributed / launchpadInfo.info.softCap) * 100}
              style={{
                marginTop: '10px',
                padding: '8px',
                borderRadius: '5px',
                flexGrow: 1,
              }}
              className="snake-progress" // Apply the CSS class
            />
          </Box>
          <CapsDiv>
            <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
              SoftCap : {Number(launchpadInfo.info.softCap) / 10 ** 18} {currencyText}
            </Typography>
            <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
              Sold : {`${Number(launchpadInfo.info.totalBNBContributed) / 10 ** 18}`} {currencyText}
            </Typography>
          </CapsDiv>
        </div>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '20px' }}>
        <TextField
          label="Contribution Amount (BNB)"
          variant="outlined"
          fullWidth
          value={contributionAmount}
          onChange={(e) => setContributionAmount(e.target.value)} // Ensure that you are updating the state
        />
      </Grid>

      {/* Button to contribute */}
      <Grid item xs={12} style={{ marginTop: '10px' }}>
        <Button variant="contained" color="primary" onClick={handleContribute}>
          Contribute
        </Button>
      </Grid>

      <Grid item xs={12} style={{ marginTop: '10px' }}>
        {launchpadInfo.info.saleFinalized ? (
          <Button variant="contained" color="primary" onClick={handleClaimTokens}>
            Claim Tokens
          </Button>
        ) : (
          <Typography style={{ color: 'black' }}></Typography>
        )}
      </Grid>

      <Grid item xs={12} style={{ marginTop: '10px' }}>
        {launchpadInfo.info.saleCanceled ? (
          <Button variant="contained" color="primary" onClick={handleClaimRefund}>
            Claim Refund
          </Button>
        ) : (
          <Typography style={{ color: 'black' }}></Typography>
        )}
      </Grid>

      <Grid item xs={12} style={{ marginTop: '10px' }}>
        <CapsDiv>
          <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
            Participant:
          </Typography>
          <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
            {Number(launchpadInfo.info.participantNumber)}
          </Typography>
        </CapsDiv>
        <CapsDiv>
          <Typography
            style={{
              color: 'black',
              marginLeft: '10px',
              textAlign: 'right',
              fontSize: '12px',
            }}
          >
            {currencyText} constribution:
          </Typography>
          <Typography
            style={{
              color: 'black',
              marginLeft: '10px',
              textAlign: 'right',
              fontSize: '12px',
            }}
          >
            {Number(launchpadInfo.info.totalContributions) / 10 ** 18} {currencyText}
          </Typography>
        </CapsDiv>
      </Grid>
    </div>
  )
}

export default Contributions
