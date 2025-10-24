import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Button } from 'ui/components/button';
import { MediaProcessing } from './media-processing';

export interface UploadedFile {
  file: File | null;
  base64Url: string;
  type: 'image' | 'video';
}

export function UploadMedia() {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <Button className='uppercase'>add media</Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='fixed inset-0 z-50 bg-black/80' />
        <DialogPrimitive.Content className='fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-white p-2.5 w-[60vw]'>
          <div>
            <div className='flex justify-between items-center'>
              <DialogPrimitive.Title className='uppercase'>media processing</DialogPrimitive.Title>
              <DialogPrimitive.Close asChild>
                <Button>
                  <Cross1Icon />
                </Button>
              </DialogPrimitive.Close>
            </div>
            <MediaProcessing />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
