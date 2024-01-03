// constibution.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { BigNumber } from 'ethers';
import Countdown from 'react-countdown'
import { ethers, utils } from 'ethers'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import { useActiveChainId } from 'hooks/useActiveChainId';
import { useSigner } from 'wagmi';
import styled from 'styled-components';
import { CURRENCY_TEXT } from '../../../Logo/currencylogo'
import { usePrivatesaleAddress } from 'hooks/useContract';
import {
  CardContainer,
  CardWrapper,
  CapsDiv,
  CountdownTime,
  LaunchpadLink,
  View,
  SnakeProgressDiv,
} from '../../Css/Animation'


const Contributions = ({ launchpadInfo, fetchLaunchpadInfo }) => {
  const router = useRouter();
  const { address } = router.query as { address?: string };
  const [contributionAmount, setContributionAmount] = useState('');
  const { chainId } = useActiveChainId();
  const currencyText = CURRENCY_TEXT[chainId] || '';
  const { data: signer } = useSigner();
  const privateSaleContract = usePrivatesaleAddress(address);
  const [participantInfo, setParticipantInfo] = useState({
    contributionAmount: 0,
    claimableTokens: 0,
  })

  const formatDateTime = (timestamp) => {
    const options = {
      weekday: 'long' as const,
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const,
      hour: 'numeric' as const,
      minute: 'numeric' as const,
      second: 'numeric' as const,
      timeZoneName: 'short' as const,
    };
    return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
  };

  if (!launchpadInfo || !launchpadInfo.info) {
  return <div>Loading...</div>;
}

  const fetchParticipantInfo = async () => {
    try {
      const result = await privateSaleContract.getParticipantInfo();

      setParticipantInfo({
        contributionAmount: result[0].toString(), // Convert BigNumber to string
        claimableTokens: result[1].toString(), // Convert BigNumber to string
      });

      console.log('contributionAmount:', participantInfo.contributionAmount);
    } catch (error) {
      console.error('Error fetching participant info:', error);
    }
  };

  const handleContribute = async () => {
    try {
      const amount = ethers.utils.parseEther(contributionAmount);

      await privateSaleContract.contribute({ value: amount }); // Use the { value: amount } option to send BNB along with the transaction

      fetchLaunchpadInfo();
    } catch (error) {
      console.error('Error contributing to the sale:', error);
    }
  };


  const handleClaimTokens = async () => {
    try {
      await privateSaleContract.claimTokens().send({
        from: signer,
      })
    } catch (error) {
      console.error('Error claiming tokens:', error)
    }
  }

  const handleClaimRefund = async () => {
    try {
      await privateSaleContract.claimRefund().send({
        from: signer,
      })
      fetchLaunchpadInfo()
    } catch (error) {
      console.error('Error claiming refund:', error)
    }
  }

  const contributionInBNB = Number(launchpadInfo.info.totalBNBContributed) / 10 ** 18
  const softCapInBNB = Number(launchpadInfo.info.caps[1]) / 10 ** 18
  const progressPercentage = Number(contributionInBNB) / Number(softCapInBNB) * 100

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
                Presale start in <Countdown date={new Date(Number(launchpadInfo.info.startTime) * 1000)} />
              </p>
            ) : new Date().getTime() < Number(launchpadInfo.info.endTime) * 1000 ? (
              <p
                style={{
                  color: 'black',
                }}
              >
                Presale will end in <Countdown date={new Date(Number(launchpadInfo.info.endTime) * 1000)} />
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
              Progress {`(${progressPercentage.toFixed(2)}%)`}
            </Typography>
            <Box display="flex" alignItems="center">
              <LinearProgress
                variant="determinate"
                value={(Number(launchpadInfo.info.totalBNBContributed) / Number(launchpadInfo.info.hardCap)) * 100}
                style={{
                  marginTop: '10px',
                  padding: '8px',
                  borderRadius: '5px',
                  flexGrow: 1,
                }}
              />
            </Box>
            <CapsDiv>
              <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
                {Number(launchpadInfo.info.totalBNBContributed) / 10 ** 18} {currencyText}
              </Typography>
              <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
                {Number(launchpadInfo.info.hardCap) / 10 ** 18} {currencyText}
              </Typography>
            </CapsDiv>
          </div>
        </Grid>
      <Grid item xs={12} style={{ marginTop: '20px' }}>
        <TextField
          label="Contribution Amount"
          variant="outlined"
          fullWidth
          value={contributionAmount}
          onChange={(e) => setContributionAmount(e.target.value)}
        />
      </Grid>

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
          <Typography style={{ color: 'black' }}>
          Claim available after Finalize
          </Typography>
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
          {launchpadInfo.info.participant}
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
            {Number(launchpadInfo.info.totalBNBContributed) / 10 ** 18} / {Number(launchpadInfo.info.hardCap) / 10 ** 18}{' '}
            {currencyText}
          </Typography>
        </CapsDiv>
        <CapsDiv>
          <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
            Total Token Sold:
          </Typography>
          <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
            {((Number(launchpadInfo.info.totalBNBContributed) / 10 ** 18) * Number(launchpadInfo.info.rates[0])) /
              10 ** 18}{' '}
            / {((Number(launchpadInfo.info.priceRate) / 10 ** 18) * Number(launchpadInfo.info.hardCap)) / 10 ** 18}{' '}
            {launchpadInfo.info.tokenSymbol}
          </Typography>
        </CapsDiv>
        <CapsDiv>
          <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
            My Balance:
          </Typography>
          <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
            {((Number(participantInfo.contributionAmount) / 10 ** 18) * Number(launchpadInfo.info.softCap)) / 10 ** 18}{' '}
            {launchpadInfo.info.tokenSymbol}
          </Typography>
        </CapsDiv>
      </Grid>
    </div>
  )
}

export default Contributions
