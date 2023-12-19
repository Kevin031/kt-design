import { App, DefineComponent, VueElement } from "vue";

const withInstall = (comp: any) => {
  comp.install = (app: App) => {
    app.component(comp.name, comp);
  };
  return comp;
};

export default withInstall;
