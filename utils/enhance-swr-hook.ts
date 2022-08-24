import { SWRResponse } from "swr";

const _isEmpty = (data: any) => {
    return (
        data == null ||
        data == '' ||
        (Array.isArray(data) && data.length === 0) ||
        (data.constructor === Object && Object.keys(data).length === 0)
    )
}

export const enhanceSwrHook = (swr: SWRResponse) => {

    const hasInitialResponse = !!(swr.data || swr.error);

    return {
        ...swr,
        isEmpty: hasInitialResponse && _isEmpty(swr.data),
        isLoading: !!(swr.isValidating && swr.error),
        hasInitialResponse
    }
}