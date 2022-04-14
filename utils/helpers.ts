import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { toast } from 'react-toastify';
import { PlayersMe } from "../interfaces/api/PlayersMe";
import { steps } from "./constants";

export const updateCompleteSteps = (completedSteps: number[], step: number, setCompletedSteps: Function) => {

    if(!completedSteps.includes(step)){
        setCompletedSteps([...completedSteps,step]);
    }
}

export const getNextStep = (completedSteps: number[]) => {

    if(!completedSteps.includes(steps.basicInformation)){
        return "Basic Information";
    }

    if(!completedSteps.includes(steps.connectWallet)){
        return "Connect A Wallet";
    }

    if(!completedSteps.includes(steps.connectTwitter)){
        return "Connect Twitter";
    }

    return "Done";
}

export const getPercentageComplete = (completedSteps: number[]) => {

    if(completedSteps.length === 0) return 0;

    return Number(completedSteps.length/3*100).toFixed(0);
}

export const getCompletedSteps = (userProfile: PlayersMe) => {

    let completedSteps: number[] = [];

    if(userProfile.displayName){
        completedSteps.push(steps.basicInformation);
    }

    if(userProfile.paymentWallet || userProfile.airdropWallet){
        completedSteps.push(steps.connectWallet)
    }

    if(userProfile.twitter){
        completedSteps.push(steps.connectTwitter)
    }

    return completedSteps;
}

export const isProfileReadyForMint = (userProfile: PlayersMe): boolean => {
    return (
        getCompletedSteps(userProfile)?.length === 3 && 
        userProfile.airdropWallet?.address?.length > 0
    );
}

export const showError = (message: string) => {
    toast.error(message);
}
  
export const showInfo = (message: string ) => {
    toast.info(message);
}

export const hasMintPass = async (mintPassAddress: string | undefined, airDropAddress: string | undefined, connection: Connection) => {

    if(mintPassAddress && airDropAddress){

        const mintPublicKey = new PublicKey(mintPassAddress);   
        const airDropAddressPublicKey =  new PublicKey(airDropAddress);

        const tokenAccountAddress = await getAssociatedTokenAddress(mintPublicKey, airDropAddressPublicKey);
        const result = await connection.getTokenAccountBalance(tokenAccountAddress);

        const amount = result.value.amount;
        const decimals = result.value.decimals;

        return amount === "1" && decimals === 0;        
    }

    return false;

}