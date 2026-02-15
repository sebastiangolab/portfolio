import Image from 'next/image';
import './imageWithSticker.scss';

interface ImageWithStickerProps {
   className?: string;
   src: string;
   blurDataURL?: string;
   width?: number;
   height?: number;
   isPriority?: boolean;
   isFill?: boolean;
}

const ImageWithSticker = ({
   className,
   src,
   blurDataURL,
   width,
   height,
   isPriority,
   isFill,
}: ImageWithStickerProps) => (
   <div className={`image-with-sticker ${className || ''}`}>
      <Image
         className="avatar"
         alt="photo introducing me"
         src={src}
         width={width}
         height={height}
         placeholder={blurDataURL ? 'blur' : 'empty'}
         blurDataURL={blurDataURL}
         loading={isPriority ? undefined : 'lazy'}
         priority={isPriority}
         fill={isFill}
      />

      <div className="sticker">Software Engineer</div>
   </div>
);

export default ImageWithSticker;
