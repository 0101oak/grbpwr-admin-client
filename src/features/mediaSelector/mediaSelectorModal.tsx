import ClearIcon from '@mui/icons-material/Clear';
import { Alert, Button, Dialog, IconButton, Snackbar } from '@mui/material';
import { common_MediaFull } from 'api/proto-http/admin';
import { MediaSelectorModalProps } from 'features/interfaces/mediaSelectorInterfaces';
import useMediaSelector from 'features/utilitty/useMediaSelector';
import { FC, useState } from 'react';
import styles from 'styles/media-selector.scss';
import { MediaSelector } from './mediaSelector';

export const MediaSelectorModal: FC<MediaSelectorModalProps> = ({
  closeMediaSelector,
  allowMultiple,
  saveSelectedMedia,
}) => {
  const { snackBarMessage, closeSnackBar, isSnackBarOpen, showMessage, snackBarSeverity } =
    useMediaSelector();
  const [selectedMedia, setSelectedMedia] = useState<common_MediaFull[]>([]);
  const [open, setOpen] = useState(true);

  const handleMediaAndCloseSelector = async () => {
    if (selectedMedia.length === 0) {
      showMessage('NO SELECTED MEDIA', 'error');
      return;
    }
    saveSelectedMedia(selectedMedia);
    handleClose();
  };

  const select = (media: common_MediaFull, allowMultiple: boolean) => {
    setSelectedMedia((prevSelected) => {
      return allowMultiple
        ? prevSelected.some((item) => item.id === media.id)
          ? prevSelected.filter((item) => item.id !== media.id)
          : [...prevSelected, media]
        : [media];
    });
  };

  const handleClose = () => {
    setOpen(false);
    closeMediaSelector();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='media-selector-dialog-title'
        fullWidth={true}
        maxWidth='xl'
        className={styles.modal}
      >
        <MediaSelector
          allowMultiple={allowMultiple}
          select={select}
          selectedMedia={selectedMedia}
        />

        <Button
          onClick={handleMediaAndCloseSelector}
          className={styles.save_btn}
          variant='contained'
          size='small'
        >
          Save
        </Button>
        <IconButton
          className={styles.close_modal}
          size='small'
          aria-label='close'
          onClick={handleClose}
        >
          <ClearIcon />
        </IconButton>
      </Dialog>
      <Snackbar open={isSnackBarOpen} autoHideDuration={3000} onClose={closeSnackBar}>
        <Alert severity={snackBarSeverity}>{snackBarMessage}</Alert>
      </Snackbar>
    </>
  );
};
