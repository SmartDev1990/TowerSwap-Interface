import { Heading, Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit';

const StatCardContent: React.FC<
  React.PropsWithChildren<{ headingText: string; bodyText: string; highlightColor: string }>
> = ({ headingText, bodyText, highlightColor }) => {
  const { isMobile, isTablet } = useMatchBreakpoints();
  const isSmallerScreen = isMobile || isTablet;
  const split = headingText.split(' ');
  const lastWord = split.pop();
  const remainingWords = split.slice(0, split.length).join(' ');

  return (
    <Flex
      minWidth="220px"
      padding="5px"
      width="fit-content"
      flexDirection="column"
      justifyContent="center" // Center vertically
      alignItems="center" // Center horizontally
    >
      {isSmallerScreen && remainingWords.length > 13 ? (
        <Heading fontSize="24px">{remainingWords}</Heading>
      ) : (
        <Heading fontSize="24px">{remainingWords}</Heading>
      )}
      <Heading color={highlightColor} fontSize="24px" mb="24px">
        {lastWord}
      </Heading>
      <Text color="textSubtle" textAlign="center">
        {bodyText}
      </Text>
    </Flex>
  );
};

export default StatCardContent;
