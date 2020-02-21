import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const ImageSwap = images => {
  let imagesContent = images.map(image => (
    <img
      key={image.name}
      name={image.name}
      alt={image.alt}
      src={image.source}
    />
  ));
  return (
    <div className="">
      <div>fdsfsd</div>
    </div>
  );
};

ImageSwap.propTypes = {
  name: PropTypes.string.isRequired,
  alt: PropTypes.string,
  source: PropTypes.string.isRequired
};

export default ImageSwap;
