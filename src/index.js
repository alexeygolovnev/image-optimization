import img1 from "./images/image1.jpeg";
import img2 from "./images/image2.jpeg";
import img3 from "./images/image3.jpeg";
import img4 from "./images/image4.jpeg";
import img5 from "./images/image5.jpeg";
import img6 from "./images/image6.jpeg";
import img7 from "./images/image7.jpeg";
import img8 from "./images/image8.jpeg";
import img9 from "./images/image9.jpeg";
import img10 from "./images/image10.jpeg";

[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10].forEach(
  (_, index) => {
    const picture = document.createElement("PICTURE");
    const source1 = document.createElement("SOURCE");
    const source2 = document.createElement("SOURCE");
    const img = document.createElement("IMG");

    const currentIndex = index + 1;

    source1.srcset = `
        adaptive-images/image${currentIndex}-320.webp 320w,
        adaptive-images/image${currentIndex}-768.webp 768w,
        adaptive-images/image${currentIndex}-1024.webp 1024w,
        adaptive-images/image${currentIndex}-1920.webp 1920w`;
    source1.type = "image/webp";
    source1.setAttribute(
      "sizes",
      `
        "(max-width: 320px) 280px,
        (max-width: 768px) 728px,
        (max-width: 1024px) 992px,
        1920px"
    `
    );

    source2.srcset = `
        adaptive-images/image${currentIndex}-320.jpeg 320w,
        adaptive-images/image${currentIndex}-768.jpeg 768w,
        adaptive-images/image${currentIndex}-1024.jpeg 1024w,
        adaptive-images/image${currentIndex}-1920.jpeg 1920w`;
    source2.type = "image/jpeg";
    source2.setAttribute(
      "sizes",
      `
        "(max-width: 320px) 280px,
        (max-width: 768px) 728px,
        (max-width: 1024px) 992px,
        1920px"
    `
    );

    img.src = `adaptive-images/image${currentIndex}-1920.jpeg`;
    img.alt = `image ${currentIndex}`;
    img.setAttribute(
      "srcset",
      `
    adaptive-images/image${currentIndex}-320.jpeg 320w,
    adaptive-images/image${currentIndex}-768.jpeg 768w,
    adaptive-images/image${currentIndex}-1024.jpeg 1024w,
    adaptive-images/image${currentIndex}-1920.jpeg 1920w
  `
    );
    img.setAttribute(
      "sizes",
      `
        (max-width: 320px) 280px,
        (max-width: 768px) 728px,
        (max-width: 1024px) 992px,
        1920px
    `
    );
    img.setAttribute("loading", "lazy");

    picture.appendChild(source1);
    picture.appendChild(source2);
    picture.appendChild(img);

    const body = document.querySelector("body");

    body.appendChild(picture);
  }
);
