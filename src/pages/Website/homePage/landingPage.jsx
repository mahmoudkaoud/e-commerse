import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import sale1 from "../../../../public/sale1.png"
import sale2 from "../../../../public/sale2.png"

export default function LandingPage() {

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return(
    <div className="flex bg-gray-100 mb-12">
      <div>
        <img src={sale1} className="w-full"/>
      </div>
      <div className="">
        <ImageGallery items={images}/>
      </div>
      <div>
        <img src={sale2} className="w-full"/>
      </div>
    </div>

  )

}