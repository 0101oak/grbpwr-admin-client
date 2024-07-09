import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { common_ProductNew } from 'api/proto-http/admin';
import { colors } from 'constants/colors';
import { generateSKU } from 'features/utilitty/dynamicGenerationOfSku';
import { findInDictionary } from 'features/utilitty/findInDictionary';
import { formatPreorderDate } from 'features/utilitty/formatPreorderDate';
import { removePossibilityToUseSigns } from 'features/utilitty/removePossibilityToEnterSigns';
import { Field, useFormikContext } from 'formik';
import React, { FC, useCallback, useMemo, useState } from 'react';
import CountryList from 'react-select-country-list';
import { AddProductInterface, Country } from '../addProductInterface/addProductInterface';

export const CommonProductInsert: FC<AddProductInterface> = ({ dictionary }) => {
  const { values, setFieldValue } = useFormikContext<common_ProductNew>();
  const countries = useMemo(() => CountryList().getData() as Country[], []);
  const [showPreorder, setShowPreorder] = useState(true);
  const [showSales, setShowSales] = useState(true);
  const [preorderDate, setPreorderDate] = useState({
    initial: values.product?.productBody?.preorder || '',
    formatted: formatPreorderDate(values.product?.productBody?.preorder) || '',
  });
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, flag: boolean = false) => {
    const { name, value } = e.target;
    setFieldValue(name, value.toString());
    if (flag) {
      const saleValue = value.trim();
      if (saleValue === '') {
        setShowPreorder(true);
      } else {
        const saleNumber = parseFloat(saleValue);
        setShowPreorder(saleNumber <= 0);
      }
    }
  };

  const handleFieldChange = useCallback(
    (
      e: SelectChangeEvent<string | number> | React.ChangeEvent<HTMLInputElement>,
      field: string,
    ) => {
      let newValue = e.target.value;
      if (field === 'color' && typeof newValue === 'string') {
        newValue = newValue.toLowerCase().replace(/\s/g, '_');
        const selectedColor = colors.find(
          (color) => color.name.toLowerCase().replace(/\s/g, '_') === newValue,
        );
        setFieldValue(
          'product.productBody.colorHex',
          selectedColor ? selectedColor.hex : '#000000',
          false,
        );
      }
      setFieldValue(`product.productBody.${field}`, newValue);

      const updatedValues = {
        ...values.product,
        [field]: newValue,
      };

      const newSKU = generateSKU(
        updatedValues.productBody?.brand,
        updatedValues.productBody?.targetGender,
        findInDictionary(dictionary, updatedValues.productBody?.categoryId, 'category'),
        updatedValues.productBody?.color,
        updatedValues.productBody?.countryOfOrigin,
      );
      setFieldValue('product.productBody.sku', newSKU);
    },
    [values.product, setFieldValue],
  );

  const handlePreorderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDate = e.target.value;
    if (rawDate !== '') {
      const formattedDate = formatPreorderDate(rawDate);
      setPreorderDate({
        initial: rawDate,
        formatted: formattedDate,
      });
      setFieldValue('product.productBody.preorder', formattedDate);
      setShowSales(false);
    } else {
      setPreorderDate({
        initial: '',
        formatted: '',
      });
      setFieldValue('product.productBody.preorder', '');
      setShowSales(true);
    }
  };

  return (
    <Grid container display='grid' spacing={2}>
      <Grid item xs={isMobile ? 12 : 8.5}>
        <Field
          as={TextField}
          variant='outlined'
          label='NAME'
          name='product.productBody.name'
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={isMobile ? 12 : 8.5}>
        <Field
          as={TextField}
          variant='outlined'
          label='BRAND'
          name='product.productBody.brand'
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(e, 'brand')}
        />
      </Grid>
      <Grid item xs={isMobile ? 12 : 8.5}>
        <FormControl required fullWidth>
          <InputLabel shrink>GENDER</InputLabel>
          <Select
            value={values.product?.productBody?.targetGender || ''}
            onChange={(e) => {
              handleFieldChange(e, 'targetGender');
            }}
            label='GENDER'
            displayEmpty
            name='product.productBody.targetGender'
          >
            {dictionary?.genders?.map((gender) => (
              <MenuItem key={gender.id} value={gender.id}>
                {gender.name?.replace('GENDER_ENUM_', '').toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={isMobile ? 12 : 8.5}>
        <FormControl required fullWidth>
          <InputLabel shrink>CATEGORY</InputLabel>
          <Select
            name='product.productBody.categoryId'
            onChange={(e) => handleFieldChange(e, 'categoryId')}
            value={values.product?.productBody?.categoryId || ''}
            label='CATEGORY'
            displayEmpty
          >
            {dictionary?.categories?.map((category) => (
              <MenuItem value={category.id} key={category.id}>
                {findInDictionary(dictionary, category.id, 'category')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={isMobile ? 12 : 8.5}>
        <FormControl fullWidth required>
          <InputLabel shrink>COLOR</InputLabel>
          <Select
            value={values.product?.productBody?.color || ''}
            onChange={(e) => handleFieldChange(e, 'color')}
            label='COLOR'
            displayEmpty
            name='product.productBody.color'
          >
            {colors.map((color, id) => (
              <MenuItem key={id} value={color.name.toLowerCase().replace(/\s/g, '_')}>
                {color.name.toLowerCase().replace(/\s/g, '_')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={isMobile ? 12 : 8.5}>
        <Field
          as={TextField}
          type='color'
          label='COLOR HEX'
          name='product.productBody.colorHex'
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={isMobile ? 12 : 8.5}>
        <FormControl fullWidth required>
          <InputLabel shrink>COUNTRY</InputLabel>
          <Select
            name='product.productBody.countryOfOrigin'
            value={values.product?.productBody?.countryOfOrigin || ''}
            onChange={(e) => handleFieldChange(e, 'countryOfOrigin')}
            label='COUNTRY'
            displayEmpty
          >
            {countries.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.label},{country.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={isMobile ? 12 : 8.5}>
        <Field
          as={TextField}
          variant='outlined'
          label='PRICE'
          name='product.productBody.price.value'
          type='number'
          inputProps={{ min: 0 }}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          onChange={handlePriceChange}
          onKeyDown={removePossibilityToUseSigns}
        />
      </Grid>

      {showSales && (
        <Grid item xs={isMobile ? 12 : 8.5}>
          <Field
            as={TextField}
            label='SALE PERCENTAGE'
            name='product.productBody.salePercentage.value'
            onChange={(e: any) => handlePriceChange(e, true)}
            type='number'
            inputProps={{ min: 0, max: 99 }}
            InputLabelProps={{ shrink: true }}
            onKeyDown={removePossibilityToUseSigns}
            fullWidth
          />
        </Grid>
      )}

      {showPreorder && (
        <Grid item xs={isMobile ? 12 : 8.5}>
          <Field
            as={TextField}
            label='PREORDER'
            type='date'
            name='product.productBody.preorder'
            value={preorderDate.initial}
            onChange={handlePreorderChange}
            helperText={preorderDate.formatted}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
      )}
      <Grid item xs={isMobile ? 12 : 8.5}>
        <Field
          as={TextField}
          label='DESCRIPTION'
          name='product.productBody.description'
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          required
        />
      </Grid>

      <Grid item xs={isMobile ? 12 : 8.5}>
        <Field
          as={TextField}
          label='SKU'
          name='product.productBody.sku'
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
