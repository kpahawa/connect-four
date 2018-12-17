export enum PlayerEnum {
    NO_PLAYER = 0,
    PLAYER_1 = 1,
    PLAYER_2 = 2
}

export function getPlayer(num: number) {
    switch(num) {
        case 0: return PlayerEnum.NO_PLAYER;
        case 1: return PlayerEnum.PLAYER_1;
        case 2: return PlayerEnum.PLAYER_2;
    }
    throw Error("invalid player token given");
}