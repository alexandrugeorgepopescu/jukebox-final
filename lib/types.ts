export type MusicCategory =
    | 'RETRO_WAVE'
    | 'CHILL_FLOW'
    | 'GOOD_VIBE'
    | 'BASS_MODE'
    | 'SOUL_SELECT'
    | 'MAIN_CHARACTER';

export interface User {
    id: string;
    name: string;
    email?: string;
    coffeePreference?: string;
    musicPreference?: MusicCategory[] | string[];
    nickname?: string;
    birthDate?: string;
    tribeId?: string;
    isTester?: boolean;
}

export interface Song {
    id?: string;
    fullTitle: string;
    artist?: string; // Extracted from fullTitle if needed
    title?: string;
    funMessage: string;
    destinyPrize: string;
    cat: string; // Should match MusicCategory logic
    yt: string;
    spotify: string;
    apple: string;
}

export interface CoffeeItem {
    name: string;
    type: 'hot' | 'cold';
}
