import React, { useContext, useEffect, useState, useRef } from 'react';

import { v4 } from 'uuid';

import Tabs from '../../components/Tabs/Tabs';

import { ImgContext } from '../../context/Context';
import { NotificationsContext } from '../../components/Notifications/Notifications';

import { getConversion, methods, modes } from '../../utils/utils';

const Converter = (props) => {
  const resulter = useRef();
  const uploader = useRef();

  const { img, setImg } = useContext(ImgContext);
  const dispatchNotification = useContext(NotificationsContext);

  const copyToBuffer = () => {
    navigator.clipboard.writeText(result).then(() => {
      dispatchNotification({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: v4(),
          message: 'Результат успешно скопирован в буфер обмена'
        }
      });
    });
  };

  const saveAsTXT = () => {
    const a = document.createElement('a');
    const file = new Blob([result], {
      type: 'text/plain;charset=utf-8'
    });
    a.href = URL.createObjectURL(file);
    a.download = 'ASCII-JS-GENERATED-TXT';
    a.click();
    URL.revokeObjectURL(a.href);
    dispatchNotification({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: v4(),
        message: 'Результат успешно сохранен как .txt'
      }
    });
  };

  const getNewImg = () => {
    uploader.current.click();
  };

  const [result, setResult] = useState(null);
  const [params, setParams] = useState({
    mode: modes[0].value,
    method: methods[0].value,
    imgWidth: img.width || 1,
    imgHeight: img.height || 1,
    optimizeA: 95,
    optimizeRGB: 125,
    alphabet:
      '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`. ',
    cellSize: 3
  });

  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    if (img) {
      setResult(
        getConversion({
          img,
          ...params
        })
      );
    }
  }, [img, params]);

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

  return (
    result && (
      <>
        <Tabs className='p-4 shadow-lg fixed bottom-4 -translate-x-1/2 left-1/2 flex space-x-6 rounded-md z-30 bg-white sm:flex-col sm:space-y-5 sm:-translate-x-0 sm:inset-auto sm:space-x-0 sm:-translate-y-1/2 sm:left-2 sm:top-1/2 dark:bg-gray-700'>
          <div className='relative'>
            <Tabs.ItemIndicator
              tooltip='Загрузить новое изображение'
              className='grid items-center p-1 text-gray-400 hover:text-gray-700 focus-visible:text-gray-700 dark:hover:text-gray-200 dark:focus-visible:text-gray-200'
              callback={getNewImg}
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16 22H4C2.89543 22 2 21.1046 2 20V8H4V20H16V22ZM20 18H8C6.89543 18 6 17.1046 6 16V4C6 2.89543 6.89543 2 8 2H20C21.1046 2 22 2.89543 22 4V16C22 17.1046 21.1046 18 20 18ZM8 4V16H20V4H8ZM15 14H13V11H10V9H13V6H15V9H18V11H15V14Z'
                  fill='currentColor'
                  className='transition-all'
                />
              </svg>
            </Tabs.ItemIndicator>
          </div>
          <div className='relative'>
            <Tabs.ItemIndicator
              tooltip='Скопировать в буфер обмена'
              className='grid items-center p-1 text-gray-400 hover:text-gray-700 focus-visible:text-gray-700 dark:hover:text-gray-200 dark:focus-visible:text-gray-200'
              callback={copyToBuffer}
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16 22H4C2.89543 22 2 21.1046 2 20V8H4V20H16V22ZM20 18H8C6.89543 18 6 17.1046 6 16V4C6 2.89543 6.89543 2 8 2H20C21.1046 2 22 2.89543 22 4V16C22 17.1046 21.1046 18 20 18ZM8 4V16H20V4H8Z'
                  fill='currentColor'
                  className='transition-all'
                />
              </svg>
            </Tabs.ItemIndicator>
          </div>
          <div className='relative'>
            <Tabs.ItemIndicator
              tooltip='Сохранить как .txt'
              className='grid items-center p-1 text-gray-400 hover:text-gray-700 focus-visible:text-gray-700 dark:hover:text-gray-200 dark:focus-visible:text-gray-200'
              callback={saveAsTXT}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M16 22H4C2.89543 22 2 21.1046 2 20V8H4V20H16V22ZM20 18H8C6.89543 18 6 17.1046 6 16V4C6 2.89543 6.89543 2 8 2H20C21.1046 2 22 2.89543 22 4V16C22 17.1046 21.1046 18 20 18ZM8 4V16H20V4H8Z'
                  fill='currentColor'
                  className='transition-all'
                />
                <path
                  d='M13 6H15V11.5L16.75 9.75L18 11L15.25 13.75L15 14L14 15L13 14L12.75 13.75L10 11L11.25 9.75L13 11.5V6Z'
                  fill='currentColor'
                  className='transition-all'
                />
              </svg>
            </Tabs.ItemIndicator>
          </div>
          <div className='relative'>
            <Tabs.ItemIndicator
              tooltip='Параметры конвертера'
              className='grid items-center p-1 text-gray-400 hover:text-gray-700 focus-visible:text-gray-700 dark:hover:text-gray-200 dark:focus-visible:text-gray-200'
              item='01'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 23L2.5 17.5V6.5L12 1L21.5 6.5V17.5L12 23ZM12 3.312L4.5 7.653V16.347L12 20.689L19.5 16.347V7.653L12 3.311V3.312ZM12 16C10.9395 15.997 9.92294 15.5759 9.171 14.828C8.02724 13.6839 7.68525 11.9635 8.30448 10.4689C8.92371 8.97436 10.3822 8 12 8C13.0603 8.00284 14.0765 8.42402 14.828 9.172C16.3895 10.734 16.3895 13.266 14.828 14.828C14.0764 15.5757 13.0602 15.9968 12 16ZM12 10C11.0458 9.9998 10.2244 10.6736 10.0381 11.6094C9.85175 12.5452 10.3524 13.4823 11.2339 13.8476C12.1153 14.2129 13.1321 13.9047 13.6623 13.1114C14.1926 12.3182 14.0886 11.2608 13.414 10.586C13.0398 10.2098 12.5307 9.99879 12 10Z'
                  fill='currentColor'
                  className='transition-all'
                ></path>
              </svg>
            </Tabs.ItemIndicator>
            <Tabs.Item
              className='bg-white fixed p-2 z-40 shadow-lg rounded-md bottom-full left-0 sm:absolute sm:inset-auto sm:left-full sm:top-0 dark:bg-gray-700 dark:text-white'
              item='01'
            >
              <form className='flex p-2 flex-col max-h-24 space-y-2 overflow-scroll sm:max-w-sm sm:flex-row sm:space-y-0 sm:space-x-2 md:max-w-lg lg:max-w-4xl'>
                <label className='flex items-center space-x-2'>
                  <span className='whitespace-nowrap font-medium'>Режим:</span>
                  <select
                    name='mode'
                    value={params.mode}
                    onChange={(evt) => {
                      setParams((prev) => ({
                        ...prev,
                        [evt.target.name]: evt.target.value
                      }));
                    }}
                    className='border-1 rounded p-1 dark:bg-gray-800 dark:border-0'
                  >
                    {modes.map((mode) => (
                      <option key={mode.value} value={mode.value}>
                        {mode.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className='flex items-center space-x-2'>
                  <span className='whitespace-nowrap font-medium'>
                    Алфавит:
                  </span>
                  <input
                    type='text'
                    value={params.alphabet}
                    className='w-44 border-1 rounded p-1 dark:bg-gray-800 dark:border-0'
                    minLength='1'
                    name='alphabet'
                    onChange={(evt) => {
                      setParams((prev) => ({
                        ...prev,
                        [evt.target.name]: evt.target.value + ' '
                      }));
                    }}
                  />
                </label>
                <label className='flex items-center space-x-2'>
                  <span className='whitespace-nowrap font-medium'>
                    Размер ячейки:
                  </span>
                  <input
                    type='number'
                    value={params.cellSize}
                    name='cellSize'
                    className='w-16 border-1 rounded p-1 dark:bg-gray-800 dark:border-0'
                    min='1'
                    onChange={(evt) => {
                      setParams((prev) => ({
                        ...prev,
                        [evt.target.name]: evt.target.value
                      }));
                    }}
                  />
                </label>
              </form>
            </Tabs.Item>
          </div>
          <div className='relative'>
            <Tabs.ItemIndicator
              tooltip='Параметры конвертации'
              className='grid items-center p-1 text-gray-400 hover:text-gray-700 focus-visible:text-gray-700 dark:hover:text-gray-200 dark:focus-visible:text-gray-200'
              item='02'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7 21H5V19H2V17H5V15H7V21ZM22 19H9V17H22V19ZM17 15H15V13H2V11H15V9.012H17V15ZM22 13H19V11H22V13ZM11 9H9V7H2V5H9V3H11V9ZM22 7H13V5H22V7Z'
                  fill='currentColor'
                  className='transition-all'
                ></path>
              </svg>
            </Tabs.ItemIndicator>
            <Tabs.Item
              className='bg-white fixed p-2 z-40 shadow-lg rounded-md bottom-full left-0 sm:absolute sm:inset-auto sm:left-full sm:top-0 dark:bg-gray-700 dark:text-white'
              item='02'
            >
              <form className='flex p-2 flex-col max-h-24 space-y-2 overflow-scroll sm:max-w-sm sm:flex-row sm:space-y-0 sm:space-x-2 md:max-w-lg lg:max-w-4xl'>
                <label className='flex items-center space-x-2'>
                  <span className='whitespace-nowrap font-medium'>Метод:</span>
                  <select
                    name='method'
                    value={params.method}
                    onChange={(evt) => {
                      setParams((prev) => ({
                        ...prev,
                        [evt.target.name]: evt.target.value
                      }));
                    }}
                    className='border-1 rounded p-1 dark:bg-gray-800 dark:border-0'
                  >
                    {methods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className='flex items-center space-x-2'>
                  <span className='whitespace-nowrap font-medium'>Ширина:</span>
                  <input
                    type='number'
                    value={params.imgWidth}
                    name='imgWidth'
                    className='w-16 border-1 rounded p-1 dark:bg-gray-800 dark:border-0'
                    min='1'
                    onChange={(evt) => {
                      setParams((prev) => ({
                        ...prev,
                        [evt.target.name]: evt.target.value
                      }));
                    }}
                  />
                </label>
                <label className='flex items-center space-x-2'>
                  <span className='whitespace-nowrap font-medium'>Высота:</span>
                  <input
                    type='number'
                    value={params.imgHeight}
                    name='imgHeight'
                    className='w-16 border-1 rounded p-1 dark:bg-gray-800 dark:border-0'
                    min='1'
                    onChange={(evt) => {
                      setParams((prev) => ({
                        ...prev,
                        [evt.target.name]: evt.target.value
                      }));
                    }}
                  />
                </label>
                <label className='flex items-center space-x-2'>
                  <span className='whitespace-nowrap font-medium'>
                    Допуск A:
                  </span>
                  <input
                    type='number'
                    value={params.optimizeA}
                    className='w-16 border-1 rounded p-1 dark:bg-gray-800 dark:border-0'
                    name='optimizeA'
                    min='1'
                    max='254'
                    onChange={(evt) => {
                      setParams((prev) => ({
                        ...prev,
                        [evt.target.name]: evt.target.value
                      }));
                    }}
                  />
                </label>
                <label className='flex items-center space-x-2'>
                  <span className='whitespace-nowrap font-medium'>
                    Допуск RGB:
                  </span>
                  <input
                    type='number'
                    value={params.optimizeRGB}
                    name='optimizeRGB'
                    className='w-16 border-1 rounded p-1 dark:bg-gray-800 dark:border-0'
                    min='1'
                    max='254'
                    onChange={(evt) => {
                      setParams((prev) => ({
                        ...prev,
                        [evt.target.name]: evt.target.value
                      }));
                    }}
                  />
                </label>
              </form>
            </Tabs.Item>
          </div>
        </Tabs>
        <form>
          <textarea
            style={{ fontFamily: 'monospace' }}
            readOnly
            ref={resulter}
            value={result}
            className='resulter w-screen h-screen fixed left-0 top-0 bottom-0 right-0 resize-none block leading-none text-xs text-center whitespace-pre dark:bg-gray-800 dark:text-white'
          ></textarea>
          <input
            onChange={handleChange}
            ref={uploader}
            className='sr-only'
            type='file'
            accept='.jpg, .jpeg, .png'
          />
        </form>
      </>
    )
  );
};

export default Converter;
