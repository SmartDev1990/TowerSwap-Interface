import { ReactNode } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Box, CardProps } from '@pancakeswap/uikit'

const StyledCard = styled(Card)<{ background: string; rotation?: string }>`
  height: fit-content;
  padding: 1px;
  box-shadow: 2px 2px 4px 2px #3a535c;

  ${({ theme }) => theme.mediaQueries.md} {
    ${({ rotation }) => (rotation ? `transform: rotate(${rotation});` : '')}
  }
`

const IconWrapper = styled(Box)<{ rotation?: string }>`
  position: absolute;
  top: 24px;
  right: 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    ${({ rotation }) => (rotation ? `transform: rotate(${rotation});` : '')}
  }
`

interface PartnerCardProps extends PartnerCardData, CardProps {
  children: ReactNode
}

export interface PartnerCardData {
  icon: ReactNode
  background?: string
  borderColor?: string
  rotation?: string
}

const PartnerCard: React.FC<React.PropsWithChildren<PartnerCardProps>> = ({
  icon,
  background,
  borderColor,
  rotation,
  children,
  ...props
}) => {
  return (
    <StyledCard background="white" borderBackground={borderColor} rotation={rotation} {...props}>
      <CardBody>
        <IconWrapper rotation={rotation}>{icon}</IconWrapper>
        {children}
      </CardBody>
    </StyledCard>
  )
}

export default PartnerCard
