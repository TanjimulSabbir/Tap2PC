export type SystemPartialInfo = {
    os: {
        platform: "win32" | "linux" | "darwin";
        distro: string;
        release: string;
        arch: string;
        hostname: string;
        uptime: number;
    };

    cpu: {
        brand: string;
        cores: number;
        physicalCores: number;
        speed: number;
    };

    memory: {
        total: number;
        used: number;
        free: number;
        usagePercent: number;
    };

    cpuUsage: number;

    network: {
        ip: string;
        mac: string;
        iface: string;
    };

    time: {
        current: number;
        timezone: string;
    };
};