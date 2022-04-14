import { MagicUserMetadata } from 'magic-sdk';
import { PlayersMe } from './../interfaces/api/PlayersMe';

export type UserContextType = {

    playerProfile: PlayersMe | null;
    user: MagicUserMetadata | null;
    completedSteps: number[]
    setPlayerProfile: (playerProfile: PlayersMe | null) => void;
    setUser: (user: MagicUserMetadata | null) => void;
    setCompletedSteps: (completedSteps: number[]) => void;
    
}
