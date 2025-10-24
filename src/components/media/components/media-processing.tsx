import { useState } from 'react';
import Input from 'ui/components/input';
import Text from 'ui/components/text';
import { DragDrop } from './drag-drop';
import { UploadedFile } from './upload-media';

export function MediaProcessing({}: {}) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  return (
    <div className='w-full h-full'>
      <div className='flex items-start justify-between'>
        <div className='border border-text h-[400px] w-2/5 flex flex-col justify-center items-center relative before:content-[""] before:absolute before:inset-0  before:z-10'>
          <div className='relative'>
            <DragDrop setUploadedFile={setUploadedFile} />
          </div>
          <Text variant='uppercase'>or</Text>
          <div className='w-full z-20 px-7'>
            <Input name='url' placeholder='ENTER URL' className='w-full' />
          </div>
        </div>
        <div>aspect ratio</div>
      </div>
    </div>
  );
}

{
  /* <div className='w-80 h-[400px]  border border-black'>
          <Media
            src={uploadedFile.base64Url}
            alt={uploadedFile.file?.name ?? ''}
            type={uploadedFile.type}
            controls={uploadedFile.type === 'video'}
            className='w-full h-full'
            aspectRatio='auto'
          />
        </div> */
}
