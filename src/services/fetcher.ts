export enum HTTPMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export const mockRequest = (path: string, method: HTTPMethods, body?: any) => new Promise<void>((res) => {
    console.log(`Mock request for path ${path} and method ${method}`)
    setTimeout(() => {
        res()
    }, 2000)
})
