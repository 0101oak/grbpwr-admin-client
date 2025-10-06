import { MediaSelector } from 'components/managers/media/media-selector/components/mediaSelector';

import { FC } from 'react';

export const MediaManager: FC = () => {
  return (
    <MediaSelector select={() => {}} selectedMedia={[]} allowMultiple={false} enableModal={true} />
  );
};
