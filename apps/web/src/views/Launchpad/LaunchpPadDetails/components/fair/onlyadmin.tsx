import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, Button, Grid, LinearProgress, Box, TextField } from '@mui/material'
import { ethers } from 'ethers'
import FairSale from '../../../LaunchPadList/Abis/FairSale.json'
import Countdown from 'react-countdown'
import { useSigner } from 'wagmi'

const AdminOnly = () => {
  const router = useRouter()
  const { address } = router.query as { address?: string }
  const [kycLink, setKYCLink] = useState('')
  const [auditLink, setAuditLink] = useState('')
  const [safuLink, setSAFULink] = useState('')
  const [launchpadInfo, setLaunchpadInfo] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [linkType, setLinkType] = useState('') // Add state for linkType
  const [linkValue, setLinkValue] = useState('')
  const { data: signer } = useSigner()

  const fetchLaunchpadInfo = async (linkType, linkValue) => {
    try {
      const publicSaleContract = new ethers.Contract(address, FairSale.abi)
      const contributions = await publicSaleContract.getContributions()
      const totalBNBContributed = await publicSaleContract.getTotalBNBContributed()
      const participantNumber = await publicSaleContract.getNumberOfParticipants()

      setLaunchpadInfo({
        address,
        info: {
          contributions,
          totalBNBContributed,
          participantNumber,
        },
      })

      switch (linkType) {
        case 'KYC':
          await publicSaleContract.setKYCLink().send({ from: signer })
          break
        case 'Audit':
          await publicSaleContract.setAuditLink().send({ from: signer })
          break
        case 'SAFU':
          await publicSaleContract.setSAFULink().send({ from: signer })
          break
        default:
          console.error('Invalid link type')
          return
      }

      const newLink = await publicSaleContract.methods[`get${linkType}Link`]()
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
      console.error(`Error fetching launchpad info for address ${address}:`, error)
    }
  }

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const publicSaleContract = new ethers.Contract(address, FairSale.abi)

        // Check if the connected account is the owner
        const owner: void | [] | (unknown[] & []) = await publicSaleContract.getCreator()

        // Add a type check for owner
        if (typeof owner === 'string') {
          setIsOwner(owner === signer)
        } else {
          setIsOwner(false) // or handle other cases
        }
      } catch (error) {
        console.error('Error checking ownership:', error)
      }
    }

    checkOwnership()
    fetchLaunchpadInfo(linkType, linkValue)
  }, [address, linkType, linkValue])

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
                  <Button variant="contained" onClick={() => fetchLaunchpadInfo('KYC', kycLink)}>
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
                  <Button variant="contained" onClick={() => fetchLaunchpadInfo('Audit', auditLink)}>
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
                  <Button variant="contained" onClick={() => fetchLaunchpadInfo('SAFU', safuLink)}>
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
