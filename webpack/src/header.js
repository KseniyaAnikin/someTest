import { el } from "redom";
import logo from "./assets/img/logo.svg";
import "./header.scss";

export default el('header', {class: 'page-header'}, [
  el('div', {class:'page-header-text'}, 'Welcome'),
  el('img', {class:'page-header-logo', src: logo}),
]);