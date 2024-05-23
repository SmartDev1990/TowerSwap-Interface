import { Svg, SvgProps } from '@pancakeswap/uikit'

const PartnerLogo1: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 300 100" {...props}>
      <image width="300" height="100" href="https://i.ibb.co.com/KxSMhLL/Magic.png" />
    </Svg>
  )
}

export default PartnerLogo1
