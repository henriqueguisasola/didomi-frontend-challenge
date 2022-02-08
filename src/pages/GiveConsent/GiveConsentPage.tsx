import React, { useState, useContext } from 'react'
import { Alert, Button, Checkbox, FormControlLabel, FormGroup, Grid, Snackbar, TextField, Typography } from '@mui/material'
import { saveConsent } from '../../services/consents/service'
import { ConsentsContext } from '../../contexts/ConsentsContextProvider'
import LoadingButton from '@mui/lab/LoadingButton';

export const GiveConsentPage: React.FunctionComponent<any> = ({}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [consents, setConsents] = useState({
        newsletter: false,
        ads: false,
        statistics: false,
    })
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState('')

    const { consentsList, setConsentsList } = useContext(ConsentsContext)

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }
    const onChangeConsents = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConsents({ ...consents, [e.target.name]: e.target.checked })
    }

    const submitConsent = async () => {
        if (!name || !email) {
            setError('Please, fill in a valid Name and Email Address before giving consent.')
            return
        }

        setIsLoading(true)

        const consentItem = {
            name,
            email,
            consentList: Object.entries(consents).filter((item) => item[1]).map((item) => item[0]),
        }
        await saveConsent(consentItem)
        setConsentsList([ consentItem, ...consentsList ])

        setName('')
        setEmail('')
        setIsLoading(false)
    }

    const handleClose = () => { setError('') }

    return (
        <Grid container spacing={2}>
            <Grid item xs></Grid>
            <Grid item xs={12} md={6} lg={4}>
                <TextField
                    id={'name-input-field'}
                    label={'Name'}
                    value={name}
                    onChange={onChangeName}
                    margin={"normal"}
                    fullWidth
                />
                <TextField
                    id={'email-input-field'}
                    label={'Email Address'}
                    value={email}
                    onChange={onChangeEmail}
                    margin={"normal"}
                    fullWidth
                />
                <Typography
                    sx={{ my: 2, width: '100%' }}
                >
                    I agree to:
                </Typography>
                <FormGroup onChange={onChangeConsents}>
                    <FormControlLabel
                        value={consents.newsletter}
                        control={<Checkbox />}
                        label={'Receive newsletter'}
                        name={'newsletter'}
                    />
                    <FormControlLabel
                        value={consents.ads}
                        control={<Checkbox />}
                        label={'Be shown targeted ads'}
                        name={'ads'}
                    />
                    <FormControlLabel
                        value={consents.statistics}
                        control={<Checkbox />}
                        label={'Contribute to anonymous visit statistics'}
                        name={'statistics'}
                    />
                </FormGroup>
                <LoadingButton
                    variant="contained"
                    disabled={(!consents.ads && !consents.newsletter && !consents.statistics)}
                    sx={{ my: 3, width: '60%' }}
                    onClick={submitConsent}
                    loading={isLoading}
                >
                    Give consent
                </LoadingButton>
            </Grid>
            <Grid item xs></Grid>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Grid>
    )
}
