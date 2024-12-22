import { Grid2 as Grid, Typography } from '@mui/material';
import { common_Dictionary, common_OrderFull } from 'api/proto-http/frontend';
import { Buyer } from './shipping-buyer-information/buyer';
import { Shipping } from './shipping-buyer-information/shipping';
import { TrackingNumber } from './shipping-buyer-information/tracking-number';

interface Props {
  orderDetails: common_OrderFull | undefined;
  dictionary: common_Dictionary | undefined;
  isPrinting: boolean;
  orderStatus: string | undefined;
  isEdit: boolean;
  trackingNumber: string;
  toggleTrackNumber: () => void;
  handleTrackingNumberChange: (event: any) => void;
  saveTrackingNumber: () => void;
}

export function ShippingBuyer({
  orderDetails,
  dictionary,
  isPrinting,
  orderStatus,
  isEdit,
  trackingNumber,
  toggleTrackNumber,
  handleTrackingNumberChange,
  saveTrackingNumber,
}: Props) {
  const shipping = orderDetails?.shipping?.addressInsert;
  const buyer = orderDetails?.buyer?.buyerInsert;

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <Typography variant='overline' fontSize={14} fontWeight='bold' textTransform='uppercase'>
          shipping:
        </Typography>
      </Grid>
      {shipping && (
        <Grid size={{ xs: 12, md: 6 }}>
          <TrackingNumber
            isEdit={isEdit}
            isPrinting={isPrinting}
            trackingNumber={trackingNumber}
            orderStatus={orderStatus || ''}
            orderDetails={orderDetails}
            toggleTrackNumber={toggleTrackNumber}
            handleTrackingNumberChange={handleTrackingNumberChange}
            saveTrackingNumber={saveTrackingNumber}
          />
          <Shipping shipping={shipping} orderDetails={orderDetails} dictionary={dictionary} />
        </Grid>
      )}
      {buyer && (
        <Grid size={{ xs: 12, md: 6 }}>
          <Buyer buyer={buyer} />
        </Grid>
      )}
    </Grid>
  );
}
