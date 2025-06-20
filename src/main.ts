import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import 'primevue/resources/themes/saga-blue/theme.css' // atau tema lain
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import './assets/main.css'
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import ToggleButton from 'primevue/togglebutton';


const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(router)
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Button', Button);
app.component('Message', Message);
app.component('Card', Card);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dialog', Dialog);
app.component('ToggleButton', ToggleButton);


app.mount('#app')
