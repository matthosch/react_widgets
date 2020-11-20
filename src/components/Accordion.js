import React, { useState } from "react";
import classNames from "classnames";

const Accordian = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? " active" : "";

    return (
      <React.Fragment key={item.title}>
        <div
          onClick={() => onTitleClick(index)}
          className={classNames("title", { active: index === activeIndex })}
        >
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div
          className={classNames("content", {
            active: index === activeIndex,
          })}
        >
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });
  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordian;
