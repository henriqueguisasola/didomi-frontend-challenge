import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { ConsentsPage } from '../pages/Consents/ConsentsPage'
import { GiveConsentPage } from '../pages/GiveConsent/GiveConsentPage'
import { Routes as RoutesList } from './routes'

export const RootRouter: React.FunctionComponent = () => {
    return (
        <Routes>
            <Route path={RoutesList.GiveConsent} element={<GiveConsentPage />} />
            <Route path={RoutesList.CollectedConsents} element={<ConsentsPage />} />
            <Route
                path="*"
                element={<Navigate to={RoutesList.GiveConsent} />}
            />
        </ Routes>
    )
}
