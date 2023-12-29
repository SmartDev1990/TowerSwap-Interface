import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import { ethers, utils } from 'ethers'
import Countdown from 'react-countdown'
import { useSigner } from 'wagmi'
import { useAccount } from 'wagmi'
import { useFairsaleAddress } from 'hooks/useContract';
import { useActiveChainId } from 'hooks/useActiveChainId'


const AdminOnly = ({ launchpadInfo, fetchLaunchpadInfo }) => {
  const router = useRouter()
  const { address } = router.query as { address?: string }
  const { address: account } = useAccount()
  const [kycLink, setKYCLink] = useState('')
  const [auditLink, setAuditLink] = useState('')
  const [safuLink, setSAFULink] = useState('')
  const [isOwner, setIsOwner] = useState(false)
  const { data: signer } = useSigner()
  const { chainId } = useActiveChainId()
  const fairSaleContract = useFairsaleAddress(address);

  if (!launchpadInfo || !launchpadInfo.info) {
    return <div>Loading...</div>;
  }

  const handleSetLink = async (linkType, linkValue) => {
    try {

      switch (linkType) {
        case 'KYC':
          await fairSaleContract.setKYCLink().send({ from: account })
          break
        case 'Audit':
          await fairSaleContract.setAuditLink().send({ from: account })
          break
        case 'SAFU':
          await fairSaleContract.setSAFULink().send({ from: account })
          break
        default:
          console.error('Invalid link type')
          return
      }

      const newLink = await fairSaleContract.methods[`get${linkType}Link`]()
      if (typeof newLink === 'string') {
        switch (linkType) {
          case 'KYC':
            setKYCLink(newLink)
            break
          case 'Audit':
            setAuditLink(newLink)
            break
          case 'SAFU':
            setSAFULink(newLink)
            break
          default:
            break
        }
      } else {
        console.error('Invalid link type:', linkType)
      }

    } catch (error) {
      console.error(`Error setting ${linkType} link:`, error)
    }
  }

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const owner: void | [] | (unknown[] & []) = await fairSaleContract.getCreator()
        if (typeof owner === 'string') {
          setIsOwner(owner === account)
        } else {
          setIsOwner(false)
        }
      } catch (error) {
        console.error('Error checking ownership:', error)
      }
    }

    checkOwnership()
  }, [address])

  return (
    <Card style={{ marginTop: '10px', padding: '20px' }}>
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
                Set Link (Only Admin)
              </Typography>
              <Grid item xs={12} style={{ marginBottom: '10px' }}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <TextField
                    label="KYC Link"
                    variant="outlined"
                    value={kycLink}
                    onChange={(e) => setKYCLink(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={() => handleSetLink('KYC', kycLink)}>
                    KYC Link
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '10px' }}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <TextField
                    label="Audit Link"
                    variant="outlined"
                    value={auditLink}
                    onChange={(e) => setAuditLink(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={() => handleSetLink('Audit', auditLink)}>
                    Audit Link
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '10px' }}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <TextField
                    label="SAFU Link"
                    variant="outlined"
                    value={safuLink}
                    onChange={(e) => setSAFULink(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={() => handleSetLink('SAFU', safuLink)}>
                    SAFU Link
                  </Button>
                </form>
              </Grid>
            </>
          </Grid>
        )}
      </div>
    </Card>
  )
}

export default AdminOnly
