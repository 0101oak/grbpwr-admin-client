import { Button, Grid, IconButton, ImageList, ImageListItem } from '@mui/material';
import { deleteFiles } from 'api/admin';
import { FC } from 'react';
import styles from 'styles/product-id-media.scss';
import { MediaPickerSelectProps } from '../../../../utility/interfaces';

export const ThumbnailMediaPicker: FC<MediaPickerSelectProps> = ({
  media,
  setMedia,
  select,
  handleImage,
  selectedThumbnail,
}) => {
  const handleDeleteFile = async (id: number | undefined) => {
    await deleteFiles({ id });
    setMedia?.((currentFiles) => currentFiles?.filter((file) => file.id !== id));
  };

  return (
    <Grid container spacing={2} justifyContent='center'>
      <Grid item>
        {media && (
          <ImageList
            variant='standard'
            sx={{ width: 400, height: 400, padding: 2 }}
            cols={3}
            gap={8}
            className={styles.thumbnail_picker_list}
            rowHeight={220}
          >
            {media.map((m) => (
              <ImageListItem key={m.id} className={styles.thumbnail_picker_item_wrapper}>
                <input
                  type='checkbox'
                  checked={selectedThumbnail?.includes(m.media?.fullSize ?? '')}
                  onChange={() => select?.(m.media?.fullSize ?? '')}
                  id={`${m.id}`}
                  style={{ display: 'none' }}
                />
                <label htmlFor={`${m.id}`}>
                  {selectedThumbnail?.includes(m.media?.fullSize ?? '') ? (
                    <span className={styles.media_selector_img_number}>selected</span>
                  ) : null}
                  <img
                    key={m.id}
                    src={m.media?.fullSize}
                    alt='video'
                    className={`${
                      selectedThumbnail?.includes(m.media?.fullSize ?? '')
                        ? styles.selected_media
                        : ''
                    }`}
                  />
                </label>
                <IconButton
                  sx={{ backgroundColor: 'black', color: 'white' }}
                  aria-label='delete'
                  size='small'
                  onClick={() => handleDeleteFile(m.id)}
                  className={styles.thumb_picker_delete_btn}
                >
                  x
                </IconButton>
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Grid>
      <Grid item>
        <Button
          onClick={handleImage}
          variant='contained'
          size='medium'
          sx={{ backgroundColor: 'black' }}
        >
          add
        </Button>
      </Grid>
    </Grid>
  );
};
