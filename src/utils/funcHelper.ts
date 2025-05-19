import axios from "axios";
import { API_KEY_YOUTUBE } from "constants/constants";
import R from "src/assets/R";
import * as SecureStore from 'expo-secure-store';

const generateId = () => {
    return `id-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  };
const getYouTubeVideoId = (url: string) => {
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|shorts\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
const requestTitleYtb = async(urlYtb: string) => {
    // console.log('linkYtb2: ', linkYtb);
    let videoId = getYouTubeVideoId(urlYtb);
    // console.log('videoId2: ', videoId);

    const apiKey = API_KEY_YOUTUBE;
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
    console.log('videoId: ', videoId);

    try {
    const response = await axios.get(apiUrl);
    if (response.data.items.length > 0) {
        const videoTitle = response.data.items[0].snippet.title;
        // console.log('videoTitle: ', videoTitle);
        return videoTitle;
    } else {
        console.error('No video found for the given ID.');
        return R.strings().title_not_found;
    }
    } catch (error) {
        console.error('Error getting title: ', error);
        return R.strings().err_get_video_title;
    }
}

function hexToRgb(hex: any) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}
//blur color
const colorBlur = (color: string, opacity?: number) => {
    return `rgba(${hexToRgb(color)?.r}, ${hexToRgb(color)?.g}, ${hexToRgb(color)?.b}, ${opacity || 1})`;
};

const generateSimpleUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  

//get and save uniqueid device
const getUniqueId = async (): Promise<string> => {
    const key = 'device-unique-id';
  
    let uniqueId = await SecureStore.getItemAsync(key);
    if (!uniqueId) {
      uniqueId = generateSimpleUUID(); // Tạo UUID mới
      await SecureStore.setItemAsync(key, uniqueId);
    }
  
    return uniqueId;
  };
export {generateId, requestTitleYtb, colorBlur, getUniqueId}