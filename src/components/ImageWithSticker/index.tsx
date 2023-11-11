import './imageWithSticker.scss';

interface ImageWithStickerProps {
   src: string;
   retinaSrc: string;
}

const ImageWithSticker = ({ src, retinaSrc }: ImageWithStickerProps) => (
   <div className="image-with-sticker">
      <img
         src={src}
         srcSet={`${retinaSrc} 2x`}
         alt="my face avatar"
         className="avatar"
      />

      <div className="sticker">Frontend Developer</div>
   </div>
);

export default ImageWithSticker;
