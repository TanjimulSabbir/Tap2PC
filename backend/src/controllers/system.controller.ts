import type { Request, Response } from "express";
import { runCommand } from "../services/command.services";
import { sendToPC } from "../websocket/ws";
import { wakePC } from "../services/wol.services";



export const shutdown = async (_req: Request, res: Response) => {
    await runCommand("shutdown now");
    res.send("Shutdown");
};

export const restart = async (_req: Request, res: Response) => {
    await runCommand("reboot");
    res.send("Restart");
};

export const lock = async (_req: Request, res: Response) => {
    await runCommand("loginctl lock-session");
    res.send("Locked");
};

export const sleep = async (_req: Request, res: Response) => {
    await runCommand("systemctl suspend");
    res.send("Sleeping");
};

export const screenOn = (_req: Request, res: Response) => {
    sendToPC("screen-on");
    wakePC();
    res.json({ success: true });
};