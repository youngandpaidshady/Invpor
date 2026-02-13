/**
 * Crypto Wallet Configuration
 * 
 * These are the receiving wallet addresses for crypto payments.
 * In production, replace these with your actual wallet addresses
 * or load from environment variables.
 */

export interface CryptoWallet {
    symbol: string;
    name: string;
    color: string;
    networks: {
        id: string;
        name: string;
        address: string;
        memo?: string; // For chains that require a memo/tag
        confirmations: number;
        estimatedTime: string;
    }[];
}

export const CRYPTO_WALLETS: CryptoWallet[] = [
    {
        symbol: "BTC",
        name: "Bitcoin",
        color: "#F7931A",
        networks: [
            {
                id: "btc",
                name: "Bitcoin Network",
                address: process.env.NEXT_PUBLIC_BTC_ADDRESS || "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
                confirmations: 2,
                estimatedTime: "10-30 min",
            },
        ],
    },
    {
        symbol: "ETH",
        name: "Ethereum",
        color: "#627EEA",
        networks: [
            {
                id: "erc20",
                name: "ERC-20",
                address: process.env.NEXT_PUBLIC_ETH_ADDRESS || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
                confirmations: 12,
                estimatedTime: "2-5 min",
            },
        ],
    },
    {
        symbol: "USDT",
        name: "Tether",
        color: "#26A17B",
        networks: [
            {
                id: "erc20",
                name: "ERC-20",
                address: process.env.NEXT_PUBLIC_USDT_ERC20_ADDRESS || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
                confirmations: 12,
                estimatedTime: "2-5 min",
            },
            {
                id: "trc20",
                name: "TRC-20",
                address: process.env.NEXT_PUBLIC_USDT_TRC20_ADDRESS || "TN2YqTv5VwvCMLXBNwWRmpGMrdEBkHXmqF",
                confirmations: 20,
                estimatedTime: "1-3 min",
            },
        ],
    },
    {
        symbol: "USDC",
        name: "USD Coin",
        color: "#2775CA",
        networks: [
            {
                id: "erc20",
                name: "ERC-20",
                address: process.env.NEXT_PUBLIC_USDC_ERC20_ADDRESS || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
                confirmations: 12,
                estimatedTime: "2-5 min",
            },
            {
                id: "trc20",
                name: "TRC-20",
                address: process.env.NEXT_PUBLIC_USDC_TRC20_ADDRESS || "TN2YqTv5VwvCMLXBNwWRmpGMrdEBkHXmqF",
                confirmations: 20,
                estimatedTime: "1-3 min",
            },
        ],
    },
    {
        symbol: "SOL",
        name: "Solana",
        color: "#9945FF",
        networks: [
            {
                id: "sol",
                name: "Solana Network",
                address: process.env.NEXT_PUBLIC_SOL_ADDRESS || "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
                confirmations: 1,
                estimatedTime: "< 1 min",
            },
        ],
    },
    {
        symbol: "LTC",
        name: "Litecoin",
        color: "#BFBBBB",
        networks: [
            {
                id: "ltc",
                name: "Litecoin Network",
                address: process.env.NEXT_PUBLIC_LTC_ADDRESS || "ltc1qhek508k7m7sa5pvmqzaulqxw2nk5ahfygrjfzq",
                confirmations: 6,
                estimatedTime: "5-15 min",
            },
        ],
    },
];

export const CRYPTO_DISCOUNT_PERCENT = 5;

export function getWallet(symbol: string): CryptoWallet | undefined {
    return CRYPTO_WALLETS.find((w) => w.symbol === symbol);
}

export function getWalletAddress(symbol: string, networkId: string): string | undefined {
    const wallet = getWallet(symbol);
    if (!wallet) return undefined;
    const network = wallet.networks.find((n) => n.id === networkId);
    return network?.address;
}
