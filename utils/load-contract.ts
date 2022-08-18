import Web3 from "web3";

export enum EAvailableContracts {
    CourseMarketplace = 'CourseMarketplace'
}

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID as string

export const loadContract = async (
    name: EAvailableContracts,
    web3: Web3
): Promise<any> => {
    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();

    let contract = null;

    try {
        contract = new web3.eth.Contract(
            Artifact.abi,
            Artifact.networks[NETWORK_ID].address
        )
    } catch {
        console.error(`Contract "${name}" can't be loaded`);
    }

    return contract;
};
