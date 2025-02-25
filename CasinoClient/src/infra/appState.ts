import { create } from 'zustand';

export interface IPointValues {
  pointOne: string | null;
  pointTwo: string | null;
  pointThree: string | null;
}

export interface IAppState {
  session: any | null;
  credits: number;
  balance: number;
  account: Record<string, any> | null;
  twistAvailable: boolean;
  pointOne: any | null;
  pointTwo: any | null;
  pointThree: any | null;
  setCredits: (newCredits: number) => void;
  setBalance: (newBalance: number) => void;
  setAccount: (newAccount: Record<string, any> | null) => void;
  setSession: (newSession: any) => void;
  setTwistAvailable: (availability: boolean) => void;
  setPointOne: (newPontOne: any) => void;
  setPointTwo: (newPointTwo: any) => void;
  setPointThree: (newPointThree: any) => void;
  setPointsToDefault: () => void;
  delayedPointsUpdate: (pointsValues: IPointValues) => Promise<void[]>;
}

export const useAppStore = create<IAppState>((set) => ({
  session: null,
  credits: 0,
  balance: 0,
  account: null,
  twistAvailable: true,
  pointOne: null,
  pointTwo: null,
  pointThree: null,
  setCredits: (newCredits) => set({ credits: newCredits }),
  setBalance: (newBalance) => set({ balance: newBalance }),
  setAccount: (newAccount) => set({ account: newAccount }),
  setSession: (newSession) => set({ session: newSession }),
  setTwistAvailable: (newTwistState) => set({ twistAvailable: newTwistState }),
  setPointOne: (newPointOne) => set({ pointOne: newPointOne }),
  setPointTwo: (newPointTwo) => set({ pointTwo: newPointTwo }),
  setPointThree: (newPointThree) => set({ pointThree: newPointThree }),
  setPointsToDefault: () => set({ pointOne: null, pointTwo: null, pointThree: null }),
  delayedPointsUpdate: (values) => {
    return Promise.all([
      new Promise<void>((resolve) => setTimeout(() => {
        set({ pointOne: values.pointOne })
        resolve()
      }, 1000)),
      new Promise<void>((resolve) => setTimeout(() => {
        set({ pointTwo: values.pointTwo })
        resolve()
      }, 2000)),
      new Promise<void>((resolve) => setTimeout(() => {
        set({ pointThree: values.pointThree })
        resolve()
      }, 3000))
    ])
  }
}));