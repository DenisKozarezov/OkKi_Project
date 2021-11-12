import React, { useContext } from 'react';

import { ImgContext } from '../../context/Context';

import Uploader from '../uploader/Uploader';
import Converter from '../converter/Converter';
import Dropper from '../../components/Dropper/Dropper';

import { Notifications } from '../../components/Notifications/Notifications';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';

const Main = () => {
  const { img } = useContext(ImgContext);

  return (
    <>
      <Notifications>
        <Dropper></Dropper>
        {img ? <Converter></Converter> : <Uploader></Uploader>}
        <ThemeSwitcher />
      </Notifications>
    </>
  );
};

export default Main;
