import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { composition } from '../garment-composition/garment-composition';
import styles from '../styles/composition.scss';

interface SelectedInstructions {
  [key: string]: {
    code: string;
    percentage: number;
  };
}

interface CompositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInstructions: SelectedInstructions;
  selectComposition: (instructions: SelectedInstructions) => void;
}

export const CompositionModal: FC<CompositionModalProps> = ({
  isOpen,
  onClose,
  selectedInstructions,
  selectComposition,
}) => {
  const compositionCategories = Object.keys(composition.garment_composition);
  const [selectedCategory, setSelectedCategory] = useState<string>('Natural Fibers');
  const [localSelectedInstructions, setLocalSelectedInstructions] =
    useState<SelectedInstructions>(selectedInstructions);
  const isSelected = (key: string) => {
    return !!localSelectedInstructions[key];
  };

  useEffect(() => {
    setLocalSelectedInstructions(selectedInstructions);
  }, [selectedInstructions]);

  const totalPercentage = useMemo(() => {
    return Object.values(localSelectedInstructions).reduce((acc, curr) => acc + curr.percentage, 0);
  }, [localSelectedInstructions]);

  const handlePercentageChange = (key: string, value: string) => {
    const percentage = parseInt(value) || 0;
    if (percentage >= 0 && percentage <= 100) {
      const newTotal =
        totalPercentage - (localSelectedInstructions[key]?.percentage || 0) + percentage;
      if (newTotal > 100) {
        alert('Total percentage cannot exceed 100');
        return;
      }
      setLocalSelectedInstructions((prev) => {
        const newState = { ...prev };
        if (newState[key]) {
          newState[key] = {
            ...newState[key],
            percentage,
          };
        }
        selectComposition(newState);
        return newState;
      });
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleContainerClick = (key: string, value: string) => {
    setLocalSelectedInstructions((prev) => {
      const newState = { ...prev };
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = {
          code: value,
          percentage: 0,
        };
      }
      selectComposition(newState);
      return newState;
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth='xl'
      PaperProps={{ sx: { p: 2, position: 'relative' } }}
    >
      <IconButton sx={{ position: 'absolute', right: 0, top: 0 }} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <FormControl>
            <RadioGroup
              row
              value={selectedCategory}
              onChange={(e) => handleSelectCategory(e.target.value)}
              sx={{
                gap: 1,
                '& .MuiFormControlLabel-root': {
                  minWidth: 'fit-content',
                },
              }}
            >
              {compositionCategories.map((category) => (
                <FormControlLabel
                  key={category}
                  value={category}
                  control={<Radio />}
                  label={category}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2}>
            {Object.entries(
              composition.garment_composition[
                selectedCategory as keyof typeof composition.garment_composition
              ],
            ).map(([key, value]) => (
              <Grid key={key} size={{ xs: 6, sm: 2, md: 1.5 }}>
                <Grid
                  className={`${styles['square-container']} ${isSelected(key) ? styles['selected'] : ''}`}
                >
                  <Grid
                    className={styles['square-content']}
                    onClick={() => handleContainerClick(key, value)}
                  >
                    <Typography variant='overline' fontSize={isSelected(key) ? '0.6em' : '1em'}>
                      {key.toUpperCase()}
                    </Typography>
                    {isSelected(key) && (
                      <TextField
                        size='small'
                        type='number'
                        value={localSelectedInstructions[key]?.percentage || ''}
                        onChange={(e) => handlePercentageChange(key, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        slotProps={{
                          input: {
                            style: { textAlign: 'center' },
                          },
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};
