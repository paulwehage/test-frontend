export type ExampleSlice = {
  titleExample: string;
};

export type ExampleUpdateField = {
  key: keyof ExampleSlice;
  value: ExampleSlice[keyof ExampleSlice];
};
