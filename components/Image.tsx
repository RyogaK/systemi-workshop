import { Image as ExpoImage } from "expo-image";
import { cssInterop } from "nativewind";

const Image = cssInterop(ExpoImage, { className: "style" });

export default Image;
