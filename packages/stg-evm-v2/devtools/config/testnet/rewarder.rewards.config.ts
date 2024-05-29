import { RewardTokenName, TokenName } from '@stargatefinance/stg-definitions-v2'

import { OmniGraphHardhat, createGetHreByEid } from '@layerzerolabs/devtools-evm-hardhat'
import { EndpointId } from '@layerzerolabs/lz-definitions'

import { createGetLPTokenAddresses, createGetRewardTokenAddresses } from '../../../ts-src/utils/util'
import { RewarderRewardsNodeConfig } from '../../src/rewarder'

import { onArb, onBsc, onEth, onOpt } from './utils'

const contract = { contractName: 'StargateMultiRewarder' }

export default async (): Promise<OmniGraphHardhat<RewarderRewardsNodeConfig, unknown>> => {
    // First let's create the HardhatRuntimeEnvironment objects for all networks
    const getEnvironment = createGetHreByEid()

    const rewardTokens = [RewardTokenName.MOCK_A] as const
    const getRewardTokenAddresses = createGetRewardTokenAddresses(getEnvironment)
    const ethRewardTokenAddresses = await getRewardTokenAddresses(EndpointId.SEPOLIA_V2_TESTNET, rewardTokens)
    const bscRewardTokenAddresses = await getRewardTokenAddresses(EndpointId.BSC_V2_TESTNET, rewardTokens)
    const optRewardTokenAddresses = await getRewardTokenAddresses(EndpointId.OPTSEP_V2_TESTNET, rewardTokens)
    const arbRewardTokenAddresses = await getRewardTokenAddresses(EndpointId.ARBSEP_V2_TESTNET, rewardTokens)

    const allAssets = [TokenName.USDT, TokenName.USDC, TokenName.ETH] as const
    const getLPTokenAddresses = createGetLPTokenAddresses(getEnvironment)
    const ethLPTokenAddresses = await getLPTokenAddresses(EndpointId.SEPOLIA_V2_TESTNET, allAssets)
    const bscLPTokenAddresses = await getLPTokenAddresses(EndpointId.BSC_V2_TESTNET, [TokenName.USDT] as const)
    const optLPTokenAddresses = await getLPTokenAddresses(EndpointId.OPTSEP_V2_TESTNET, allAssets)
    const arbLPTokenAddresses = await getLPTokenAddresses(EndpointId.ARBSEP_V2_TESTNET, allAssets)

    // 1e18 reward per second
    const DEFAULT_REWARDS_CONFIG = {
        amount: BigInt(2419200000000000000000000000n),
        start: Math.round(Date.now() / 1000) + 100, // add 100 so start is in the future
        duration: 2419200000, // 28 days in seconds
    }

    return {
        contracts: [
            {
                contract: onEth(contract),
                config: {
                    rewards: {
                        rewardToken: ethRewardTokenAddresses.MOCK_A,
                        ...DEFAULT_REWARDS_CONFIG,
                    },
                },
            },
            {
                contract: onBsc(contract),
                config: {
                    rewards: {
                        rewardToken: bscRewardTokenAddresses.MOCK_A,
                        ...DEFAULT_REWARDS_CONFIG,
                    },
                },
            },
            {
                contract: onOpt(contract),
                config: {
                    rewards: {
                        rewardToken: optRewardTokenAddresses.MOCK_A,
                        ...DEFAULT_REWARDS_CONFIG,
                    },
                },
            },
            {
                contract: onArb(contract),
                config: {
                    rewards: {
                        rewardToken: arbRewardTokenAddresses.MOCK_A,
                        ...DEFAULT_REWARDS_CONFIG,
                    },
                },
            },
        ],
        connections: [],
    }
}
