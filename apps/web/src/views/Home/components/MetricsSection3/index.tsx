import React from 'react';
import styled from 'styled-components';
import { Card, Heading, Flex, Button, NextLinkFromReactRouter } from '@pancakeswap/uikit';
import { useTranslation } from '@pancakeswap/localization';
import useTheme from 'hooks/useTheme';
import IconCard from '../IconCard';
import StatCardContent from './StatCardContent';


const CustomStyledButton = styled(Button)`
  background-color: #009454;
  color: white;
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px 30px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #4caf50;
  }
`;

const StyledImage = styled.img`
  width: 60%;
  height: auto;
  overflow: hidden;
  position: relative;
  top: -50%;
`;

const StyledFeaturesHeading = styled(Heading)`
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 50px;
    height: 1px;
    background-color: #290606;
  }

  &::before {
    left: -60px;
  }

  &::after {
    right: -60px;
  }
`;

const cardData = [
  {
    imageUrl: 'https://cdn3d.iconscout.com/3d/premium/thumb/chart-analysis-8421887-6629650.png',
    title: 'Trading',
    description: 'Core functionality of decentralized exchange. Exchange cryptocurrencies seamlessly.',
    buttonText: 'Start Trading',
    route: '/swap',
    icon:'',
  },
  {
    imageUrl: 'https://t4.ftcdn.net/jpg/05/22/90/19/360_F_522901901_E8gJ6qd6s3Tg9zdUY0kI82hfui8sdSXM.png',
    title: 'Earning',
    description: 'Earn feature encompasses Staking and Farming, maximizing returns on cryptocurrencies.',
    buttonText: 'Start Earning',
    route: '/farms',
    icon:'',
  },
  {
    imageUrl: 'https://www.turnkeytown.com/img/ido-launchpad-development-multichain/banner-img.webp?f=webp',
    title: 'LaunchPad',
    description: 'Tower Launchpad feature facilitates the launch of new cryptocurrency projects.',
    buttonText: 'Launch Now',
    route: 'https://launch.towerswap.finance',
    icon:'',
  },
  {
    imageUrl: 'https://cdn3d.iconscout.com/3d/premium/thumb/nft-marketplace-5596112-4668614.png?f=webp',
    title: 'MarketPlace',
    description: 'Tower MarketPlace is decentralized martketplace for trading, buying, and selling NFTs.',
    buttonText: 'Explore Marketplace',
    route: '/nfts',
    icon:'',
  },
];

const Stats = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <StyledFeaturesHeading textAlign="center" color="#000000" scale="xl" mb="32px">
        {t('FEATURES')}
      </StyledFeaturesHeading>
      <Flex flexDirection={['column', null, null, 'row']}>
        {cardData.map((card, index) => (
          <IconCard
            icon={card.icon}
            key={index}
            mr={[null, null, null, '16px']}
            mb={['16px', null, null, index === cardData.length - 1 ? '0' : '16px']}
          >
            <Flex alignItems="center" justifyContent="center" flexDirection="column" height="100%">
              <StyledImage src={card.imageUrl} alt="Name Image" />
              <StatCardContent
                headingText={t(card.title)}
                bodyText={t(card.description)}
                highlightColor={theme.colors[index % 2 === 0 ? 'secondary' : 'primary']}
              />
              <NextLinkFromReactRouter to={card.route}>
                <CustomStyledButton>{t(card.buttonText)}</CustomStyledButton>
              </NextLinkFromReactRouter>
            </Flex>
          </IconCard>
        ))}
      </Flex>
    </Flex>
  );
};

export default Stats;
