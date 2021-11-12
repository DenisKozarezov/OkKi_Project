import React, { useState, useEffect, createContext, useReducer } from 'react';

const NotificationsContext = createContext();

const Notifications = (props) => {
  const [state, dispatchNotification] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [...state, { ...action.payload }];
      case 'REMOVE_NOTIFICATION':
        return state.filter((el) => el.id !== action.id);
      default:
        return state;
    }
  }, []);

  return (
    <NotificationsContext.Provider value={dispatchNotification}>
      {props.children}
      <div className='grid gap-2 justify-items-center fixed bottom-3 left-1/2 -translate-x-1/2 z-[500]'>
        {state.map((notification) => (
          <Notifications.Item
            dispatchNotification={dispatchNotification}
            key={notification.id}
            {...notification}
          />
        ))}
      </div>
    </NotificationsContext.Provider>
  );
};

const Notification = (props) => {
  const [close, setClose] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalId(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalId);
  };

  const handleClose = () => {
    handlePauseTimer();
    setClose(true);
    setTimeout(() => {
      props.dispatchNotification({
        type: 'REMOVE_NOTIFICATION',
        id: props.id
      });
    }, 601);
  };

  useEffect(() => {
    handleStartTimer();
  }, []);

  useEffect(() => {
    if (progress === 100) {
      handleClose();
    }
  }, [progress]);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification ${
        close ? 'notification_closing' : ''
      } bg-black p-2 shadow-lg relative max-w-md inline-flex items-center rounded-md text-white overflow-hidden font-medium text-xs`}
    >
      <span className='overflow-ellipsis overflow-hidden whitespace-nowrap'>
        {props.message}
      </span>
      <button className='ml-2' onClick={handleClose}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <div
        style={{ width: `${progress}%` }}
        className='absolute h-0.5 bg-white left-0 bottom-0'
      ></div>
    </div>
  );
};

Notifications.Item = Notification;

export { Notifications, NotificationsContext };
