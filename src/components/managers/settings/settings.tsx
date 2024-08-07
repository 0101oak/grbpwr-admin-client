import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { getDictionary } from 'api/admin';
import { UpdateSettingsRequest, common_Dictionary } from 'api/proto-http/admin';
import { updateSettings } from 'api/settings';
import { Layout } from 'components/login/layout';
import { Field, FieldProps, Formik } from 'formik';
import debounce from 'lodash/debounce';
import { FC, useCallback, useEffect, useState } from 'react';
import { defaultSettingsStates } from './defaultSettingsStates';
import { mapPaymentMethods, mapShipmentCarriers } from './mappingFunctions';

export const Settings: FC = () => {
  const [settings, setSettings] = useState<UpdateSettingsRequest>(defaultSettingsStates);
  const [dictionary, setDictionary] = useState<common_Dictionary>();
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState<'success' | 'error'>('success');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const showMessage = (message: string, severity: 'success' | 'error') => {
    setSnackBarMessage(message);
    setSnackBarSeverity(severity);
    setIsSnackBarOpen(true);
  };

  useEffect(() => {
    const fetchDictionary = async () => {
      const response = await getDictionary({}, true);
      setDictionary(response.dictionary);
      setSettings((prev) => ({
        ...prev,
        shipmentCarriers: mapShipmentCarriers(response.dictionary?.shipmentCarriers),
        paymentMethods: mapPaymentMethods(response.dictionary?.paymentMethods),
        maxOrderItems: response.dictionary?.maxOrderItems,
        siteAvailable: response.dictionary?.siteEnabled,
      }));
    };
    fetchDictionary();
  }, []);

  const handleFieldChange = async (values: UpdateSettingsRequest) => {
    try {
      await updateSettings(values);
      showMessage('Settings updated successfully.', 'success');
    } catch (error) {
      showMessage('Failed to update settings.', 'error');
    }
  };

  const debouncedHandleFieldChange = useCallback(debounce(handleFieldChange, 1000), []);

  return (
    <Layout>
      <Formik initialValues={settings} enableReinitialize={true} onSubmit={() => {}}>
        {({ values, setFieldValue }) => (
          <form>
            <Grid
              container
              spacing={2}
              direction='column'
              alignContent='center'
              padding={isMobile ? '20%' : '3%'}
            >
              <Grid item xs={12}>
                <Typography variant='h6'>PAYMENT METHODS</Typography>
              </Grid>
              {values.paymentMethods?.map((payment, id) => (
                <Grid item key={id} xs={12}>
                  <Field name={`paymentMethods[${id}].allow`}>
                    {({ field }: FieldProps) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value ?? false}
                            onChange={(e) => {
                              if (
                                window.confirm(
                                  'Are you sure you want to change this payment method?',
                                )
                              ) {
                                field.onChange(e);
                                handleFieldChange({
                                  ...values,
                                  paymentMethods: values.paymentMethods?.map((p, idx) =>
                                    idx === id ? { ...p, allow: e.target.checked } : p,
                                  ),
                                });
                              }
                            }}
                          />
                        }
                        label={payment.paymentMethod?.replace('PAYMENT_METHOD_NAME_ENUM_', '')}
                      />
                    )}
                  </Field>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography variant='h6'>SHIPMENT CARRIERS</Typography>
              </Grid>
              {values.shipmentCarriers?.map((carrier, index) => (
                <Grid item key={index} xs={12}>
                  <Box display='flex'>
                    <Field name={`shipmentCarriers[${index}].allow`}>
                      {({ field }: FieldProps) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              checked={field.value ?? false}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange({
                                  ...values,
                                  shipmentCarriers: values.shipmentCarriers?.map((c, idx) =>
                                    idx === index ? { ...c, allow: e.target.checked } : c,
                                  ),
                                });
                              }}
                            />
                          }
                          label={carrier.carrier}
                        />
                      )}
                    </Field>
                    <Field
                      as={TextField}
                      name={`shipmentCarriers[${index}].price.value`}
                      label='Price'
                      type='number'
                      size='small'
                      inputProps={{ step: '0.01', min: 0 }}
                      onChange={(e: any) => {
                        const newValue = parseFloat(e.target.value).toFixed(2); // Convert to string with 2 decimal places
                        setFieldValue(`shipmentCarriers[${index}].price.value`, newValue);
                        debouncedHandleFieldChange({
                          ...values,
                          shipmentCarriers: values.shipmentCarriers?.map((c, idx) =>
                            idx === index ? { ...c, price: { value: newValue } } : c,
                          ),
                        });
                      }}
                    />
                  </Box>
                  <Typography variant='body2' color='textSecondary'>
                    {dictionary?.shipmentCarriers?.find((c) => c.id === index + 1)?.shipmentCarrier
                      ?.description || 'No description available'}
                  </Typography>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Field name='siteAvailable'>
                  {({ field }: FieldProps) => (
                    <FormControlLabel
                      label='SITE AVAILABLE'
                      control={
                        <Checkbox
                          checked={field.value ?? false}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange({ ...values, siteAvailable: e.target.checked });
                          }}
                          name={field.name}
                          color='primary'
                        />
                      }
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='MAX ORDER ITEMS'
                  name='maxOrderItems'
                  type='number'
                  inputProps={{ min: 0 }}
                  value={values.maxOrderItems}
                  InputLabelProps={{ shrink: true }}
                  size='small'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = parseInt(e.target.value, 10); // Convert to number
                    setFieldValue('maxOrderItems', newValue);
                    debouncedHandleFieldChange({ ...values, maxOrderItems: newValue });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body1'>BASE CURRENCY: {dictionary?.baseCurrency}</Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackBarOpen(!isSnackBarOpen)}
      >
        <Alert severity={snackBarSeverity}>{snackBarMessage}</Alert>
      </Snackbar>
    </Layout>
  );
};
