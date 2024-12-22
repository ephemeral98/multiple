import { IMetadata } from '@/service/useNft';
import { create } from 'zustand';

interface INFTStore {
  myNft: IMetadata[];
  setMyNft: (nft: IMetadata[]) => any;
  getMyNft: () => IMetadata[];
}

const useNFTStore = create<INFTStore>((set, get) => ({
  myNft: [],
  setMyNft: (nft) => {
    set((prev) => {
      return { myNft: nft };
    });
  },
  getMyNft: () => {
    return get().myNft;
  },
}));

export default useNFTStore;
