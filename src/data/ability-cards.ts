import { BB, BN, BO, CR, DF, DT, DW, FF, GE, HV, IF, ME, PC, PY, SD, SH, TA } from "./abilityCards";

export const abilityCards = {
    BB: BB,
    BN: BN,
    BO: BO,
    CR: CR,
    DF: DF,
    DT: DT,
    DW: DW,
    FF: FF,
    GE: GE,
    HV: HV,
    IF: IF,
    ME: ME,
    PC: PC,
    PY: PY,
    SD: SD,
    SH: SH,
    TA: TA,
};
export type AbilityCards = typeof abilityCards;
type classes = keyof AbilityCards;
export type aCard = AbilityCards[classes][number];
export type AbilityCard = Pick<aCard, keyof (typeof BB)[number]>;
