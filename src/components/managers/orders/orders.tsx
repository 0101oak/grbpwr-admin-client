import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from '@tanstack/react-location';
import { getDictionary } from 'api/admin';
import { getOrdersList } from 'api/orders';
import {
  common_Dictionary,
  common_Order,
  common_OrderStatusEnum,
  common_PaymentMethodNameEnum,
} from 'api/proto-http/admin';
import { Layout } from 'components/login/layout';
import { ROUTES } from 'constants/routes';

import { FC, useEffect, useState } from 'react';
import { formatDateTime, getOrderStatusName, getStatusColor } from './utility';

interface SearchFilters {
  status: common_OrderStatusEnum | undefined;
  paymentMethod: common_PaymentMethodNameEnum | undefined;
  orderId: string | undefined;
  email: string | undefined;
}

export const Orders: FC = () => {
  const [rows, setRows] = useState<common_Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  const [dictionary, setDictionary] = useState<common_Dictionary>();

  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const [paymentOptions, setPaymentOptions] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState('');

  const [email, setEmail] = useState('');

  const [orderId, setOrderId] = useState('');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    status: undefined,
    paymentMethod: undefined,
    orderId: undefined,
    email: undefined,
  });

  const newSearch = async (filters: SearchFilters) => {
    setPage(1);
    setLoading(true);
    try {
      const response = await getOrdersList({
        offset: 0,
        limit: pageSize,
        status: filters.status,
        orderId: Number(filters.orderId) || undefined,
        email: filters.email,
        paymentMethod: filters.paymentMethod,
        orderFactor: 'ORDER_FACTOR_DESC',
      });
      if (!response.orders || response.orders.length === 0) {
        setLoadMoreVisible(false);
        setRows([]);
      } else {
        setRows(response.orders!);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const offset = page * pageSize;
    setLoading(true);
    try {
      const response = await getOrdersList({
        offset: offset,
        limit: pageSize,
        status: searchFilters.status,
        orderId: Number(searchFilters.orderId) || undefined,
        email: searchFilters.email,
        paymentMethod: searchFilters.paymentMethod,
        orderFactor: 'ORDER_FACTOR_DESC',
      });
      if (!response.orders || response.orders.length === 0) {
        setLoadMoreVisible(false);
      } else {
        setRows((currentRows) => [...currentRows, ...response.orders!]);
        setPage((currentPage) => currentPage + 1);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const initSearchFilters = () => {
    const filters = {
      status: (selectedStatus as common_OrderStatusEnum) || undefined,
      paymentMethod: (selectedPayment as common_PaymentMethodNameEnum) || undefined,
      orderId: orderId || undefined,
      email: email || undefined,
    };
    setSearchFilters(filters);
    setLoadMoreVisible(true);
    newSearch(filters);
  };

  const fetchDictionary = async () => {
    const response = await getDictionary({});
    setDictionary(response.dictionary);
  };

  useEffect(() => {
    newSearch(searchFilters);
    fetchDictionary();
  }, []);

  useEffect(() => {
    const setDataFromDictionary = () => {
      setPaymentOptions(
        dictionary?.paymentMethods?.map((x) => (x.name ? x.name.toString() : '')) || [],
      );
    };

    setDataFromDictionary();
  }, [dictionary]);

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 120 },
    {
      field: 'orderStatusId',
      headerName: 'Order status',
      width: 180,
      renderCell: (params: any) => {
        const status = getOrderStatusName(dictionary, params.value);
        return (
          <div
            style={{
              backgroundColor: getStatusColor(status),
              width: '100%',
              height: '100%',
            }}
          >
            {status}
          </div>
        );
      },
    },
    {
      field: 'placed',
      headerName: 'Placed',
      flex: 1,
      minWidth: 180,
      width: 250,
      renderCell: (params: any) => {
        return formatDateTime(params.value);
      },
    },
    {
      field: 'modified',
      headerName: 'Modified',
      flex: 1,
      minWidth: 180,
      width: 300,
      renderCell: (params: any) => {
        return formatDateTime(params.value);
      },
    },
    {
      field: 'totalPrice',
      headerName: 'Total',
      width: 180,
      flex: 0.5, // Smaller flex grow
      minWidth: 100, // Minimum width
      valueGetter: (params: any) => `${params.value} ${dictionary?.baseCurrency}`,
    },
  ];

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  const handlePaymentChange = (event: any) => {
    setSelectedPayment(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleOrderIdChange = (event: any) => {
    setOrderId(event.target.value);
  };

  const navigate = useNavigate();

  const handleRowClick = (params: any) => {
    navigate({ to: `${ROUTES.orders}/${params.row.uuid}` });
  };

  return (
    <Layout>
      <Grid container spacing={2} padding='2%'>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={selectedStatus} label='Status' onChange={handleStatusChange}>
                <MenuItem value=''>ANY</MenuItem>
                {dictionary?.orderStatuses?.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name?.replace('ORDER_STATUS_ENUM_', '').replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Payment</InputLabel>
              <Select value={selectedPayment} label='Payment' onChange={handlePaymentChange}>
                <MenuItem value=''>ANY</MenuItem>
                {paymentOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.replace('PAYMENT_METHOD_NAME_ENUM_', '').replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label='Email'
              variant='outlined'
              value={email}
              onChange={handleEmailChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type='text'
              label='Order id'
              variant='outlined'
              value={orderId}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  handleOrderIdChange(e);
                }
              }}
              inputProps={{ min: 0 }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            disabled={loading}
            onClick={initSearchFilters}
            sx={{ height: '100%' }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            loading={loading}
            rowSelection={false}
            pageSizeOptions={[]}
            onRowClick={handleRowClick}
          />
          {loadMoreVisible && (
            <Button
              variant='contained'
              onClick={loadMore}
              disabled={loading}
              style={{ marginTop: '20px' }}
            >
              Load More
            </Button>
          )}
        </Grid>
      </Grid>
      {/* </div> */}
    </Layout>
  );
};
