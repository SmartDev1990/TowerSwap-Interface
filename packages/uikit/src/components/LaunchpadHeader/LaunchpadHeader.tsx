import styled from "styled-components";
import { Box } from "../Box";
import Container from "../Layouts/Container";
import { LaunchpadHeaderProps } from "./types";

const Outer = styled(Box)<{ background?: string }>`
  background-image: url(./images/launchpadBanner.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`;

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
  position: relative;
`;

const LaunchpadHeader: React.FC<React.PropsWithChildren<LaunchpadHeaderProps>> = ({
  background,
  children,
  ...props
}) => (
  <Outer background={background} {...props}>
    <Inner>{children}</Inner>
  </Outer>
);

export default LaunchpadHeader;
