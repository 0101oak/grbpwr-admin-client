import { Box, Button, Chip, TextField } from '@mui/material';
import { deleteTag, updateTag } from 'api/updateProductsById';
import { FC, useState } from 'react';
import { ProductIdProps } from '../utility/interfaces';

export const ProductTags: FC<ProductIdProps> = ({ product, id, fetchProduct, showMessage }) => {
  const [tag, setTag] = useState('');

  const deleteTagFromList = async (removeTag: string | undefined) => {
    if (product?.tags && product.tags.length > 1) {
      const response = await deleteTag({ productId: Number(id), tag: removeTag });
      showMessage('TAG REMOVED', 'success');
      if (response) {
        fetchProduct();
      }
    } else {
      showMessage('PRODUCT SHOULD CONTAIN AT LEAST 1 TAG', 'error');
    }
  };

  const addNewTag = async () => {
    if (tag.trim()) {
      const response = await updateTag({ productId: Number(id), tag: tag });
      showMessage('TAG ADDED', 'success');
      if (response) {
        fetchProduct();
      }
      setTag('');
    } else {
      showMessage('PLEASE FILL TAG TO UPLOAD', 'error');
    }
  };
  return (
    <Box display='grid' alignItems='center' gap='10px'>
      <Box display='flex' alignItems='center' gap='5px'>
        <TextField
          type='text'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder='upload new tag'
          size='small'
          label='TAG'
          InputLabelProps={{ shrink: true }}
        />
        <Button variant='contained' onClick={addNewTag}>
          upload
        </Button>
      </Box>
      <Box display='grid' gridTemplateColumns='repeat(2, 1fr)' gap='5px'>
        {product?.tags?.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.productTagInsert?.tag}
            onDelete={() => deleteTagFromList(tag.productTagInsert?.tag)}
            color='default'
          />
        ))}
      </Box>
    </Box>
  );
};
