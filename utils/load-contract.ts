import contract from "@truffle/contract";

export enum EAvailableContracts {
    CourseMarketplace = 'CourseMarketplace'
}

export const loadContract = async (
    name: EAvailableContracts,
    provider: any
): Promise<any> => {
    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();

    const _contract = contract(Artifact);
    _contract.setProvider(provider);

    let deployedContract = null;

    try {
        deployedContract = await _contract.deployed();
    } catch {
        console.error(`Contract "${name}" can't be loaded`);
    }

    return deployedContract;
};
