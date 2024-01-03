// LaunchpadDetail.js
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers, utils } from 'ethers'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import PublicSale from '../../../LaunchPadList/Abis/FairSale.json'
import Countdown from 'react-countdown'
import styled from 'styled-components'
import { CURRENCY_TEXT } from '../../../Logo/currencylogo'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useSigner } from 'wagmi'
import BigNumber from 'bignumber.js'
import {
  CardContainer,
  CardWrapper,
  CapsDiv,
  CountdownTime,
  LaunchpadLink,
  View,
  SnakeProgressDiv,
} from '../../Css/Animation'
import { useFairsaleAddress } from 'hooks/useContract';

interface Contributions {
  amount: BigNumber
}

const Contributions = ({ launchpadInfo, fetchLaunchpadInfo }) => {
  const router = useRouter()
  const { address } = router.query as { address?: string }
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
  const fairSaleContract = useFairsaleAddress(address)

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

  if (!launchpadInfo || !launchpadInfo.info) {
  return <div>Loading...</div>;
}

const handleContribute = async () => {
  try {
    const amount = ethers.utils.parseEther(contributionAmount);

    await fairSaleContract.contribute({ value: amount }); // Use the { value: amount } option to send BNB along with the transaction

    fetchLaunchpadInfo();
  } catch (error) {
    console.error('Error contributing to the sale:', error);
  }
};

  const handleClaimTokens = async () => {
    try {
      await fairSaleContract.claimTokens().send({
        from: signer,
      })
      fetchLaunchpadInfo()
    } catch (error) {
      console.error('Error claiming tokens:', error)
    }
  }

  const handleClaimRefund = async () => {
    try {
      await fairSaleContract.claimRefund().send({
        from: signer,
      })
      fetchLaunchpadInfo()
    } catch (error) {
      console.error('Error claiming refund:', error)
    }
  }

  const fetchParticipantInfo = async () => {
    try {
      const result = await fairSaleContract.getParticipantInfo()
      setParticipantInfo({
        contributionAmount: result[0],
        claimableTokens: result[1],
      })
      console.log('contributionAmount:', contributionAmount)
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
            />
            <SnakeProgressDiv />
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
          label={currencyText}
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
            {Number(launchpadInfo.info.participant)}
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
            {Number(launchpadInfo.info.totalBNBContributed) / 10 ** 18} {currencyText}
          </Typography>
        </CapsDiv>
      </Grid>
    </div>
  )
}

export default Contributions
