import React, { useEffect, useState, useContext } from 'react';

import { ImgContext } from '../../context/Context';

const Uploader = () => {
  const { setImg } = useContext(ImgContext);

  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);

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

  const handlePaste = (evt) => {
    if (uploading || converting) {
      return;
    }

    setUploading(true);

    const data = evt.clipboardData || window.clipboardData;

    const files = data.files;
    const file = getFile(files);

    setUploading(false);

    if (file) {
      getImg(file);
      return;
    }

    const text = data.getData('text');

    if (text) {
      fetch(text)
        .then(
          (res) => res.blob(),
          (_) => {
            setUploading(false);
          }
        )
        .then(
          (blob) => {
            if (blob && blob.type && isSupported(blob.type)) {
              const file = new File([blob], `${Math.ceil(Math.random())}`, {
                lastModified: new Date().getTime(),
                type: blob.type
              });

              setUploading(false);

              if (file) {
                getImg(file);
              }
            }

            return;
          },
          (_) => {
            setUploading(false);
          }
        );
    }
  };

  const handleChange = (evt) => {
    if (uploading || converting) {
      return;
    }

    setUploading(true);

    const files = evt.currentTarget.files;
    const file = getFile(files);

    setUploading(false);

    if (file) {
      getImg(file);
    }
  };

  useEffect(() => {
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <form>
      <input
        onChange={handleChange}
        className='sr-only'
        id='upload'
        type='file'
        accept='.jpg, .jpeg, .png'
      />
      <label
        className='fixed w-screen h-screen cursor-pointer grid place-content-center p-6 group '
        htmlFor='upload'
      >
        <div className='flex justify-center p-6 rounded-md shadow-lg max-w-xl transition-all group-hover:scale-105 dark:text-white'>
          <div className='space-y-1 text-center'>
            <p>
              <span className='text-purple-500'>Выберите изображение</span> или
              перетащите его или вставьте ссылку на изображение или же вставьте
              само изображение из буфера обмена
            </p>
            <p className='text-xs text-gray-500'>
              Поддерживаемые форматы изображений: .jpg, .jpeg, .png
            </p>
          </div>
        </div>
      </label>
    </form>
  );
};

export default Uploader;
