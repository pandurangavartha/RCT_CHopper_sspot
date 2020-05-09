let id = 0;

const defaultOptions = {
//   color: "#6796e6"
color: "lightgreen"
};

export default function createToast(options) {
    console.log('----------factries-------toast--------',options)
  return {
    ...defaultOptions,
    ...options,
    id: id++
  }
}