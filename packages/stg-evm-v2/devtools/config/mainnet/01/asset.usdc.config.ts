import { TokenName } from '@stargatefinance/stg-definitions-v2'

import { type OmniGraphHardhat } from '@layerzerolabs/devtools-evm-hardhat'
import { EndpointId } from '@layerzerolabs/lz-definitions'

import { createGetAssetNode, createGetAssetOmniPoint, getDefaultAddressConfig } from '../../../src/asset/utils'
import { generateAssetConfig } from '../../utils'

import { DEFAULT_PLANNER } from './constants'

import type { AssetEdgeConfig, AssetNodeConfig } from '../../../src/asset'

const tokenName = TokenName.USDC

const getAssetPoint = createGetAssetOmniPoint(tokenName)
const getAddressConfig = getDefaultAddressConfig(tokenName, { planner: DEFAULT_PLANNER })

export default async (): Promise<OmniGraphHardhat<AssetNodeConfig, AssetEdgeConfig>> => {
    const getAssetNode = createGetAssetNode(tokenName, undefined, undefined, getAddressConfig)

    // Now we define all the contracts
    const arbPoint = getAssetPoint(EndpointId.ARBITRUM_V2_MAINNET)
    const auroraPoint = getAssetPoint(EndpointId.AURORA_V2_MAINNET)
    const avaxPoint = getAssetPoint(EndpointId.AVALANCHE_V2_MAINNET)
    const basePoint = getAssetPoint(EndpointId.BASE_V2_MAINNET)
    const ethPoint = getAssetPoint(EndpointId.ETHEREUM_V2_MAINNET)
    const klaytnPoint = getAssetPoint(EndpointId.KLAYTN_V2_MAINNET)
    const mantlePoint = getAssetPoint(EndpointId.MANTLE_V2_MAINNET)
    const optPoint = getAssetPoint(EndpointId.OPTIMISM_V2_MAINNET)
    const polygonPoint = getAssetPoint(EndpointId.POLYGON_V2_MAINNET)
    const rariblePoint = getAssetPoint(EndpointId.RARIBLE_V2_MAINNET)
    const scrollPoint = getAssetPoint(EndpointId.SCROLL_V2_MAINNET)

    // And all their nodes
    const arbContract = await getAssetNode(arbPoint)
    const auroraContract = await getAssetNode(auroraPoint)
    const avaxContract = await getAssetNode(avaxPoint)
    const baseContract = await getAssetNode(basePoint)
    const ethContract = await getAssetNode(ethPoint)
    const klaytnContract = await getAssetNode(klaytnPoint)
    const mantleContract = await getAssetNode(mantlePoint)
    const optContract = await getAssetNode(optPoint)
    const polygonContract = await getAssetNode(polygonPoint)
    const raribleContract = await getAssetNode(rariblePoint)
    const scrollContract = await getAssetNode(scrollPoint)

    return {
        contracts: [
            arbContract,
            auroraContract,
            avaxContract,
            baseContract,
            ethContract,
            klaytnContract,
            mantleContract,
            optContract,
            polygonContract,
            raribleContract,
            scrollContract,
        ],
        connections: generateAssetConfig(tokenName, [
            arbPoint,
            auroraPoint,
            avaxPoint,
            basePoint,
            ethPoint,
            klaytnPoint,
            mantlePoint,
            optPoint,
            polygonPoint,
            rariblePoint,
            scrollPoint,
        ]),
    }
}
