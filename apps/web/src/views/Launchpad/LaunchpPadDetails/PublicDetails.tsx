// LaunchpadDetail.js
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box } from '@mui/material'
import { ethers } from 'ethers'
import Countdown from 'react-countdown'
import Globe from './Icons/Globe'
import Telegram from './Icons/Telegram'
import Twitter from './Icons/Twitter'
import Discord from './Icons/Discord'
import Github from './Icons/Github'
import WhitePaper from './Icons/WhitePaper'
import Linkedin from './Icons/Linkedin'
import Contributions from '../LaunchpPadDetails/components/public/constribution'
import Admin from '../LaunchpPadDetails/components/public/admin'
import AdminOnly from '../LaunchpPadDetails/components/public/onlyadmin'
import { useActiveChainId } from 'hooks/useActiveChainId'
import styled from 'styled-components'
import { CURRENCY_TEXT } from '../Logo/currencylogo'
import { useSigner } from 'wagmi'
import { usePresaleAddress } from 'hooks/useContract'

const CapsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px; /* Add padding for better spacing */
`

interface PublicSaleDetailProps {
  address: string
  chainId: string
}

const PublicSaleDetail: React.FC<PublicSaleDetailProps> = () => {
  const router = useRouter()
  const { chainId } = useActiveChainId()
  const { address } = router.query as { address?: string }
  const [launchpadInfo, setLaunchpadInfo] = useState(null)
  const currencyText = CURRENCY_TEXT[chainId] || ''
  const { data: signer } = useSigner()
  const publicSaleContract = usePresaleAddress(address)

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

    const fetchLaunchpadInfo = async () => {
      try {
        const tokenContract = await publicSaleContract.getTokenAddress()
        const tokenName = await publicSaleContract.getTokenName()
        const tokenSymbol = await publicSaleContract.getTokenSymbol()
        const tokenSupply = await publicSaleContract.getTokenTotalSupply()

        const caps = await publicSaleContract.getCaps()
        const contributions = await publicSaleContract.getContributions()
        const minBuy = contributions[0]
        const times = await publicSaleContract.getTimes()
        const rates = await publicSaleContract.getRates()
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
        const participantNumber = await publicSaleContract.getNumberOfParticipants()
        const participant = Number(participantNumber)
        const saleFinalized = await publicSaleContract.saleFinalized()
        const kycLink = await publicSaleContract.getKYCLink()
        const auditLink = await publicSaleContract.getAuditLink()
        const safuLink = await publicSaleContract.getSAFULink()

        setLaunchpadInfo({
          address,
          info: {
            tokenContract,
            tokenName,
            tokenSymbol,
            tokenSupply,
            caps,
            contributions,
            minBuy,
            times,
            rates,
            liquidityPercent,
            liquidityLockup,
            dataURL,
            totalBNBContributed,
            additionalData,
            participant,
            saleFinalized,
            kycLink,
            auditLink,
            safuLink,
          },
        })
      } catch (error) {
        console.error(`Error fetching launchpad info for address ${address}:`, error)
      }
    }

    useEffect(() => {
    fetchLaunchpadInfo();
    }, [address]);

  if (!launchpadInfo) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ margin: '12px' }}>
      <h2
        style={{
          margin: '20px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        {launchpadInfo.info.tokenName} Presale Detail
      </h2>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            style={{
              marginBottom: '10px',
            }}
          >
            <Card>
              <CardContent>
                <div style={{ display: 'flex' }}>
                  <div>
                    <img
                      style={{
                        border: '2px black solid',
                        borderRadius: '20px',
                        width: '160px',
                      }}
                      src={launchpadInfo.info.additionalData.logoURL}
                      alt="Logo"
                    />
                  </div>
                  <div style={{ paddingLeft: '20px' }}>
                    <Typography style={{ fontSize: '22px', color: 'black', paddingBottom: '10px', paddingTop: '10px' }}>
                      {launchpadInfo.info.tokenName} Presale
                    </Typography>
                    {launchpadInfo?.info?.additionalData && (
                      <div style={{ display: 'flex' }}>
                        {launchpadInfo.info.kycLink && (
                          <a
                            href={launchpadInfo.info.kycLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="badge-link"
                          >
                            <p
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '5px',
                                marginBottom: '5px',
                                backgroundColor: '#007bff',
                                padding: '5px',
                                borderRadius: '5px',
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
                        {launchpadInfo.info.auditLink && (
                          <a href={launchpadInfo.info.auditLink} target="_blank" rel="noopener noreferrer">
                            <p
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '5px',
                                marginBottom: '5px',
                                backgroundColor: '#e482f7',
                                padding: '5px',
                                borderRadius: '5px',
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
                        {launchpadInfo.info.safuLink && (
                          <a href={launchpadInfo.info.safuLink} target="_blank" rel="noopener noreferrer">
                            <p
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '5px',
                                marginBottom: '5px',
                                backgroundColor: '#fffc07',
                                padding: '5px',
                                borderRadius: '5px',
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
                    {launchpadInfo?.info?.additionalData && ( // Check if logoURLs[0] exists
                      <div style={{ display: 'flex' }}>
                        {launchpadInfo?.info?.additionalData.website && (
                          <a
                            href={launchpadInfo?.info?.additionalData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ margin: '5px' }}
                          >
                            <Globe className="social-media-icon" />
                          </a>
                        )}
                        {launchpadInfo?.info?.additionalData.whitepaper && (
                          <a
                            href={launchpadInfo?.info?.additionalData.whitepaper}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ margin: '5px' }}
                          >
                            <WhitePaper className="social-media-icon" />
                          </a>
                        )}
                        {launchpadInfo?.info?.additionalData.telegram && (
                          <a
                            href={launchpadInfo?.info?.additionalData.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ margin: '5px' }}
                          >
                            <Telegram className="social-media-icon" />
                          </a>
                        )}
                        {launchpadInfo?.info?.additionalData.twitter && (
                          <a
                            href={launchpadInfo?.info?.additionalData.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ margin: '5px' }}
                          >
                            <Twitter className="social-media-icon" />
                          </a>
                        )}
                        {launchpadInfo?.info?.additionalData.discord && (
                          <a
                            href={launchpadInfo?.info?.additionalData.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ margin: '5px' }}
                          >
                            <Discord className="social-media-icon" />
                          </a>
                        )}
                        {launchpadInfo?.info?.additionalData.github && (
                          <a
                            href={launchpadInfo?.info?.additionalData.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ margin: '5px' }}
                          >
                            <Github className="social-media-icon" />
                          </a>
                        )}
                        {launchpadInfo?.info?.additionalData.linkedin && (
                          <a
                          style={{ margin: '5px' }}
                          href={launchpadInfo?.info?.additionalData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          >
                            <Linkedin className="social-media-icon2" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Typography style={{ fontSize: '16px', padding: '20px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {launchpadInfo.info.additionalData.description}
                </Typography>
                {launchpadInfo.info.additionalData.youtube && (
                  <iframe
                    title="YouTube Video"
                    width="530"
                    height="315"
                    src={launchpadInfo.info.additionalData.youtube}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </CardContent>
            </Card>
            <Card style={{ marginTop: '10px' }}>
              <CardContent>
                <Contributions launchpadInfo={launchpadInfo} fetchLaunchpadInfo={fetchLaunchpadInfo} />
              </CardContent>
            </Card>
          </Grid>
          <Card>
            <CardContent>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black', paddingTop: '10px' }}>
                  Presale Address:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black', paddingTop: '10px' }}>
                  {launchpadInfo.address}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Token Address:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {launchpadInfo.info.tokenContract}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Token Name:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {launchpadInfo.info.tokenName}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Token Supply:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {Number(launchpadInfo.info.tokenSupply) / 10 ** 18} {launchpadInfo.info.tokenSymbol}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Token to Sale:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {((Number(launchpadInfo.info.rates[0]) / 10 ** 18) * Number(launchpadInfo.info.caps[1])) / 10 ** 18}{' '}
                  {launchpadInfo.info.tokenSymbol}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Token for liquidity:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {((Number(launchpadInfo.info.rates[1]) / 10 ** 18 / 100) *
                    Number(launchpadInfo.info.liquidityPercent) *
                    Number(launchpadInfo.info.caps[1])) /
                    10 ** 18}{' '}
                  {launchpadInfo.info.tokenSymbol}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Token Price:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {Number(launchpadInfo.info.rates[0]) / 10 ** 18} {launchpadInfo.info.tokenSymbol} per{currencyText}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Token Listing:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {Number(launchpadInfo.info.rates[1]) / 10 ** 18} {launchpadInfo.info.tokenSymbol} per{currencyText}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  SoftCap:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {Number(launchpadInfo.info.caps[0]) / 10 ** 18} {currencyText}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  HardCap:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {Number(launchpadInfo.info.caps[1]) / 10 ** 18} {currencyText}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Min Buy:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {Number(launchpadInfo.info.contributions[0]) / 10 ** 18} {currencyText} {/* Corrected typo here */}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Max Buy:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {Number(launchpadInfo.info.contributions[1]) / 10 ** 18} {currencyText} {/* Corrected typo here */}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Sale start:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {new Date(Number(launchpadInfo.info.times[0]) * 1000).toLocaleString()}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Sale End:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {new Date(Number(launchpadInfo.info.times[1]) * 1000).toLocaleString()}
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Liquidity:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {Number(launchpadInfo.info.liquidityPercent)} %
                </Typography>
              </CapsDiv>
              <CapsDiv>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  Lock Time:
                </Typography>
                <Typography style={{ fontSize: '16px', fontFamily: 'Bahnschrift', color: 'black' }}>
                  {Number(launchpadInfo.info.liquidityLockup)} Days
                </Typography>
              </CapsDiv>
            </CardContent>
          </Card>
          <Grid item xs={12}>
            <Admin launchpadInfo={launchpadInfo} fetchLaunchpadInfo={fetchLaunchpadInfo} />
            <AdminOnly launchpadInfo={launchpadInfo} fetchLaunchpadInfo={fetchLaunchpadInfo}/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default PublicSaleDetail
