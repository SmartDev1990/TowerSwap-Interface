import { useState } from 'react'
import { request, gql } from 'graphql-request'
import { bscRpcProvider } from 'utils/providers'
import { GRAPH_HEALTH } from 'config/constants/endpoints'
import { useSlowRefreshEffect } from './useRefreshEffect'

export enum SubgraphStatus {
  OK,
  WARNING,
  NOT_OK,
  UNKNOWN,
}

export type SubgraphHealthState = {
  status: SubgraphStatus
  currentBlock: number
  chainHeadBlock: number
  latestBlock: number
  blockDifference: number
}

const NOT_OK_BLOCK_DIFFERENCE = 200 // ~15 minutes delay
const WARNING_BLOCK_DIFFERENCE = 50 // ~2.5 minute delay

interface IndexingStatus {
  health: string;
  chains: {
    chainHeadBlock: {
      number: string;
    };
    latestBlock: {
      number: string;
    };
  }[];
}

interface SubgraphResponse {
  indexingStatusForCurrentVersion: IndexingStatus;
}

const useSubgraphHealth = (subgraphName: string) => {
  const [sgHealth, setSgHealth] = useState<SubgraphHealthState>({
    status: SubgraphStatus.UNKNOWN,
    currentBlock: 0,
    chainHeadBlock: 0,
    latestBlock: 0,
    blockDifference: 0,
  });

  useSlowRefreshEffect(
    async (currentBlockNumber) => {
      try {
        const [{ indexingStatusForCurrentVersion }, currentBlock] = await Promise.all([
          request<SubgraphResponse>(
            GRAPH_HEALTH,
            gql`
              query getNftMarketSubgraphHealth {
                indexingStatusForCurrentVersion(subgraphName: "${subgraphName}") {
                  health
                  chains {
                    chainHeadBlock {
                      number
                    }
                    latestBlock {
                      number
                    }
                  }
                }
              }
            `,
          ),
          currentBlockNumber ? Promise.resolve(currentBlockNumber) : bscRpcProvider.getBlockNumber(),
        ]);

        // ... (your existing code)

      } catch (error) {
        console.error(`Failed to perform health check for ${subgraphName} subgraph`, error);
      }
    },
    [subgraphName],
  );


  return sgHealth;
};

export default useSubgraphHealth;
