import React, { useState, createContext, Dispatch, SetStateAction } from 'react'
import { consentsMock } from '../constants/consentsMock'

export interface ConsentItem {
  name: string
  email: string
  consentList: string[]
}

export interface ConsentsContextData {
    consentsList: ConsentItem[];
    setConsentsList: (list: ConsentItem[]) => void
  }

export const ConsentsContext = createContext<ConsentsContextData>({
    consentsList: consentsMock,
    setConsentsList: () => {}
})

export const ConsentsContextProvider: React.FunctionComponent = ({ children }) => {
  const [consentsList, setConsentsList] = useState(consentsMock)
  const updateConsentsList = (list: ConsentItem[]) => { setConsentsList(list) }

  return (
    <ConsentsContext.Provider value={{consentsList, setConsentsList: updateConsentsList}}>
        {children}
    </ConsentsContext.Provider>
  )
}
