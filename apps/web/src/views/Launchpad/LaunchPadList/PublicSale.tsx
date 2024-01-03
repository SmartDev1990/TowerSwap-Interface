import React, { useState, useEffect } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import styled, { keyframes } from 'styled-components'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import FactoryAbi from './Abis/Factory.json'
import PrivateSale from './Abis/PublicSale.json'
import Countdown from 'react-countdown'
import { useRouter } from 'next/router'
import Globe from './Icons/Globe'
import WhitePaper from './Icons/WhitePaper'
import Telegram from './Icons/Telegram'
import Twitter from './Icons/Twitter'
import Discord from './Icons/Discord'
import Github from './Icons/Github'
import Linkedin from './Icons/Linkedin'
import CurrencyLogo from '../Logo/ChainLogo'
import { useActiveChainId } from 'hooks/useActiveChainId'
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
import { usePresaleFactory } from 'hooks/useContract'

interface PrivateCardProps {
  saleType: string
  factoryContractAddress: string
}

const PrivateCard: React.FC<PrivateCardProps> = ({ saleType }) => {
  const router = useRouter()
  const [addresses, setAddresses] = useState<string[]>([])
  const { chainId } = useActiveChainId()
  const [contributionAmount, setContributionAmount] = useState('')
  const [privateSaleAddresses, setPrivateSaleAddresses] = useState([])
  const [loading, setLoading] = useState(false)
  const [launchpadInfoList, setLaunchpadInfoList] = useState([])
  const [calculatedTokens, setCalculatedTokens] = useState(0)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
  const [launchpad, setLaunchpad] = useState(null)
  const { data: signer } = useSigner()
  const [participantInfo, setParticipantInfo] = useState({
    contributionAmount: 0,
    claimableTokens: 0,
  })
  const factoryContractAddress = usePresaleFactory()
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
    const fetchPrivateSaleAddresses = async () => {
      try {
        setLoading(true)
        const addresses = await factoryContractAddress.getAllPublicSaleAddress()
        if (!Array.isArray(addresses)) {
          throw new Error('Invalid addresses format')
        }
        const launchpadInfoPromises: Promise<any>[] = addresses.map(async (_launchpadAddress) => {
          try {
            const publicSaleContract = new ethers.Contract(_launchpadAddress, PrivateSale.abi, signer)

            const tokenName = await publicSaleContract.getTokenName()
            const tokenSymbol = await publicSaleContract.getTokenSymbol()

            const caps = await publicSaleContract.getCaps()
            const contributions = await publicSaleContract.getContributions()
            const times = await publicSaleContract.getTimes()
            const startTime = times[0]
            const endTime = times[1]
            const rates = await publicSaleContract.getRates()
            const priceRate = Number(rates[0]) / 10 ** 18
            const listingRate = Number(rates[1]) / 10 ** 18
            const liquidityPercent = await publicSaleContract.getLiquidityPercent()
            const liquidityLockup = await publicSaleContract.getLiquidityLockupTime()
            const dataURL = await publicSaleContract.getDataURL()
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
            const totalBNBContributed = await publicSaleContract.getTotalBNBContributed()

            const kycLink = await publicSaleContract.getKYCLink()
            const auditLink = await publicSaleContract.getAuditLink()
            const safuLink = await publicSaleContract.getSAFULink()
            const capsInWei = Number(caps[1]) / 10 ** 18

            const progressPercentage = Number(totalBNBContributed) / Number(capsInWei) * 100 / 10**18

            return {
              address: _launchpadAddress,
              info: {
                tokenName,
                tokenSymbol,
                caps,
                contributions,
                progressPercentage,
                startTime,
                endTime,
                priceRate,
                listingRate,
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
        const sortedLaunchpadInfo = validLaunchpadInfo.sort((a, b) => b.info.startTime - a.info.startTime);

        setLaunchpadInfoList(validLaunchpadInfo)
        setPrivateSaleAddresses(addresses)
      } catch (error) {
        console.error('Error fetching Presale addresses:', error)
        console.error('Error fetching launchpad info for address ${_launchpadAddress}:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrivateSaleAddresses()
  }, [chainId])

  return (
    <CardContainer
    style={{
      marginBottom: '10px', alignItems: 'center', justifyItems: 'center'
    }}>
      {launchpadInfoList.map((launchpad, index) => (
        <CardWrapper key={index}>
          <div className="launchpad-info">
            <div style={{ display: 'flex' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  style={{ border: '2px', borderRadius: '90px', width: '75px' }}
                  src={launchpad.info.additionalData.logoURL}
                  alt="Logo"
                  loading="lazy"
                />
                <CurrencyLogo chainId={chainId} />
              </div>

              <div style={{ paddingLeft: '20px' }}>
                <Typography style={{ fontSize: '18px', color: 'black' }}>{launchpad.info.tokenName} Presale</Typography>
                {launchpad.info.additionalData && (
                  <div style={{ display: 'flex' }}>
                    {launchpad.info.kycLink && (
                      <a href={launchpad.info.kycLink} target="_blank" rel="noopener noreferrer" className="badge-link">
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '3px',
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
                            marginRight: '3px',
                            marginBottom: '5px',
                            backgroundColor: '#fffc07',
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
                            marginRight: '3px',
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
              </div>
            </div>
            <div className="caps">
              <Typography style={{ fontSize: '18px', color: '#26098f', paddingTop: '15px' }}>
                1 {currencyText} = {Number(launchpad.info.priceRate)} {launchpad.info.tokenSymbol}
              </Typography>
              <Progress>
                <Typography style={{ fontSize: '12px', color: 'black' }}>Soft/HardCap: {Number(launchpad.info.caps[0] / 10**18)}/{Number(launchpad.info.caps[1] / 10**18)} {currencyText}</Typography>
                <Typography style={{ fontSize: '12px', color: 'black', display: 'flex', alignItems: 'center' }}>
                  Max Buy: {Number(launchpad.info.contributions[1]) / 10 ** 18} {currencyText}
                </Typography>
                </Progress>
              <div className="caps">
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
                  value={(Number(launchpad.info.totalBNBContributed / 10**18) / Number(launchpad.info.caps[1] / 10**18)) * 100}
                  style={{
                    marginTop: '10px',
                    padding: '4px',
                    borderRadius: '5px',
                    flexGrow: 1,
                  }}
                />
                </Box>
                <Progress style={{ paddingBottom: '10px'}}>
                  <Typography style={{ color: 'black', textAlign: 'right', fontSize: '12px' }}>
                    {Number(launchpad.info.totalBNBContributed) / 10**18} {currencyText}
                  </Typography>
                  <Typography style={{ color: 'black', marginLeft: '10px', textAlign: 'right', fontSize: '12px' }}>
                    {Number(launchpad.info.caps[1] / 10**18)} {currencyText}
                  </Typography>
                </Progress>
              </div>
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
            </CapsDiv>
          </Grid>
          </div>
        </CardWrapper>
      ))}
    </CardContainer>
  )
}

export default PrivateCard
