import CloseIcon from '@mui/icons-material/Close';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Slider,
  Typography,
} from '@mui/material';
import getCroppedImg from 'features/utilitty/getCropped';
import { FC, useCallback, useEffect, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import { Point } from 'react-easy-crop/types';

interface CropperInterface {
  selectedFile: string | undefined;
  open: boolean;
  close: () => void;
  saveCroppedImage: (croppedImage: string) => void;
}

const calculateAspectRatio = (width: number | undefined, height: number | undefined) => {
  if (!width || !height) return;
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  const newWidth = width / divisor;
  const newHeight = height / divisor;
  return newWidth / newHeight;
};

export const MediaCropper: FC<CropperInterface> = ({
  selectedFile,
  open,
  close,
  saveCroppedImage,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(4 / 5);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const aspectRatios = [
    { label: '16:9', value: 1.7778, color: '#cc0000' },
    { label: '4:3', value: 1.3333, color: '#e69138' },
    { label: '1:1', value: 1.0, color: '#f1c232' },
    { label: '4:5', value: 0.8, color: '#6aa84f' },
    { label: '3:4', value: 0.75, color: '#45818e' },
    { label: '5:4', value: 1.25, color: '#3d85c6' },
    { label: '9:16', value: 0.5625, color: '#674ea7' },
  ];

  useEffect(() => {
    if (selectedFile) {
      const img = new Image();
      img.src = selectedFile;
    }
  }, [selectedFile, aspect]);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (selectedFile && croppedAreaPixels) {
      const format = selectedFile.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
      const croppedImage = await getCroppedImg(
        selectedFile,
        croppedAreaPixels,
        aspect,
        format,
        rotation,
      );
      saveCroppedImage(croppedImage);
      close();
    }
  };

  const handleAspectRatioChange = (value: number | undefined) => {
    setAspect(value);
  };

  const rotateRight = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <Dialog open={selectedFile ? open : false} onClose={close} fullWidth maxWidth='md'>
      <Grid container spacing={2} padding='8% 6%'>
        <Grid item xs={12} md={8}>
          <DialogContent
            style={{
              height: '500px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Cropper
              onCropChange={setCrop}
              image={selectedFile || ''}
              zoom={zoom}
              crop={crop}
              aspect={aspect}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              rotation={rotation}
              restrictPosition={true}
            />
          </DialogContent>
          <DialogActions>
            <Grid container alignItems='center' spacing={4}>
              <Grid item xs={10}>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby='Zoom'
                  onChange={(e, zoom) => setZoom(Number(zoom))}
                  size='small'
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={rotateRight}>
                  <Rotate90DegreesCwIcon />
                </IconButton>
              </Grid>
            </Grid>
            <IconButton onClick={close} style={{ position: 'absolute', right: '0', top: '0' }}>
              <CloseIcon fontSize='medium' />
            </IconButton>
          </DialogActions>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box position='relative'>
            <Typography variant='h6'>Select Aspect Ratio</Typography>
            <Box display='grid' gap='5px'>
              {aspectRatios.map((ratio) => (
                <Button
                  key={ratio.label}
                  onClick={() => handleAspectRatioChange(ratio.value)}
                  variant={aspect === ratio.value ? 'contained' : 'outlined'}
                  style={{
                    backgroundColor: aspect === ratio.value ? ratio.color : 'transparent',
                  }}
                >
                  {ratio.label}
                </Button>
              ))}
              <Button onClick={handleSave}>save crop</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};
