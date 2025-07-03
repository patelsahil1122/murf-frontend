import React from 'react';

function ReusableFormCard({
   
  titleClass = '',
  subtitleClass = '',
  title,
  subtitle,
  children
}) {
  return (
   <>
      {title && <h1 className={titleClass}>{title}</h1>}
      {subtitle && <p className={subtitleClass}>{subtitle}</p>}
      {children}
    </>
  );
}

export default ReusableFormCard;