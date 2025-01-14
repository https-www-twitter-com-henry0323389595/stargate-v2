import { TokenName } from '@stargatefinance/stg-definitions-v2'

import { OmniGraphHardhat, createGetHreByEid } from '@layerzerolabs/devtools-evm-hardhat'
import { EndpointId } from '@layerzerolabs/lz-definitions'

import { createGetAssetAddresses } from '../../../../ts-src/utils/util'
import { getSafeAddress } from '../../utils'
import {
    onArb,
    onAurora,
    onAvax,
    onBase,
    onBsc,
    onEbi,
    onEth,
    onKava,
    onKlaytn,
    onMantle,
    onMetis,
    onOpt,
    onPolygon,
    onRarible,
    onScroll,
    onZkConsensys,
} from '../utils'

import type { TreasurerNodeConfig } from '../../../src/treasurer'

const contract = { contractName: 'Treasurer' }

export default async (): Promise<OmniGraphHardhat<TreasurerNodeConfig, unknown>> => {
    // First let's create the HardhatRuntimeEnvironment objects for all networks
    const getEnvironment = createGetHreByEid()

    // Named accounts retrieval
    const arbAdmin = getSafeAddress(EndpointId.ARBITRUM_V2_MAINNET)
    const auroraAdmin = getSafeAddress(EndpointId.AURORA_V2_MAINNET)
    const avaxAdmin = getSafeAddress(EndpointId.AVALANCHE_V2_MAINNET)
    const baseAdmin = getSafeAddress(EndpointId.BASE_V2_MAINNET)
    const bscAdmin = getSafeAddress(EndpointId.BSC_V2_MAINNET)
    const ebiAdmin = getSafeAddress(EndpointId.EBI_V2_MAINNET)
    const ethAdmin = getSafeAddress(EndpointId.ETHEREUM_V2_MAINNET)
    const kavaAdmin = getSafeAddress(EndpointId.KAVA_V2_MAINNET)
    const klaytnAdmin = getSafeAddress(EndpointId.KLAYTN_V2_MAINNET)
    const mantleAdmin = getSafeAddress(EndpointId.MANTLE_V2_MAINNET)
    const metisAdmin = getSafeAddress(EndpointId.METIS_V2_MAINNET)
    const optAdmin = getSafeAddress(EndpointId.OPTIMISM_V2_MAINNET)
    const polygonAdmin = getSafeAddress(EndpointId.POLYGON_V2_MAINNET)
    const raribleAdmin = getSafeAddress(EndpointId.RARIBLE_V2_MAINNET)
    const scrollAdmin = getSafeAddress(EndpointId.SCROLL_V2_MAINNET)
    const zkConsensysAdmin = getSafeAddress(EndpointId.ZKCONSENSYS_V2_MAINNET)

    // Now we collect the address of the deployed assets
    const getAssetAddresses = createGetAssetAddresses(getEnvironment)
    const arbAssetAddresses = await getAssetAddresses(EndpointId.ARBITRUM_V2_MAINNET, [
        TokenName.ETH,
        TokenName.USDC,
        TokenName.USDT,
    ] as const)
    const auroraAssetAddresses = await getAssetAddresses(EndpointId.AURORA_V2_MAINNET, [TokenName.USDC] as const)
    const avaxAssetAddresses = await getAssetAddresses(EndpointId.AVALANCHE_V2_MAINNET, [
        TokenName.USDC,
        TokenName.USDT,
    ] as const)
    const baseAssetAddresses = await getAssetAddresses(EndpointId.BASE_V2_MAINNET, [
        TokenName.ETH,
        TokenName.USDC,
    ] as const)
    const bscAssetAddresses = await getAssetAddresses(EndpointId.BSC_V2_MAINNET, [TokenName.USDT] as const)
    const ebiAssetAddresses = await getAssetAddresses(EndpointId.EBI_V2_MAINNET, [TokenName.USDT] as const)
    const ethAssetAddresses = await getAssetAddresses(EndpointId.ETHEREUM_V2_MAINNET, [
        TokenName.ETH,
        TokenName.METIS,
        TokenName.mETH,
        TokenName.USDC,
        TokenName.USDT,
    ] as const)
    const kavaAssetAddresses = await getAssetAddresses(EndpointId.KAVA_V2_MAINNET, [TokenName.USDT] as const)
    const klaytnAssetAddresses = await getAssetAddresses(EndpointId.KLAYTN_V2_MAINNET, [
        TokenName.ETH,
        TokenName.USDC,
        TokenName.USDT,
    ] as const)
    const mantleAssetAddresses = await getAssetAddresses(EndpointId.MANTLE_V2_MAINNET, [
        TokenName.ETH,
        TokenName.mETH,
        TokenName.USDC,
        TokenName.USDT,
    ] as const)
    const metisAssetAddresses = await getAssetAddresses(EndpointId.METIS_V2_MAINNET, [
        TokenName.ETH,
        TokenName.METIS,
        TokenName.USDT,
    ] as const)
    const optAssetAddresses = await getAssetAddresses(EndpointId.OPTIMISM_V2_MAINNET, [
        TokenName.ETH,
        TokenName.USDC,
        TokenName.USDT,
    ] as const)
    const polygonAssetAddresses = await getAssetAddresses(EndpointId.POLYGON_V2_MAINNET, [
        TokenName.USDC,
        TokenName.USDT,
    ] as const)
    const raribleAssetAddresses = await getAssetAddresses(EndpointId.RARIBLE_V2_MAINNET, [
        TokenName.USDC,
        TokenName.USDT,
    ] as const)
    const scrollAssetAddresses = await getAssetAddresses(EndpointId.SCROLL_V2_MAINNET, [
        TokenName.ETH,
        TokenName.USDC,
    ] as const)
    const zkConsensysAssetAddresses = await getAssetAddresses(EndpointId.ZKCONSENSYS_V2_MAINNET, [
        TokenName.ETH,
    ] as const)

    return {
        contracts: [
            {
                contract: onArb(contract),
                config: {
                    owner: arbAdmin,
                    admin: arbAdmin,
                    assets: {
                        [arbAssetAddresses.ETH]: true,
                        [arbAssetAddresses.USDC]: true,
                        [arbAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onAurora(contract),
                config: {
                    owner: auroraAdmin,
                    admin: auroraAdmin,
                    assets: {
                        [auroraAssetAddresses.USDC]: true,
                    },
                },
            },
            {
                contract: onAvax(contract),
                config: {
                    owner: avaxAdmin,
                    admin: avaxAdmin,
                    assets: {
                        [avaxAssetAddresses.USDC]: true,
                        [avaxAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onBase(contract),
                config: {
                    owner: baseAdmin,
                    admin: baseAdmin,
                    assets: {
                        [baseAssetAddresses.ETH]: true,
                        [baseAssetAddresses.USDC]: true,
                    },
                },
            },
            {
                contract: onBsc(contract),
                config: {
                    owner: bscAdmin,
                    admin: bscAdmin,
                    assets: {
                        [bscAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onEbi(contract),
                config: {
                    owner: ebiAdmin,
                    admin: ebiAdmin,
                    assets: {
                        [ebiAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onEth(contract),
                config: {
                    owner: ethAdmin,
                    admin: ethAdmin,
                    assets: {
                        [ethAssetAddresses.ETH]: true,
                        [ethAssetAddresses.METIS]: true,
                        [ethAssetAddresses.mETH]: true,
                        [ethAssetAddresses.USDC]: true,
                        [ethAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onKava(contract),
                config: {
                    owner: kavaAdmin,
                    admin: kavaAdmin,
                    assets: {
                        [kavaAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onKlaytn(contract),
                config: {
                    owner: klaytnAdmin,
                    admin: klaytnAdmin,
                    assets: {
                        [klaytnAssetAddresses.ETH]: true,
                        [klaytnAssetAddresses.USDC]: true,
                        [klaytnAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onMantle(contract),
                config: {
                    owner: mantleAdmin,
                    admin: mantleAdmin,
                    assets: {
                        [mantleAssetAddresses.ETH]: true,
                        [mantleAssetAddresses.mETH]: true,
                        [mantleAssetAddresses.USDC]: true,
                        [mantleAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onMetis(contract),
                config: {
                    owner: metisAdmin,
                    admin: metisAdmin,
                    assets: {
                        [metisAssetAddresses.ETH]: true,
                        [metisAssetAddresses.METIS]: true,
                        [metisAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onOpt(contract),
                config: {
                    owner: optAdmin,
                    admin: optAdmin,
                    assets: {
                        [optAssetAddresses.ETH]: true,
                        [optAssetAddresses.USDC]: true,
                        [optAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onPolygon(contract),
                config: {
                    owner: polygonAdmin,
                    admin: polygonAdmin,
                    assets: {
                        [polygonAssetAddresses.USDC]: true,
                        [polygonAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onRarible(contract),
                config: {
                    owner: raribleAdmin,
                    admin: raribleAdmin,
                    assets: {
                        [raribleAssetAddresses.USDC]: true,
                        [raribleAssetAddresses.USDT]: true,
                    },
                },
            },
            {
                contract: onScroll(contract),
                config: {
                    owner: scrollAdmin,
                    admin: scrollAdmin,
                    assets: {
                        [scrollAssetAddresses.ETH]: true,
                        [scrollAssetAddresses.USDC]: true,
                    },
                },
            },
            {
                contract: onZkConsensys(contract),
                config: {
                    owner: zkConsensysAdmin,
                    admin: zkConsensysAdmin,
                    assets: {
                        [zkConsensysAssetAddresses.ETH]: true,
                    },
                },
            },
        ],
        connections: [],
    }
}
