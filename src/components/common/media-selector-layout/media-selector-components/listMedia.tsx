import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { common_MediaFull, common_MediaItem } from 'api/proto-http/admin';
import { MediaSelectorMediaListProps } from 'components/common/interfaces/mediaSelectorInterfaces';
import { aspectRatioColor, mediaAspectRatio } from 'features/utilitty/aspect-ratio';
import { isVideo } from 'features/utilitty/filterContentType';
import { useMediaSelectorStore, useSnackBarStore } from 'lib/stores/store';
import { FC, useEffect, useState } from 'react';
import styles from 'styles/media-selector.scss';
import { FullSizeMediaModal } from './fullSizeMediaModal';

export const MediaList: FC<MediaSelectorMediaListProps> = ({
  allowMultiple,
  selectedMedia,
  enableModal = false,
  croppedImage,
  aspectRatio,
  hideVideos = false,
  isDeleteAccepted = true,
  setCroppedImage,
  select,
  handleUploadMedia,
}) => {
  const { showMessage } = useSnackBarStore();
  const { getSortedMedia, fetchFiles, media } = useMediaSelectorStore();
  const sortedMedia = getSortedMedia();
  const [openModal, setOpenModal] = useState(false);
  const [clickedMedia, setClickedMedia] = useState<common_MediaItem | undefined>();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [videoSizes, setVideoSizes] = useState<Record<number, { width: number; height: number }>>(
    {},
  );
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    fetchFiles(50, 0);
  }, [fetchFiles]);

  const handleSelect = (media: common_MediaFull | undefined, event: React.MouseEvent) => {
    event.stopPropagation();
    if (enableModal) {
      setOpenModal(true);
      setClickedMedia(media?.media);
    } else if (media) {
      select(media, allowMultiple);
    }
  };

  const handleVideoLoad = (mediaId: number, event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.target as HTMLVideoElement;
    setVideoSizes((prev) => ({
      ...prev,
      [mediaId]: {
        width: video.videoWidth,
        height: video.videoHeight,
      },
    }));
  };

  const filteredMedia = sortedMedia.filter((media) => {
    if (hideVideos && isVideo(media.media?.thumbnail?.mediaUrl)) {
      return false;
    }

    if (aspectRatio) {
      const mediaRatio = mediaAspectRatio(media, videoSizes);
      return mediaRatio && aspectRatio.includes(mediaRatio);
    }
    return true;
  });

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12}>
        <ImageList
          variant='standard'
          sx={{ width: '100%' }}
          cols={isSmallScreen ? 2 : 6}
          gap={8}
          rowHeight={200}
        >
          {filteredMedia.map((media) => (
            <Box key={media.id}>
              <ImageListItem
                onClick={(event) => handleSelect(media, event)}
                className={styles.list_media_item}
              >
                <InputLabel htmlFor={`${media.id}`}>
                  {selectedMedia?.some((item) => item.id === media.id) && (
                    <span className={styles.selected_flag}>selected</span>
                  )}
                  {isVideo(media.media?.thumbnail?.mediaUrl) ? (
                    <video
                      src={media.media?.thumbnail?.mediaUrl}
                      className={
                        selectedMedia?.some((item) => item.id === media.id)
                          ? styles.selected_media
                          : ''
                      }
                      controls
                      onLoadedMetadata={(e) => handleVideoLoad(media.id || 0, e)}
                    />
                  ) : (
                    <img
                      src={media.media?.thumbnail?.mediaUrl}
                      alt='media'
                      className={
                        selectedMedia?.some((item) => item.id === media.id)
                          ? styles.selected_media
                          : ''
                      }
                    />
                  )}
                </InputLabel>
              </ImageListItem>
              <Typography
                variant='overline'
                style={{
                  backgroundColor: mediaAspectRatio(media, videoSizes)
                    ? aspectRatioColor(mediaAspectRatio(media, videoSizes))
                    : '#808080',
                }}
              >
                {mediaAspectRatio(media, videoSizes)
                  ? `RATIO: ${mediaAspectRatio(media, videoSizes)}`
                  : 'RATIO: UNKNOWN'}
              </Typography>
            </Box>
          ))}
        </ImageList>
      </Grid>
      <FullSizeMediaModal
        open={openModal}
        clickedMedia={clickedMedia}
        croppedImage={croppedImage}
        close={handleCloseModal}
        setCroppedImage={setCroppedImage}
        handleUploadMedia={handleUploadMedia}
      />
    </Grid>
  );
};
