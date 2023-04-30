import './scss/index.scss'
import { $ } from "../src/core/dom";

import { Page } from '@core/Page';



let page = new Page()
$('#app').append(page.getRoot())
page.afterRender()
