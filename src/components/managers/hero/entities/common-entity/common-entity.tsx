import { Box, Button, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { common_HeroFullInsert } from 'api/proto-http/admin';
import { SingleMediaViewAndSelect } from 'components/common/media-selector-layout/media-selector-components/singleMediaViewAndSelect';
import { Field, useFormikContext } from 'formik';
import { useState } from 'react';
import { Props } from '../interface/interface';

export function CommonEntity({
  title,
  prefix,
  portraitLink,
  landscapeLink,
  exploreLink,
  size,
  aspectRatio,
  isDoubleAd = false,
  onSaveMedia,
}: Props) {
  const { errors } = useFormikContext<common_HeroFullInsert>();
  const [orientation, setOrientation] = useState<'Portrait' | 'Landscape'>('Landscape');

  const handleOrientationChange = (newOrientation: 'Portrait' | 'Landscape') => {
    setOrientation(newOrientation);
  };

  const handleMediaSave = (selectedMedia: any[]) => {
    if (isDoubleAd) {
      onSaveMedia(selectedMedia, 'Portrait');
      onSaveMedia(selectedMedia, 'Landscape');
    } else {
      onSaveMedia(selectedMedia, orientation);
    }
  };

  const currentMediaUrl = orientation === 'Portrait' ? portraitLink : landscapeLink;

  const getCurrentAspectRatio = () => {
    if (Array.isArray(aspectRatio)) {
      return aspectRatio;
    }
    return orientation === 'Portrait' ? aspectRatio.Portrait : aspectRatio.Landscape;
  };

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4' textTransform='uppercase'>
          {title}
        </Typography>
      </Grid>
      <Grid size={size}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant={orientation === 'Landscape' ? 'contained' : 'outlined'}
            onClick={() => handleOrientationChange('Landscape')}
            sx={{ mr: 1 }}
          >
            Landscape
          </Button>
          <Button
            variant={orientation === 'Portrait' ? 'contained' : 'outlined'}
            onClick={() => handleOrientationChange('Portrait')}
          >
            Portrait
          </Button>
        </Box>
        <SingleMediaViewAndSelect
          link={currentMediaUrl}
          aspectRatio={getCurrentAspectRatio()}
          isDeleteAccepted={false}
          saveSelectedMedia={handleMediaSave}
          isEditMode
        />
        <Box sx={{ mt: 2 }}>
          <Field
            as={TextField}
            name={`${prefix}.headline`}
            label='Headline'
            fullWidth
            sx={{ mb: 2 }}
          />
          <Field
            as={TextField}
            name={`${prefix}.exploreLink`}
            label='Explore Link'
            fullWidth
            sx={{ mb: 2 }}
          />
          <Field as={TextField} name={`${prefix}.exploreText`} label='Explore Text' fullWidth />
        </Box>
      </Grid>
    </Grid>
  );
}
