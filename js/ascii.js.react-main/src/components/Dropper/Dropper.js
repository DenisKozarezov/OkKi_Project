import React, { useContext, useState, useEffect } from 'react';

import { ImgContext } from '../../context/Context';

const Dropper = () => {
  const { setImg } = useContext(ImgContext);

  let draggingCounter = 0;

  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [dragging, setDragging] = useState(false);

  const isSupported = (type) => {
    const supported = ['image/jpeg', 'image/jpg', 'image/png'];

    return supported.includes(type);
  };

  const getFile = (files) => {
    if (files.length) {
      const file = files[0];

      if (isSupported(file.type)) {
        return file;
      }
    }
  };

  const getImg = (file) => {
    if (uploading || converting || !file) {
      return;
    }

    setConverting(true);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (evt) => {
      const img = new Image();

      img.src = evt.target.result;

      img.onload = () => {
        setConverting(false);
        setImg(img);
      };
    };
  };

  const handlePropagation = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (uploading || converting) {
      return;
    }
  };

  const handleDrag = (evt) => {
    handlePropagation(evt);
  };

  const handleDragIn = (evt) => {
    handlePropagation(evt);

    draggingCounter++;

    if (evt.dataTransfer.items && evt.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (evt) => {
    handlePropagation(evt);

    draggingCounter--;

    if (draggingCounter === 0) {
      setDragging(false);
    }
  };

  const handleDrop = (evt) => {
    handlePropagation(evt);

    setDragging(false);
    draggingCounter = 0;

    if (evt.dataTransfer.files && evt.dataTransfer.files.length > 0) {
      setUploading(true);

      const files = evt.dataTransfer.files;
      const file = getFile(files);

      setUploading(false);

      if (file) {
        getImg(file);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('dragenter', handleDragIn);
    document.addEventListener('dragleave', handleDragOut);
    document.addEventListener('dragover', handleDrag);
    document.addEventListener('drop', handleDrop);
  }, []);

  return (
    dragging && (
      <div className='bg-white w-screen h-screen fixed left-0 top-0 bottom-0 right-0 p-4 z-[1000] opacity-95 dark:bg-gray-700'>
        <div className='w-full h-full border-2 text-gray-300 border-gray-300 border-dashed rounded-md grid place-content-center pointer-events-none'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 pointer-events-none animate-bounce'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='pointer-events-none'
              d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
            />
          </svg>
        </div>
      </div>
    )
  );
};

export default Dropper;
