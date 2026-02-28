export type presetStatisticDateType =
  | {
      label: string;
      id: string;
      lastPresetId?: string;
      startDate: Date;
      endDate: Date;
    }
  | {
      label: string;
      id: string;
      startDate: number;
      lastPresetId?: string;
      endDate: number;
    };
