import { dirname, join } from 'path'

import { configDotenv } from 'dotenv'

// Configure the environment variables
configDotenv({
    path: ['.env.local', '.env'],
})

import { EndpointId } from '@layerzerolabs/lz-definitions'

import { getSafeConfig } from './devtools/config/utils'

import type { HDAccountsUserConfig, HardhatUserConfig, NetworksUserConfig } from 'hardhat/types'

import '@nomiclabs/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import '@nomiclabs/hardhat-etherscan'
import '@matterlabs/hardhat-zksync-solc'
import '@matterlabs/hardhat-zksync-deploy'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'hardhat-gas-reporter'
import 'hardhat-contract-sizer'
import 'hardhat-spdx-license-identifier'
import 'solidity-coverage'

import '@layerzerolabs/toolbox-hardhat'

import '@typechain/hardhat'

// Devtools-specific tasks
import './devtools/tasks'

const v1Deployments = join(dirname(require.resolve('@stargatefinance/stg-evm-v1/package.json')), 'deployments')

const sandboxAccounts: HDAccountsUserConfig = {
    mnemonic:
        process.env.MNEMONIC_SANDBOX ||
        process.env.MNEMONIC ||
        'test test test test test test test test test test test junk',
    count: 300,
}

const testnetAccounts: HDAccountsUserConfig = {
    mnemonic: process.env.MNEMONIC_TESTNET || process.env.MNEMONIC || '',
}

const mainnetAccounts: HDAccountsUserConfig = {
    mnemonic: process.env.MNEMONIC_MAINNET || process.env.MNEMONIC || '',
}

const hardhatNamedAccounts: HardhatUserConfig = {
    namedAccounts: {
        deployer: {
            'ethereum-sandbox-local': '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            'bsc-sandbox-local': '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            'polygon-sandbox-local': '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            default: 0,
        },
        planner: {
            'ethereum-sandbox-local': '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            'bsc-sandbox-local': '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            'polygon-sandbox-local': '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            default: 1,
        },
        treasurer: {
            'ethereum-sandbox-local': '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
            'bsc-sandbox-local': '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
            'polygon-sandbox-local': '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
            default: 2,
        },
        usdcAdmin: {
            default: 3,
        },
    },
}

const networks: NetworksUserConfig = {
    //
    // Localnet
    //
    'bsc-sandbox-local': {
        eid: EndpointId.BSC_V2_SANDBOX,
        isLocalEid: true,
        url: 'http://localhost:8502',
        accounts: sandboxAccounts,
        // We'll include this flag just to have it enabled for one network on sandbox
        useFeeData: true,
    },
    'ethereum-sandbox-local': {
        eid: EndpointId.ETHEREUM_V2_SANDBOX,
        isLocalEid: true,
        url: 'http://localhost:8501',
        accounts: sandboxAccounts,
    },
    'polygon-sandbox-local': {
        eid: EndpointId.POLYGON_V2_SANDBOX,
        isLocalEid: true,
        url: 'http://localhost:8509',
        accounts: sandboxAccounts,
    },

    //
    // Testnet
    //
    'arbsep-testnet': {
        eid: EndpointId.ARBSEP_V2_TESTNET,
        url: process.env.RPC_URL_ARBITRUM_TESTNET || 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
        accounts: testnetAccounts,
        useFeeData: true,
    },
    'bsc-testnet': {
        eid: EndpointId.BSC_V2_TESTNET,
        url: process.env.RPC_URL_BSC_TESTNET || 'https://bsc-testnet-rpc.publicnode.com',
        accounts: testnetAccounts,
    },
    'klaytn-testnet': {
        eid: EndpointId.KLAYTN_V2_TESTNET,
        url: process.env.RPC_URL_KLAYTN_TESTNET || 'https://public-en-baobab.klaytn.net',
        accounts: testnetAccounts,
    },
    'optsep-testnet': {
        eid: EndpointId.OPTSEP_V2_TESTNET,
        url: process.env.RPC_URL_OPTIMISM_TESTNET || 'https://sepolia.optimism.io',
        accounts: testnetAccounts,
    },
    'sepolia-testnet': {
        eid: EndpointId.SEPOLIA_V2_TESTNET,
        url: process.env.RPC_URL_ETHEREUM_TESTNET || 'https://rpc.sepolia.org',
        accounts: testnetAccounts,
    },

    //
    // Mainnet
    //
    'arbitrum-mainnet': {
        eid: EndpointId.ARBITRUM_V2_MAINNET,
        url: process.env.RPC_URL_ARBITRUM_MAINNET || 'https://rpc.ankr.com/arbitrum',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.ARBITRUM_V2_MAINNET),
        useFeeData: true,
    },
    'aurora-mainnet': {
        eid: EndpointId.AURORA_V2_MAINNET,
        url: process.env.RPC_URL_AURORA_MAINNET || 'https://aurora.drpc.org',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.AURORA_V2_MAINNET),
    },
    'avalanche-mainnet': {
        eid: EndpointId.AVALANCHE_V2_MAINNET,
        url: process.env.RPC_URL_AVALANCHE_MAINNET || 'https://avalanche-c-chain-rpc.publicnode.com',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.AVALANCHE_V2_MAINNET),
    },
    'base-mainnet': {
        eid: EndpointId.BASE_V2_MAINNET,
        url: process.env.RPC_URL_BASE_MAINNET || 'https://base.drpc.org',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.BASE_V2_MAINNET),
    },
    'bsc-mainnet': {
        eid: EndpointId.BSC_V2_MAINNET,
        url: process.env.RPC_URL_BSC_MAINNET || 'https://bsc-rpc.publicnode.com',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.BSC_V2_MAINNET),
    },
    'ebi-mainnet': {
        eid: EndpointId.EBI_V2_MAINNET,
        url: process.env.RPC_URL_EBI_MAINNET || 'https://rpc.ebi.xyz',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.EBI_V2_MAINNET),
    },
    'ethereum-mainnet': {
        eid: EndpointId.ETHEREUM_V2_MAINNET,
        url: process.env.RPC_URL_ETHEREUM_MAINNET || 'https://rpc.ankr.com/eth',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.ETHEREUM_V2_MAINNET),
    },
    'kava-mainnet': {
        eid: EndpointId.KAVA_V2_MAINNET,
        url: process.env.RPC_URL_KAVA_MAINNET || 'https://evm.kava.chainstacklabs.com',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.KAVA_V2_MAINNET),
    },
    'klaytn-mainnet': {
        eid: EndpointId.KLAYTN_V2_MAINNET,
        url: process.env.RPC_URL_KLAYTN_MAINNET || 'https://rpc.ankr.com/klaytn',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.KLAYTN_V2_MAINNET),
    },
    'mantle-mainnet': {
        eid: EndpointId.MANTLE_V2_MAINNET,
        url: process.env.RPC_URL_MANTLE_MAINNET || 'https://mantle.drpc.org',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.MANTLE_V2_MAINNET),
    },
    'metis-mainnet': {
        eid: EndpointId.METIS_V2_MAINNET,
        url: process.env.RPC_URL_METIS_MAINNET || 'https://metis-pokt.nodies.app',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.METIS_V2_MAINNET),
    },
    'optimism-mainnet': {
        eid: EndpointId.OPTIMISM_V2_MAINNET,
        url: process.env.RPC_URL_OPTIMISM_MAINNET || 'https://optimism.drpc.org',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.OPTIMISM_V2_MAINNET),
    },
    'polygon-mainnet': {
        eid: EndpointId.POLYGON_V2_MAINNET,
        url: process.env.RPC_URL_POLYGON_MAINNET || 'https://polygon.meowrpc.com',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.POLYGON_V2_MAINNET),
    },
    'rarible-mainnet': {
        eid: EndpointId.RARIBLE_V2_MAINNET,
        url: process.env.RPC_URL_RARIBLE_MAINNET || 'https://mainnet.rpc.rarichain.org/http',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.RARIBLE_V2_MAINNET),
    },
    'scroll-mainnet': {
        eid: EndpointId.SCROLL_V2_MAINNET,
        url: process.env.RPC_URL_SCROLL_MAINNET || 'https://scroll.drpc.org',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.SCROLL_V2_MAINNET),
    },
    'zkconsensys-mainnet': {
        eid: EndpointId.ZKCONSENSYS_V2_MAINNET,
        url: process.env.RPC_URL_ZKCONSENSYS_MAINNET || 'https://linea.drpc.org',
        accounts: mainnetAccounts,
        safeConfig: getSafeConfig(EndpointId.ZKCONSENSYS_V2_MAINNET),
    },
}

// We'll connect V1 deployments so that we can access them when deploying e.g. zapper
const externalConfig: HardhatUserConfig['external'] = {
    deployments: Object.fromEntries(
        Object.keys(networks).map((networkName) => [networkName, [join(v1Deployments, networkName)]] as const)
    ),
}

const hardhatConfig: Partial<HardhatUserConfig> = {
    defaultNetwork: 'hardhat',
    mocha: {
        timeout: 50000,
    },
    solidity: {
        eraVersion: '1.0.0',
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 5000,
                    },
                },
            },
            {
                version: '0.8.17',
                settings: {
                    viaIR: true,
                    optimizer: {
                        enabled: true,
                        runs: 20000,
                    },
                },
            },
        ],
    },
    zksolc: {
        version: '1.4.1',
        compilerSource: 'binary',
        settings: {
            // See https://github.com/zkSync-Community-Hub/zksync-developers/discussions/218#discussioncomment-7994804
            libraries: {
                // Since we are not deploying USDC on zksync-mainnet, we can safely get around zksolc compiler
                // errors by specifying a zero address for a missing library
                'src/usdc/impl/util/SignatureChecker.sol': {
                    // Testnet one
                    // SignatureChecker: '0xaB9F13d3752f7b68F2A260A066DdE105f52A1f85',
                    // Mainnet one
                    SignatureChecker: '0xfE9034963f90789648aE12E3AE08E0303B0aF2FC',
                },
            },
            optimizer: {
                mode: 'z',
                enabled: true,
            },
        },
    },
    // options for hardhat-spdx-license-identifier
    spdxLicenseIdentifier: {
        overwrite: false,
        runOnCompile: true,
    },
    // options for hardhat-gas-reporter
    gasReporter: {
        currency: 'USD',
        enabled: process.env.REPORT_GAS === 'true',
        excludeContracts: ['contracts/libraries/'],
    },
    // options for @typechain/hardhat
    typechain: {
        outDir: './ts-src/typechain-types',
        target: 'ethers-v5',
        alwaysGenerateOverloads: false,
        dontOverrideCompile: false,
    },
    paths: {
        sources: './src',
        cache: 'cache/hardhat',
    },
    external: externalConfig,
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
    },
}

const hardhatNetworks: Pick<HardhatUserConfig, 'networks'> = {
    networks: {
        localhost: {
            accounts: sandboxAccounts,
        },
        hardhat: {
            accounts: sandboxAccounts,
            blockGasLimit: 30_000_000,
            throwOnCallFailures: false,
        },
        ...networks,
    },
}

const config: HardhatUserConfig = {
    ...hardhatNamedAccounts,
    ...hardhatConfig,
    ...hardhatNetworks,
}

// FIXME What the windows vista is this
if (process.argv[2] !== 'compile') {
    // the following tasks require the contracts to be compiled,
    // so we don't want to load them when compiling
    require('./tasks')
}
export default config
