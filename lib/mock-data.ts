
export interface UserState {
    profile: {
        name: string;
        email: string;
        avatarInitials: string;
        joinDate: string;
    };
    account: {
        status: "challenge" | "verification" | "funded";
        phaseName: string; // e.g., "Phase 1", "Phase 2", "Funded Trader"
        accountSize: number;
        balance: number;
        equity: number;
        accountNumber: string;
    };
    kyc: {
        status: "not_started" | "pending" | "verified" | "rejected";
    };
    stats: {
        dailyPnL: number;
        dailyPnLPercent: number;
        totalPnL: number;
        winRate: number;
        tradesTaken: number;
    };
}

export const MOCK_USER_STATE: UserState = {
    profile: {
        name: "Alex Trader",
        email: "alex@example.com",
        avatarInitials: "AT",
        joinDate: "2023-10-15",
    },
    account: {
        status: "challenge", // Default to Challenge phase
        phaseName: "Student (Phase 1)",
        accountSize: 10000,
        balance: 10000,
        equity: 10000,
        accountNumber: "20248492",
    },
    kyc: {
        status: "not_started",
    },
    stats: {
        dailyPnL: 0,
        dailyPnLPercent: 0.0,
        totalPnL: 0,
        winRate: 0,
        tradesTaken: 0,
    },
};

// Helper to simulate "Funded" state for dev toggling
export const MOCK_FUNDED_STATE: UserState = {
    ...MOCK_USER_STATE,
    account: {
        status: "funded",
        phaseName: "Professional",
        accountSize: 100000,
        balance: 104250.50,
        equity: 104250.50,
        accountNumber: "99887766",
    },
    kyc: {
        status: "verified",
    },
    stats: {
        dailyPnL: 1250.50,
        dailyPnLPercent: 1.2,
        totalPnL: 4250.50,
        winRate: 68,
        tradesTaken: 42,
    },
};
