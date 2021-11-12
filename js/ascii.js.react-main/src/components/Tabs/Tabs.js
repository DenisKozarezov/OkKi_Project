import React, { useState, createContext, useContext } from 'react';

const TabsContext = createContext({
  activeItem: null,
  setActiveItem: null
});

const Tabs = (props) => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <TabsContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={`tabs ${props.className}`}>{props.children}</div>
    </TabsContext.Provider>
  );
};

const Item = (props) => {
  const { activeItem } = useContext(TabsContext);

  return (
    <div
      className={`tabs__item ${
        props.item === activeItem ? 'tabs__item_active' : ''
      } ${props.className}`}
    >
      <div className='tabs__item-content'>{props.children}</div>
    </div>
  );
};

const ItemIndicator = (props) => {
  const { activeItem, setActiveItem } = useContext(TabsContext);

  const handleClick = () => {
    if (props.item) {
      setActiveItem(props.item);
    }

    if (props.callback) {
      props.callback();
    }
  };

  return (
    <div>
      <button
        type='button'
        role='tab'
        aria-selected={props.item === activeItem}
        className={`tabs__item-indicator ${props.className} ${
          props.item === activeItem ? 'tabs__item-indicator_active' : ''
        } tooltip-initiator`}
        onClick={handleClick}
      >
        {props.children}
      </button>
      <span
        className='
              tooltip
            bg-black
              absolute
              left-full
              top-0
              p-2
              shadow-lg
              flex
              rounded-md
              text-white
              whitespace-nowrap
              font-medium
              text-xs'
      >
        {props.tooltip}
      </span>
    </div>
  );
};

Tabs.Item = Item;
Tabs.ItemIndicator = ItemIndicator;

export default Tabs;
