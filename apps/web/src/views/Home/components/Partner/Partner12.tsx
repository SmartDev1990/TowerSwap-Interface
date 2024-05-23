import { Svg, SvgProps } from '@pancakeswap/uikit'

const PartnerLogo12: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 300 100" {...props}>
      <image width="300" height="100" href="/images/partner/emmet.png" />
    </Svg>
  )
}

export default PartnerLogo12
