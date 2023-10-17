export const allClasses = {
    BB: { name: "Blinkblade", maxCards: 10, spoiler: false},
    BN: { name: "Banner Spear", maxCards: 10, spoiler: false },
    BO: { name: "Boneshaper", maxCards: 12, spoiler: false },
    CR: { name: "Crashing Tide", maxCards: 12, spoiler: true },
    DF: { name: "Drifter", maxCards: 12, spoiler: false },
    DT: { name: "Deathwalker", maxCards: 11, spoiler: false },
    DW: { name: "Deepwraith", maxCards: 10, spoiler: true },
    FF: { name: "Frozen Fist", maxCards: 8, spoiler: true },
    GE: { name: "Geminate", maxCards: 14, spoiler: false },
    HV: { name: "HIVE", maxCards: 11, spoiler: true },
    IF: { name: "Infuser", maxCards: 11, spoiler: true },
    ME: { name: "Metal Mosaic", maxCards: 9, spoiler: true },
    PC: { name: "Pain Conduit", maxCards: 10, spoiler: true },
    PY: { name: "Pyroclast", maxCards: 10, spoiler: true },
    SD: { name: "Snowdancer", maxCards: 11, spoiler: true },
    SH: { name: "Shattersong", maxCards: 10, spoiler: true },
    TA: { name: "Trapper", maxCards: 9, spoiler: true },
} as const;

export type ClassesEnum = keyof typeof allClasses;
