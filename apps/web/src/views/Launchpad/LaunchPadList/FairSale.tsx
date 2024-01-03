import React, { useState, useEffect } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box } from '@mui/material'
import { ethers } from 'ethers'
import FairFactory from './Abis/FairFactory.json'
import FairSale from './Abis/FairSale.json'
import Countdown from 'react-countdown'
import { useRouter } from 'next/router'
import Globe from './Icons/Globe'
import Telegram from './Icons/Telegram'
import Twitter from './Icons/Twitter'
import Discord from './Icons/Discord'
import Github from './Icons/Github'
import { useActiveChainId } from 'hooks/useActiveChainId'
import CurrencyLogo from '../Logo/ChainLogo'
import styled from 'styled-components'
import { FAIRLAUNCH_FACTORY } from 'config/constants/exchange'
import { CURRENCY_TEXT } from '../Logo/currencylogo'
import {
  CardContainer,
  CardWrapper,
  CapsDiv,
  CountdownTime,
  LaunchpadLink,
  View,
  Progress,
  SnakeProgressDiv,
 } from './Css/Animation'
  import { useSigner } from 'wagmi'
  import { useFairsaleFactory } from 'hooks/useContract'

interface FairCardProps {
  saleType: string
  factoryContractAddress: string
}

const FairCard: React.FC<FairCardProps> = ({ saleType }) => {
  const router = useRouter()
  const [fairSaleAddresses, setFairSaleAddresses] = useState([])
  const [loading, setLoading] = useState(false)
  const { chainId } = useActiveChainId()
  const [launchpadInfoList, setLaunchpadInfoList] = useState([])
  const currencyText = CURRENCY_TEXT[chainId] || ''
  const { data: signer } = useSigner()
  const factoryContractAddress = useFairsaleFactory()
  console.log(`factoryContractAddress:`, factoryContractAddress)
  let accounts

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
    const fetchFairSaleAddresses = async () => {
      try {
        setLoading(true)
        const addresses = await factoryContractAddress.getAllFairLaunchAddress()
        if (!Array.isArray(addresses)) {
          throw new Error('Invalid addresses format')
        }
        const launchpadInfoPromises: Promise<any>[] = addresses.map(async (_launchpadAddress) => {
          console.log(`address:`, _launchpadAddress)
          try {
            const fairSaleContract = new ethers.Contract(_launchpadAddress, FairSale.abi, signer)

            const tokenName = await fairSaleContract.getTokenName()
            const tokenSymbol = await fairSaleContract.getTokenSymbol()

            const softCap = await fairSaleContract.getSoftCap()
            const contributions = await fairSaleContract.getContributions()
            const times = await fairSaleContract.getTimes()
            const liquidityPercent = await fairSaleContract.getLiquidityPercent()
            const liquidityLockup = await fairSaleContract.getLiquidityLockupTime()
            const dataURL = await fairSaleContract.getDataURL()
            if (typeof dataURL !== 'string' || (dataURL as string).trim() === '') {
              throw new Error('Invalid dataURL format')
            }
            const response = await fetch(dataURL)
            if (!response.ok) {
              throw new Error(`Failed to fetch data from ${dataURL}, status: ${response.status}`)
            }
            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
              throw new Error(`Invalid content type. Expected JSON, but received ${contentType}`)
            }
            const additionalData = await response.json()
            const totalBNBContributed = await fairSaleContract.getTotalBNBContributed()

            const kycLink = await fairSaleContract.getKYCLink()
            const auditLink = await fairSaleContract.getAuditLink()
            const safuLink = await fairSaleContract.getSAFULink()
            const progressPercentage = Number(totalBNBContributed / softCap) * 100

            return {
              address: _launchpadAddress,
              info: {
                tokenName,
                tokenSymbol,
                softCap,
                contributions,
                times,
                liquidityPercent,
                liquidityLockup,
                dataURL,
                totalBNBContributed,
                additionalData,
                progressPercentage,
                kycLink,
                auditLink,
                safuLink,
              },
            }
          } catch (error) {
            console.error(`Error fetching launchpad info for address ${_launchpadAddress}:`, error)
            return null
          }
        })

        const allLaunchpadInfo = await Promise.all(launchpadInfoPromises)

        // Filter out null values (contracts that are not valid Launchpad contracts)
        const validLaunchpadInfo = allLaunchpadInfo.filter((info) => info !== null)

        setLaunchpadInfoList(validLaunchpadInfo)
        setFairSaleAddresses(addresses)
      } catch (error) {
        console.error('Error fetching Presale addresses:', error)
        console.error('Error fetching launchpad info for address ${_launchpadAddress}:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFairSaleAddresses()
  }, [chainId])

  return (
    <CardContainer>
      {launchpadInfoList.map((launchpad, index) => (
        <CardWrapper key={index}>
          <div className="launchpad-info">
            <div style={{ display: 'flex' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  style={{ border: '2px', borderRadius: '90px', width: '75px' }}
                  src={launchpad.info.additionalData.logoURL}
                  alt="Logo"
                />
                <CurrencyLogo chainId={chainId} />
              </div>
              <div style={{ paddingLeft: '5px' }}>
                <Typography style={{ fontSize: '18px', color: 'black' }}>
                  {launchpad.info.tokenName} FairLaunch
                </Typography>
                {launchpad.info.additionalData && (
                  <div style={{ display: 'flex' }}>
                    {launchpad.info.kycLink && (
                      <a href={launchpad.info.kycLink} target="_blank" rel="noopener noreferrer" className="badge-link">
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '2px',
                            marginBottom: '5px',
                            backgroundColor: '#007bff',
                            padding: '3px',
                          }}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2143/2143150.png"
                            alt="KYC Icon"
                            style={{ maxWidth: '14px', marginRight: '5px' }}
                          />
                          KYC
                        </p>
                      </a>
                    )}
                    {launchpad.info.auditLink && (
                      <a href={launchpad.info.auditLink} target="_blank" rel="noopener noreferrer">
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '2px',
                            marginBottom: '5px',
                            backgroundColor: '#e482f7',
                            padding: '3px',
                          }}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/3375/3375293.png"
                            alt="Audit Icon"
                            style={{ maxWidth: '14px', verticalAlign: 'middle', marginRight: '5px' }}
                          />
                          AUDIT
                        </p>
                      </a>
                    )}
                    {launchpad.info.safuLink && (
                      <a href={launchpad.info.safuLink} target="_blank" rel="noopener noreferrer">
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '2px',
                            marginBottom: '5px',
                            backgroundColor: '#fffc07',
                            padding: '3px',
                          }}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2143/2143150.png"
                            alt="KYC Icon"
                            style={{ maxWidth: '14px', verticalAlign: 'middle', marginRight: '5px' }}
                          />
                          DOXXED
                        </p>
                      </a>
                    )}
                  </div>
                )}
                {/* {launchpad.info.additionalData && ( // Check if logoURLs[0] exists
                  <div style={{ display: 'flex' }}>
                    {launchpad.info.additionalData.website && (
                      <a
                        style={{ margin: '5px' }}
                        href={launchpad.info.additionalData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="social-media-icon2" />
                      </a>
                    )}
                    {launchpad.info.additionalData.telegram && (
                      <a
                        style={{ margin: '5px' }}
                        href={launchpad.info.additionalData.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Telegram className="social-media-icon2" />
                      </a>
                    )}
                    {launchpad.info.additionalData.twitter && (
                      <a
                        style={{ margin: '5px' }}
                        href={launchpad.info.additionalData.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="social-media-icon2" />
                      </a>
                    )}
                    {launchpad.info.additionalData.discord && (
                      <a
                        style={{ margin: '5px' }}
                        href={launchpad.info.additionalData.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Discord className="social-media-icon2" />
                      </a>
                    )}
                    {launchpad.info.additionalData.github && (
                      <a href={launchpad.info.additionalData.github} target="_blank" rel="noopener noreferrer">
                        <Github className="social-media-icon2" />
                      </a>
                    )}
                    {launchpad.info.additionalData.linkedin && (
                      <a
                      style={{ margin: '5px' }}
                      href={launchpad.info.additionalData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      >
                        <Github className="social-media-icon2" />
                      </a>
                    )}
                  </div>
                )} */}
              </div>
            </div>
            <div className="caps">
              <Typography style={{ fontSize: '18px', color: '#26098f', paddingTop: '15px' }}>
                Max Buy : {Number(launchpad.info.contributions[1]) / 10 ** 18} {currencyText}
              </Typography>
              <Progress>
                <Typography style={{ color: 'black', textAlign: 'center', fontSize: '12px' }}>
                  Progress
                </Typography>
                <Typography style={{ color: 'black', textAlign: 'center', fontSize: '12px' }}>
                  {`${launchpad.info.progressPercentage.toFixed(2)}%`}
                </Typography>
              </Progress>
                <Box display="flex" alignItems="center">
                  <LinearProgress
                    variant="determinate"
                    value={(Number(launchpad.info.totalBNBContributed) / Number(launchpad.info.softCap)) * 100}
                    style={{
                      marginTop: '10px',
                      padding: '5px',
                      borderRadius: '5px',
                      flexGrow: 1,
                    }}
                  />
                </Box>
              <Progress style={{ paddingBottom: '20px'}}>
                <Typography style={{ color: 'black', textAlign: 'right', fontSize: '12px' }}>Sold</Typography>
                <Typography style={{ color: 'black', textAlign: 'right', fontSize: '12px' }}>
                  {Number(launchpad.info.totalBNBContributed) / 10 ** 18} {currencyText}
                </Typography>
              </Progress>
            </div>
            <Grid style={{ padding: '20px', background: '#e8e8e8', borderRadius: '20px'}}>
              <Progress>
                {launchpad.info && <p className="liqText">Liquidity: {Number(launchpad.info.liquidityPercent)}%</p>}
                {launchpad.info && <p className="liqText">Lock: {Number(launchpad.info.liquidityLockup)} days</p>}
              </Progress>
            </Grid>
            <Grid>
            <CapsDiv>
            <CountdownTime>
              {new Date().getTime() < Number(launchpad.info.times[0]) * 1000 ? (
                <p style={{ color: 'black' }}>
                  Presale start in <Countdown date={new Date(launchpad.info.times[0] * 1000)} />
                </p>
              ) : new Date().getTime() < Number(launchpad.info.times[1]) * 1000 ? (
                <p style={{ color: 'black' }}>
                  Presale will end in <Countdown date={new Date(launchpad.info.times[1] * 1000)} />
                </p>
              ) : (
                <p style={{ color: 'black' }}>Presale complete</p>
              )}
            </CountdownTime>
            <LaunchpadLink onClick={() => router.push(`/Launchpad/${saleType}/${launchpad.address}`)}>
              <View className="view-details-link">View Details</View>
            </LaunchpadLink>
            </CapsDiv>
          </Grid>
          </div>
        </CardWrapper>
      ))}
    </CardContainer>
  )
}

export default FairCard
