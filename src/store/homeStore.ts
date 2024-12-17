import { create } from 'zustand';

interface IHomeStore {
  videoLoaded: number;
  setVideoLoaded: () => any;
}

const useHomeStore = create<IHomeStore>((set) => ({
  videoLoaded: 1, // 首页视频是否都加载完成

  setVideoLoaded: () =>
    set((prev) => {
      return { videoLoaded: prev.videoLoaded + 1 };
    }),
}));

export default useHomeStore;
