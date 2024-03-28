import ClearIcon from '@mui/icons-material/Clear';
import { Checkbox, Grid, IconButton, ImageList, ImageListItem, InputLabel } from '@mui/material';
import { deleteFiles } from 'api/admin';
import { MediaSelectorMediaListProps } from 'features/interfaces/mediaSelectorInterfaces';
import { isVideo } from 'features/utilitty/filterContentType';
import { FC } from 'react';
import styles from 'styles/media-selector.scss';
export const MediaList: FC<MediaSelectorMediaListProps> = ({
  media,
  setMedia,
  allowMultiple,
  select,
  selectedMedia,
}) => {
  const handleDeleteFile = async (id: number | undefined) => {
    await deleteFiles({ id });
    setMedia?.((currentFiles) => currentFiles?.filter((file) => file.id !== id));
  };

  const handleSelect = (mediaUrl: string, allowMultiple: boolean, event: any) => {
    select(mediaUrl, allowMultiple);
    event.stopPropagation();
  };

  return (
    <Grid container spacing={2} justifyContent='center'>
      <Grid item xs={11}>
        {media && (
          <ImageList
            variant='standard'
            sx={{
              width: '100%',
              height: 500,
              padding: 2,
            }}
            cols={4}
            gap={8}
            className={styles.thumbnail_picker_list}
            rowHeight={180}
          >
            {media.map((m) => (
              <ImageListItem key={m.id} className={styles.thumbnail_picker_item_wrapper}>
                <Checkbox
                  checked={selectedMedia?.some((mediaItem) => mediaItem.url === m.media?.fullSize)}
                  onChange={() => select(m.media?.fullSize ?? '', allowMultiple)}
                  id={`${m.id}`}
                  style={{ display: 'none' }}
                />
                <InputLabel htmlFor={`${m.id}`}>
                  {selectedMedia?.some((item) => item.url === (m.media?.fullSize ?? '')) ? (
                    <span className={styles.media_selector_img_number}>selected</span>
                  ) : null}
                  {isVideo(m.media?.fullSize) ? (
                    <video
                      key={m.id}
                      src={m.media?.fullSize}
                      className={`${selectedMedia?.some((item) => item.url === (m.media?.fullSize ?? '')) ? styles.selected_media : ''}`}
                      controls
                      onClick={(event) =>
                        handleSelect(m.media?.fullSize ?? '', allowMultiple, event)
                      }
                    />
                  ) : (
                    <img
                      key={m.id}
                      src={m.media?.fullSize}
                      alt='media'
                      className={`${selectedMedia?.some((item) => item.url === (m.media?.fullSize ?? '')) ? styles.selected_media : ''}`}
                    />
                  )}
                </InputLabel>
                <IconButton
                  sx={{ backgroundColor: 'black', color: 'white' }}
                  aria-label='delete'
                  size='small'
                  onClick={() => handleDeleteFile(m.id)}
                  className={styles.thumb_picker_delete_btn}
                >
                  <ClearIcon />
                </IconButton>
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Grid>
    </Grid>
  );
};
