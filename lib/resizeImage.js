var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EXIF from 'exif-js/exif';
import base64ToBlob from './base64ToBlob';
import includes from 'lodash/includes';
function convertCanvasToImage(canvas, type) {
    let image = new Image();
    image.src = canvas.toDataURL(type);
    return image;
}
function convertImageToCanvas(imageEle, maxWidth, maxHeight, Orientation) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const originWidth = imageEle.width;
    const originHeight = imageEle.height;
    if (!ctx) {
        return false;
    }
    let targetWidth = originWidth;
    let targetHeight = originHeight;
    if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        }
        else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
    }
    if (Orientation && Orientation !== 1) {
        switch (Orientation) {
            case 6: // 旋转90度
                canvas.width = targetHeight;
                canvas.height = targetWidth;
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(imageEle, 0, -targetHeight, targetWidth, targetHeight);
                break;
            case 3: // 旋转180度
                ctx.rotate(Math.PI);
                ctx.drawImage(imageEle, -targetWidth, -targetHeight, targetWidth, targetHeight);
                break;
            case 8: // 旋转-90度
                canvas.width = targetHeight;
                canvas.height = targetWidth;
                ctx.rotate((3 * Math.PI) / 2);
                ctx.drawImage(imageEle, -targetWidth, 0, targetWidth, targetHeight);
                break;
            default:
                break;
        }
    }
    else {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(imageEle, 0, 0, targetWidth, targetHeight);
    }
    return canvas;
}
function getOrientation(file) {
    return new Promise(resolve => {
        EXIF.getData(file, function () {
            resolve(EXIF.getTag(this, 'Orientation'));
        });
    });
}
/**
 *
 * @param file 图片文件
 * @param maxHeight 压缩后的最大高度，默认1024
 * @param maxWidth 压缩后的最大宽度，默认1025
 */
export default function (file, maxHeight = 1024, maxWidth = 1024) {
    if (!file) {
        return Promise.resolve(file);
    }
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        if (includes(file.type, 'image')) {
            const reader = new FileReader();
            const image = new Image();
            const Orientation = yield getOrientation(file);
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                image.src = e.target.result;
            };
            image.onload = e => {
                const canvas = convertImageToCanvas(image, maxHeight, maxWidth, Orientation);
                if (!canvas) {
                    return resolve('');
                }
                const imageEle = convertCanvasToImage(canvas, file.type);
                const newFile = base64ToBlob(imageEle.src, file.name);
                if (newFile.size < file.size) {
                    resolve(newFile);
                }
                else {
                    resolve(file);
                }
            };
        }
    }));
}
