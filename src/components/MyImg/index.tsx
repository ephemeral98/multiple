import { FC, useEffect, useState } from 'react';
import * as NextImg from 'next/image';

const MyImg: FC<{
  src: string;
  className?: string;
  width?: number;
  height?: number;
}> = (props) => {
  const [loadedSrc, setLoadedSrc] = useState('');
  const [reg, setReg] = useState(/https?:\/\/[^\/]+/g);

  useEffect(() => {
    const img = new Image();
    const url = props.src.replace(reg, '');
    img.src = url;
    img.onload = () => {
      setLoadedSrc(url);
      // console.log('大图加载完成');
    };
  }, [props.src]);

  return (
    <>
      {!loadedSrc ? (
        <NextImg.default
          src={props.src}
          width={props.width || 300}
          height={props.height || 300}
          alt=""
          className={props.className}
        />
      ) : (
        <NextImg.default
          src={loadedSrc}
          width={props.width || 300}
          height={props.height || 300}
          alt=""
          unoptimized
          className={props.className}
        />
      )}
    </>
  );
};

export default MyImg;
