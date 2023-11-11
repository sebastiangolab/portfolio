import './imageWithSticker.scss';

interface ImageWithStickerProps {
   src: string;
   retinaSrc: string;
}

const ImageWithSticker = ({ src, retinaSrc }: ImageWithStickerProps) => (
   <div className="image-with-sticker">
      <img
         alt="my face avatar"
         className="avatar"
         src={src}
         srcSet={`${retinaSrc} 2x`}
      />

      <div className="sticker">Frontend Developer</div>
   </div>
);

export default ImageWithSticker;
