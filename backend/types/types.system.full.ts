export interface OSInfo {
    platform: string;
    distro: string;
    release: string;
    arch: string;
    hostname: string;
    uptime: number;
}

export interface CPUInfo {
    manufacturer: string;
    brand: string;
    cores: number;
    physicalCores: number;
    speed: number;
    speedMax?: number;
}

export interface CPUUsage {
    avgLoad: number;
    user: number;
    system: number;
}

export interface MemoryInfo {
    total: number;
    used: number;
    free: number;
    active: number;
    available: number;
    usagePercent: number;
}

export interface BatteryInfo {
    hasBattery: boolean;
    percent: number;
    isCharging: boolean;
    timeRemaining: number;
}

export interface NetworkInterfaceInfo {
    name: string;
    ip4: string;
    mac: string;
    internal: boolean;
}

export interface NetworkInfo {
    interfaces: NetworkInterfaceInfo[];
    stats: any; // you can later strongly type this too
}

export interface StorageInfo {
    fs: string;
    size: number;
    used: number;
    usePercent: number;
}

export interface SystemStorage {
    disks: any[]; // systeminformation diskLayout type is complex
    filesystem: StorageInfo[];
}

export interface SystemProcessInfo {
    processes: number;
    running: number;
    sleeping: number;
}

export interface UserInfo {
    user: string;
    tty: string;
    ip: string;
    loginTime: string;
}

export interface TimeInfo {
    current: number;
    uptime: number;
    timezone: string;
    timezoneName: string;
}

export interface SystemFullInfo {
    os: OSInfo;
    cpu: CPUInfo;
    cpuUsage: CPUUsage;
    memory: MemoryInfo;
    battery: BatteryInfo | null;
    network: NetworkInfo;
    storage: SystemStorage;
    system: SystemProcessInfo;
    users: UserInfo[];
    time: TimeInfo;
}