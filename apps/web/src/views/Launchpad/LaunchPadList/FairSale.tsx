import React, { useState, useEffect } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box } from '@mui/material'
import { ethers } from 'ethers'
import FactoryAbi from './Abis/Factory.json'
import FairFactoryAbi from './Abis/FairFactory.json'
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
  SnakeProgressDiv,
 } from './Css/Animation'
  import { useSigner } from 'wagmi'

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
  const factoryContractAddress = FAIRLAUNCH_FACTORY[chainId]
  const { data: signer } = useSigner()
  const currencyText = CURRENCY_TEXT[chainId] || ''
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
        const factoryContract = new ethers.Contract(factoryContractAddress, FairFactoryAbi.abi, signer)
        const addresses = await factoryContract.getAllFairLaunchAddress()
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
  }, [factoryContractAddress])

  if (!launchpadInfoList || !launchpadInfoList.length) {
    return <div>Loading...</div>
  }

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
                            style={{ maxWidth: '16px', marginRight: '5px' }}
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
                            style={{ maxWidth: '16px', verticalAlign: 'middle', marginRight: '5px' }}
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
                            style={{ maxWidth: '16px', verticalAlign: 'middle', marginRight: '5px' }}
                          />
                          DOXXED
                        </p>
                      </a>
                    )}
                  </div>
                )}
                {launchpad.info.additionalData && ( // Check if logoURLs[0] exists
                  <div style={{ display: 'flex' }}>
                    {launchpad.info.additionalData.website && (
                      <a
                        style={{ marginRight: '10px' }}
                        href={launchpad.info.additionalData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="social-media-icon2" />
                      </a>
                    )}
                    {launchpad.info.additionalData.telegram && (
                      <a
                        style={{ marginRight: '10px' }}
                        href={launchpad.info.additionalData.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Telegram className="social-media-icon2" />
                      </a>
                    )}
                    {launchpad.info.additionalData.twitter && (
                      <a
                        style={{ marginRight: '10px' }}
                        href={launchpad.info.additionalData.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="social-media-icon2" />
                      </a>
                    )}
                    {launchpad.info.additionalData.discord && (
                      <a
                        style={{ marginRight: '10px' }}
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
                      <a href={launchpad.info.additionalData.linkedin} target="_blank" rel="noopener noreferrer">
                        <Github className="social-media-icon2" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="caps">
              <Typography
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'black',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                }}
              >
                Max Buy : {Number(launchpad.info.contributions[1]) / 10 ** 18} {currencyText}
              </Typography>
              <Box display="flex" alignItems="center">
                <LinearProgress
                  variant="determinate"
                  value={Number(launchpad.info.totalBNBContributed)}
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
                <Typography style={{ color: 'black', textAlign: 'right', fontSize: '12px' }}>Progress:</Typography>
                <Typography style={{ color: 'black', textAlign: 'right', fontSize: '12px' }}>
                  {Number(launchpad.info.totalBNBContributed) / 10 ** 18} {currencyText}
                </Typography>
              </CapsDiv>
            </div>
            <CapsDiv>
              <Typography style={{ fontSize: '14px', color: 'black', fontWeight: 'bold' }}>
                Soft Cap: {Number(launchpad.info.softCap) / 10 ** 18} {currencyText}
              </Typography>
            </CapsDiv>
            <Grid>
              <CapsDiv>
                {launchpad.info && <p className="liqText">Liquidity:</p>}
                {launchpad.info && <p className="liqText">{Number(launchpad.info.liquidityPercent)}%</p>}
              </CapsDiv>
              <CapsDiv>
                {launchpad.info && <p className="liqText">Lock:</p>}
                {launchpad.info && <p className="liqText">{Number(launchpad.info.liquidityLockup)} days</p>}
              </CapsDiv>
            </Grid>

            <CountdownTime>
              {new Date().getTime() < Number(launchpad.info.startTime) * 1000 ? (
                <p style={{ color: 'black' }}>
                  Presale start in <Countdown date={new Date(launchpad.info.startTime * 1000)} />
                </p>
              ) : new Date().getTime() < Number(launchpad.info.endTime) * 1000 ? (
                <p style={{ color: 'black' }}>
                  Presale will end in <Countdown date={new Date(launchpad.info.endTime * 1000)} />
                </p>
              ) : (
                <p style={{ color: 'black' }}>Presale complete</p>
              )}
            </CountdownTime>
            <LaunchpadLink onClick={() => router.push(`/Launchpad/${saleType}/${launchpad.address}`)}>
              <View className="view-details-link">View Details</View>
            </LaunchpadLink>
          </div>
        </CardWrapper>
      ))}
    </CardContainer>
  )
}

export default FairCard
