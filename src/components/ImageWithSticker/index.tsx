import Image from 'next/image';
import './imageWithSticker.scss';

interface ImageWithStickerProps {
   src: string;
   width?: number;
   height?: number;
   isPriority?: boolean;
   blurDataURL?: string;
   isFill?: boolean;
}

const ImageWithSticker = ({
   src,
   isPriority,
   width,
   height,
   blurDataURL,
   isFill,
}: ImageWithStickerProps) => (
   <div className="image-with-sticker">
      <Image
         alt="photo introducing me"
         className="avatar"
         src={src}
         fill={isFill}
         loading={isPriority ? undefined : 'lazy'}
         priority={isPriority}
         width={width}
         height={height}
         placeholder={blurDataURL ? 'blur' : 'empty'}
         blurDataURL={blurDataURL}
      />

      <div className="sticker">Frontend Developer</div>
   </div>
);

export default ImageWithSticker;
