import { Heading, Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit'

const StatCardContent: React.FC<
  React.PropsWithChildren<{ headingText: string; bodyText: string; highlightColor: string }>
> = ({ headingText, bodyText, highlightColor }) => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmallerScreen = isMobile || isTablet
  const split = headingText.split(' ')
  const lastWord = split.pop()
  const remainingWords = split.slice(0, split.length).join(' ')

  return (
    <Flex
      minHeight={[null, null, null, '60px']}
      minWidth="180px"
      width="fit-content"
      flexDirection="column"
      justifyContent="center"
    >
      {isSmallerScreen && remainingWords.length > 13 ? (
        <Heading scale="lg" textAlign="center">
          {remainingWords}
        </Heading>
      ) : (
        <Heading scale="xl">{remainingWords}</Heading>
      )}
      <Heading color="#353547" textAlign="center" scale="xl" mb="24px">
        {lastWord}
      </Heading>
      <Text textAlign="center" color="textSubtle">
        {bodyText}
      </Text>
    </Flex>
  )
}

export default StatCardContent
