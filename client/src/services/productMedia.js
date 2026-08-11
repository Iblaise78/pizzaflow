import fallbackImage from '../assets/zuzi99-pizza-3010062.jpg';
import tamasImage from '../assets/tamas-pap-XLmhRnV8yuc-unsplash.jpg';
import tommaoImage from '../assets/tommao-wang-brC9jqsAxmU-unsplash.jpg';
import shouravImage from '../assets/shourav-sheikh-Q9VEWorDhaY-unsplash.jpg';
import danielImage from '../assets/daniel-QmN3yuv5L_c-unsplash.jpg';
import dineshImage from '../assets/dinesh-lunked-pxmBc2lDiMU-unsplash.jpg';
import fatimaImage from '../assets/fatima-akram-uU0Anw-8Vsg-unsplash.jpg';
import klaraImage from '../assets/klara-kulikova-RsiNFKMvqtg-unsplash.jpg';
import klaraImageTwo from '../assets/klara-kulikova-jvWZYnxBDlQ-unsplash.jpg';
import mahyarImage from '../assets/mahyar-motebassem-pGA4zHvpo5E-unsplash.jpg';
import pabloImage from '../assets/pablo-pacheco-D3Mag4BKqns-unsplash.jpg';
import pranjallImage from '../assets/pranjall-kumar-sejqj6Eaqe8-unsplash.jpg';
import shayanImage from '../assets/shayan-ramesht-exSEmuA7R7k-unsplash.jpg';

const bundledImages = {
  '/zuzi99-pizza-3010062.jpg': fallbackImage,
  '/tamas-pap-XLmhRnV8yuc-unsplash.jpg': tamasImage,
  '/tommao-wang-brC9jqsAxmU-unsplash.jpg': tommaoImage,
  '/shourav-sheikh-Q9VEWorDhaY-unsplash.jpg': shouravImage,
  '/daniel-QmN3yuv5L_c-unsplash.jpg': danielImage,
  '/dinesh-lunked-pxmBc2lDiMU-unsplash.jpg': dineshImage,
  '/fatima-akram-uU0Anw-8Vsg-unsplash.jpg': fatimaImage,
  '/klara-kulikova-RsiNFKMvqtg-unsplash.jpg': klaraImage,
  '/klara-kulikova-jvWZYnxBDlQ-unsplash.jpg': klaraImageTwo,
  '/mahyar-motebassem-pGA4zHvpo5E-unsplash.jpg': mahyarImage,
  '/pablo-pacheco-D3Mag4BKqns-unsplash.jpg': pabloImage,
  '/pranjall-kumar-sejqj6Eaqe8-unsplash.jpg': pranjallImage,
  '/shayan-ramesht-exSEmuA7R7k-unsplash.jpg': shayanImage
};

function resolveImage(url) {
  return bundledImages[url] || url;
}

export const fallbackProductImage = fallbackImage;

export function productImages(product) {
  const images = Array.isArray(product?.imageUrls) ? product.imageUrls.filter(Boolean) : [];
  const directImage = product?.imageUrl || product?.productImage;
  return images.length ? [resolveImage(images[0])] : (directImage ? [resolveImage(directImage)] : []);
}

export function productImage(product) {
  return productImages(product)[0] || fallbackProductImage;
}
