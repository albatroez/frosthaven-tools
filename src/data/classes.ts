export const allClasses = {
    BB: { name: "Blinkblade" },
    BN: { name: "Banner Spear" },
    BO: { name: "Boneshaper" },
    CR: { name: "Crashing Tide" },
    DF: { name: "Drifter" },
    DT: { name: "" },
    DW: { name: "Deathwalker" },
    FF: { name: "Frozen Fist" },
    GE: { name: "Geminate" },
    HV: { name: "HIVE" },
    IF: { name: "" },
    ME: { name: "" },
    PC: { name: "" },
    PY: { name: "" },
    SD: { name: "" },
    SH: { name: "" },
    TA: { name: "Trapper" },
} as const;

export type ClassesEnum = keyof typeof allClasses