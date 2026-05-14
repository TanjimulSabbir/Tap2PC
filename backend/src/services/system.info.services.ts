import si from "systeminformation";

export const getSystemInfo = async () => {
    const [
        battery,
        cpu,
        os,
        networkInterfaces,
        disk,
        mem,
        currentLoad
    ] = await Promise.all([
        si.battery(),
        si.cpu(),
        si.osInfo(),
        si.networkInterfaces(),
        si.diskLayout(),
        si.mem(),
        si.currentLoad()
    ]);

    const time = si.time();

    const primaryNetwork = networkInterfaces.find(n => n.default) || networkInterfaces[0];

    return {
        os: {
            platform: os.platform,
            distro: os.distro,
            release: os.release,
            arch: os.arch,
            hostname: os.hostname,
        },

        // ⚡ CPU Info
        cpu: {
            brand: cpu.brand,
            cores: cpu.cores,
            physicalCores: cpu.physicalCores,
            speed: cpu.speed
        },

        // 📊 CPU Usage (live feel)
        cpuUsage: {
            currentLoad: currentLoad.currentLoad,
            user: currentLoad.currentLoadUser,
            system: currentLoad.currentLoadSystem
        },

        // 🧠 Memory (dashboard friendly)
        memory: {
            total: mem.total,
            used: mem.used,
            free: mem.free,
            usagePercent: (mem.used / mem.total) * 100
        },

        battery: battery.hasBattery
            ? {
                percent: battery.percent,
                isCharging: battery.isCharging,
                timeRemaining: battery.timeRemaining
            }
            : null,

        // 🌐 Network (simplified)
        network: {
            iface: primaryNetwork?.iface,
            ip4: primaryNetwork?.ip4,
            mac: primaryNetwork?.mac,
            internal: primaryNetwork?.internal
        },

        // 💾 Disk (lightweight)
        disk: disk.map(d => ({
            device: d.device,
            type: d.type,
            size: d.size
        })),

        // ⏱ Time
        time: {
            current: time.current,
            uptime: si.time().uptime,
            timezone: time.timezone
        }
    };
};