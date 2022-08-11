import { useWeb3 } from 'providers/web3-provider/web3-provider';
import { useEffect } from 'react';
import useSWR from 'swr'

const whitelistedAddresses: Record<any, boolean> = {
    '0x9e9196bf4120c914e5046bb149bd0df8dc797a4b2eb737cd986d92bf4b2b1290': true
}

export const useAccount = () => {
    const { web3, provider } = useWeb3();
    const { mutate, data = '', ...options } = useSWR(
        web3 === null ? null : "web3/accounts",
        async () => {
            const accounts = await web3?.eth.getAccounts()

            return accounts?.[0];
        },
        {
            isPaused: () => !web3
        }
    )

    useEffect(() => {
        provider?.on('accountsChanged', ([newAccount]: string[]) => mutate(newAccount))
    }, [provider, mutate])

    return {
        isAdmin: data && whitelistedAddresses[web3?.utils.keccak256(data) || ''],
        account: {
            mutate,
            data,
            ...options
        }
    }
}