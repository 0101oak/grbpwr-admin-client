import { Grid, IconButton } from '@mui/material';
import { deleteMediaById } from 'api/byID';
import { MediaSelectorLayout } from 'features/mediaSelector/mediaSelectorLayout';
import { FC, useState } from 'react';
import styles from 'styles/product-id-media.scss';
import { MediaViewComponentsProps } from '../../utility/interfaces';

export const ProductMedias: FC<MediaViewComponentsProps> = ({
  product,
  url,
  setUrl,
  updateMediaByUrl,
  selectedMedia,
  fetchProduct,
  select,
  handleSelectedMedia,
}) => {
  const [mediaPicker, setMediaPicker] = useState(false);

  const handleMediaPickerVisibility = () => {
    setMediaPicker(!mediaPicker);
  };

  const handleDeleteMedia = async (id: number | undefined) => {
    await deleteMediaById({ productMediaId: id });
    fetchProduct?.();
  };

  return (
    <>
      <Grid container gap={5} className={styles.listed_media_container}>
        {product?.media?.map((media) => (
          <Grid item xs={5} key={media.id} className={styles.listed_media_wrapper}>
            <img src={media.productMediaInsert?.fullSize} alt='media' className={styles.media} />
            <IconButton
              aria-label='delete'
              size='small'
              onClick={() => handleDeleteMedia(media.id)}
              className={styles.media_btn}
            >
              x
            </IconButton>
          </Grid>
        ))}
        <Grid item>
          <MediaSelectorLayout
            label='upload new media'
            url={url}
            setUrl={setUrl}
            updateMediaByUrl={updateMediaByUrl}
            selectedMedia={selectedMedia}
            select={select}
            allowMultiple={true}
            handleSelectedMedia={handleSelectedMedia}
          />
        </Grid>
      </Grid>
    </>
  );
};