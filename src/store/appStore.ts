import { create } from 'zustand';

type TDevice = 'phone' | 'pad' | 'pc';

interface ITodoListStore {
  curDevice: TDevice;
  setCurDevice: () => any;
}

const useTodoListStore = create<ITodoListStore>((set) => ({
  curDevice: 'pad', // 当前设备
  setCurDevice: () =>
    set(() => {
      const clientWidth = window.innerWidth;
      if (clientWidth <= 750) {
        return { curDevice: 'phone' };
      } else if (clientWidth <= 1280 && clientWidth > 750) {
        return { curDevice: 'pad' };
      } else {
        return { curDevice: 'pc' };
      }
    }),
}));

export default useTodoListStore;
