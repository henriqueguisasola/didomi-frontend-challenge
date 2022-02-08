import { HTTPMethods, mockRequest } from "../fetcher"
import { AddConsentInputModel } from "./models"

export const saveConsent = async (input: AddConsentInputModel) => {
    await mockRequest('/consents', HTTPMethods.POST, input)
}

export const getConsentList = async () => {
    await mockRequest('/consents', HTTPMethods.GET)
}