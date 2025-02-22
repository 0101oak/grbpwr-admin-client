import Input from 'components/ui/input';
import Text from 'components/ui/text';
import { getBase64File } from 'features/utilitty/getBase64';
import { useMediaSelectorStore } from 'lib/stores/media/store';
import { useSnackBarStore } from 'lib/stores/store';
import React, { FC, useState } from 'react';

export const DragDrop: FC = () => {
  const { showMessage } = useSnackBarStore();
  const { uploadState, prepareUpload, status } = useMediaSelectorStore();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const processFiles = async (files: FileList) => {
    if (files && files.length > 0) {
      const file = files[0];
      prepareUpload({
        selectedFiles: [file],
        selectedFileUrl: await getBase64File(file),
      });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();

    let files: FileList | null = null;
    if (e.type === 'drop' && 'dataTransfer' in e) {
      files = e.dataTransfer.files;
    } else if (e.type === 'change' && e.target instanceof HTMLInputElement && e.target.files) {
      files = e.target.files;
    }

    if (files && files.length > 0) {
      processFiles(files);
    } else {
      showMessage('no files selected', 'error');
    }
    if ('dataTransfer' in e) {
      setIsDragging(false);
    }
    if (e.target instanceof HTMLInputElement) {
      e.target.value = '';
    }
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(dragging);
  };

  return (
    <div className='w-full'>
      <div className='w-full'>
        <div
          className='flex items-center justify-center w-full'
          onDragOver={(e) => handleDrag(e, true)}
          onDragEnter={(e) => handleDrag(e, true)}
          onDragLeave={(e) => handleDrag(e, false)}
          onDrop={handleFileChange}
        >
          <div className='flex items-center justify-center w-full h-40 p-4 bg-inactive'>
            {!uploadState.selectedFiles.length && (
              <label className='cursor-pointer border border-text rounded px-4 py-2 hover:bg-gray-50 w-full sm:w-auto text-center'>
                DRAG AND DROP YOUR MEDIA HERE
                <Input
                  name='files'
                  type='file'
                  accept='image/*, video/*'
                  onChange={handleFileChange}
                  className='hidden'
                />
              </label>
            )}
            {uploadState.selectedFiles.length > 0 && (
              <Text variant='uppercase'>Media is selected</Text>
            )}
          </div>
          {status.isLoading && (
            <div className='ml-4 animate-spin w-10 h-10 border-2 border-gray-300 border-t-text-600 rounded-full' />
          )}
        </div>
      </div>
    </div>
  );
};
