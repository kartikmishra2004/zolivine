import { create } from 'zustand';

type Animation = {
    animations: { [key: string]: boolean };
    setAnimated: (key: string, value: boolean) => void;
    hasAnimated: (key: string) => boolean;
};

export const useAnimation = create<Animation>((set, get) => ({
    animations: {},
    setAnimated: (key, value) =>
        set((state) => ({
            animations: { ...state.animations, [key]: value }
        })),
    hasAnimated: (key) => !!get().animations[key],
}));