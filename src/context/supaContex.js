import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '../utility/SupabaseClient';
import { assign } from 'lodash';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = async (email, password) => supabase.auth.signInWithPassword({ email, password });
const reset = async (email) => supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'http://localhost:3000/account/update-password',
})
const cambiar = async (new_password) => await supabase.auth.updateUser({ password: new_password })

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [linkLooker, setLink] = useState(null);
  const [linkPAC, setLink2] = useState(null);
  const [linkDoc, setLink3] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [mapa, setMapa] = useState(null);
  const [direccion, setDireccion] = useState(null);

  async function getClientes() {
    try {
      const { data, error } = await supabase.from('pacPlanificacion').select('*');

      console.log(data);
      console.log(error);

      return data;
    } catch (error) {
      return error;
    }
  }

  async function addClient(cliente) {
    const {
      codigo,
      nombreProgramaFinanciero,
      partida,
      nombrePartida,
      codigoOrientadorGasto,
      descripcionGasto,
      asignacionInicial,
      codificado,
      reformaPresupuesto,
      presupuestoCodificado2023,
      traspasos,
      presupuestoCodificado,
      id,
    } = cliente;

    const agenteUid = user.id;
    console.log(cliente);
    try {
      const { data, error } = await supabase
        .from('pacPlanificacion')
        .insert({
          codigo,
          nombreProgramaFinanciero,
          partida,
          nombrePartida,
          codigoOrientadorGasto,
          descripcionGasto,
          asignacionInicial,
          codificado,
          reformaPresupuesto,
          presupuestoCodificado2023,
          traspasos,
          presupuestoCodificado,
          id,
        })
        .single();
      console.log(error);
      if (error !== null) {
        return 'FAIL';
      }

      return 'OK';
    } catch (error) {
      return 'FAIL';
    }
  }

  async function updateClient(cliente) {
    const {
      codigo,
      nombreProgramaFinanciero,
      partida,
      nombrePartida,
      codigoOrientadorGasto,
      descripcionGasto,
      asignacionInicial,
      codificado,
      reformaPresupuesto,
      presupuestoCodificado2023,
      traspasos,
      presupuestoCodificado,
      id,
    } = cliente;

    try {
      const { data, error } = await supabase
        .from('pacPlanificacion')
        .update({
          codigo,
          nombreProgramaFinanciero,
          partida,
          nombrePartida,
          codigoOrientadorGasto,
          descripcionGasto,
          asignacionInicial,
          codificado,
          reformaPresupuesto,
          presupuestoCodificado2023,
          traspasos,
          presupuestoCodificado,
          id,
        })
        .eq('id', cliente.id)
        .select();

      return 'OK';
    } catch (error) {
      return 'FAIL';
    }
  }

  async function deleteClient(id) {
    try {
      const { data, error } = await supabase.from('pacPlanificacion').delete().eq('id', id).select();

      return 'OK';
    } catch (error) {
      return 'FAIL';
    }
  }

  async function uploadDocument(file) {
    const uuid = uuidv4();
    const { data, error } = await supabase.storage.from('images').upload(user.id + '/' + uuid, file); // Cooper/ASDFASDFASDF uuid, taylorSwift.png -> taylorSwift.png

    if (data) {
      console.log(data);

      return data;
    }
    console.log(error);

    return error;
  }

  const getLinkLooker = (usuario) =>{
    //LINK LOOKER
    switch (usuario) {      
      //LISTO
      case 'auquia@gadmriobamba.gob.ec': //ADMINISTRATIVO
        setLink('https://lookerstudio.google.com/embed/reporting/c897c2af-5ec5-400e-b675-a976c72b4949/page/p_t583nm8wbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252");
        setLink3('https://script.google.com/macros/s/AKfycbxKxQvpG7MynR75qqVexp-wdaarZzwpJh-RfzpqSeuHWJIj3zXWt76nwSbwgE8hY-h8/exec')
        setNombre('Ánderson Auqui')
        setDireccion('Gestión Administrativa')
        break;
      case 'santillane@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbycXRn8L94TEjO9I5aDtdb0u8SnclfvpvFZWX0uyEwP0j0HIFJjuKzX3zOHGgKdfAbm/exec')
        setNombre('Erika Santillán')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'remachejd@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbycXRn8L94TEjO9I5aDtdb0u8SnclfvpvFZWX0uyEwP0j0HIFJjuKzX3zOHGgKdfAbm/exec')
        setNombre('Juan Diego Remache')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'huilcav@gadmriobamba.gob.ec': //REGISTRO DE LA PROPIEDAD
        setLink('https://lookerstudio.google.com/embed/reporting/a8c32965-6228-4eb2-9432-e219034cce23/page/p_2ts0qp1xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252")
        setLink3('https://script.google.com/macros/s/AKfycbxw4uXEez6jPOWRd0N8TKHyHtn4Xhx41wWGyOfCxtzJcD1JrsNMPEHqbyKD8N1rLdpP/exec')
        setNombre('Germán Huilca')
        setDireccion('Gestión de Registro de la Propiedad')
        break;
      case 'galarzae@gadmriobamba.gob.ec': //REGISTRO DE LA PROPIEDAD
        setLink('https://lookerstudio.google.com/embed/reporting/a8c32965-6228-4eb2-9432-e219034cce23/page/p_2ts0qp1xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252")
        setLink3('https://script.google.com/macros/s/AKfycbxw4uXEez6jPOWRd0N8TKHyHtn4Xhx41wWGyOfCxtzJcD1JrsNMPEHqbyKD8N1rLdpP/exec')
        setNombre('Elodia Galarza')
        setDireccion('Gestión de Registro de la Propiedad')
        break;
      case 'neiram@gadmriobamba.gob.ec': //SERVICIOS MUNICIPALES
        setLink('https://lookerstudio.google.com/embed/reporting/52db98c6-f191-4d84-96d4-6ded09d01efa/page/p_pi29rz5xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252")
        setLink3('https://script.google.com/macros/s/AKfycbxoZnqzBlYi70moLioI_c5xTHQyz34z2KNC_rZDM2O9oieyVMaxwUO_SuBFrjnPRE73Kw/exec')
        setNombre('María Neira')
        setDireccion('Gestión de Servicios Municipales')
        break;
      case 'tellom@gadmriobamba.gob.ec': //OBRAS PUBLICAS 
        setLink('https://lookerstudio.google.com/embed/reporting/52cfd912-8375-4da8-812a-465ace9f8938/page/p_i7l6ne0vbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252")
        setLink3('https://script.google.com/macros/s/AKfycbwoc0TngThjgamsUeJ49T4nsTlZZud0rhnzvcjL3cGvYfiZL1Dc1kb3MpKHZsG8wni5/exec')
        setNombre('Isabel Tello')
        setMapa("https://www.arcgis.com/apps/dashboards/db8047c4d5fb42adb8902fea286a3a09")
        setDireccion('Gestión de Obras Públicas')
        break;
      case 'duchic@gadmriobamba.gob.ec': //AMBIENTAL
        setLink('https://lookerstudio.google.com/embed/reporting/c897c2af-5ec5-400e-b675-a976c72b4949/page/p_t583nm8wbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbx89V-gyXOb3Hh6pV2roovc-g6fio_B4HyB_nGPrGyEdLzn1VZIB6KsAzEC8GHtojgS/exec')
        setNombre('Carlos Duchi')
        setDireccion('Gestión Ambiental, Salubridad e Higiene')
        break;
      case 'villaciso@gadmriobamba.gob.ec': //CONSEJO CANTONAL
        setLink('https://lookerstudio.google.com/embed/reporting/11ad4979-295a-4cf1-9b69-0f26740b7725/page/p_tqwfrvz6bd'); 
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbxDgmjVOHUEidAADgqrXO81s6IA95-euEoyc1jBT7xgPAi2YmFegPkzSEouuNfuTArQpQ/exec')
        setNombre('Olga Villacis')
        setDireccion('Gestión de Consejo Cantonal de Protección de Derechos')
        break;
      case 'erazoa@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252")
        setLink3('https://script.google.com/macros/s/AKfycbyoR_mmNpgALSaDvvAjz69NnnMx7zsdNIMIqMVJOebwBvtweLVj63hpCNk1Q4jWur_O/exec')
        setNombre('Ana Lucía Erazo')
        setDireccion('Gestión de Ordenamiento Territorial')
        break;
      
      case 'cujilemaa@gadmriobamba.gob.ec': //CULTURA, DEPORTES Y RECREACION
        setLink('https://lookerstudio.google.com/embed/reporting/8e4fceda-a164-4639-84a0-2c8ad984f488/page/p_gxh7yabxbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbybobHh-vc0RyKRJsmnjhN5lSmPnhPOhDh152b7nFdQwFTvLFULFF29jW_XXcyM7iC2iA/exec')
        setNombre('Achic Cujilema')
        setDireccion('Gestión de Cultura, Deportes y Recreación')
        break;
      case 'verad@gadmriobamba.gob.ec': //DESARROLLO SOCIAL Y HUMANO
        setLink('https://lookerstudio.google.com/embed/reporting/19d55ce7-1ae4-4280-ae14-2c93ec51a2a5/page/p_lt1zgy9wbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbw1k0eAfB8KRhGT-8keb2lc8d6-rLzfKecWIEUF7UtXeyEFLnHnWVvUr0Lg-TdcjMCQ/exec')
        setNombre('Doris Vera')
        setDireccion('Gestión de Desarrollo Social y Humano')
        break;
      case 'vasconeze@gadmriobamba.gob.ec': //Patrimonio Cultural
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbxeUKHR9O27DlmgrRvk4YGlJ4W3QBccfYUTg7c1vH7rf0nqqfsiunkDOegibcd3bWZD/exec')
        setNombre('Érika Vásconez')
        setDireccion('Gestión de Patrimonio Cultural')
        break;
      case 'munoza@gadmriobamba.gob.ec': //COMUNICACION
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbz64BWtRxRi1BQssASBjSfnr03fhnqehH9igbv7MmpyCBTTQav_dNZNMZqzBso83MWq/exec')
        setNombre('Ana Muñoz')
        setDireccion('Gestión de Comunicacion')
        break;
      case 'guadalupej@gadmriobamba.gob.ec': //TALENTO HUMANO
        setLink('https://lookerstudio.google.com/embed/reporting/2fcee205-f8af-45e5-91d8-56c6799b2272/page/p_spui33s5bd'); /////////////////////////SIN DASHBOARD
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbwlJ0sLzozVtaCc7EDR-kIauTrx76FguBgOOxr3pEgqKjFhnOF9lt-wpmNYNDKg6pQY/exec')
        setNombre('Juan Carlos Guadalupe')
        setDireccion('Gestión de Talento Humano')
        break;
      case 'jaramillod@gadmriobamba.gob.ec': //TICS
        setLink('https://lookerstudio.google.com/embed/reporting/274a3d9d-3ef8-4d83-905a-0f7c40923d75/page/p_78e3q8kxbd'); 
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbzeMhMdaVG4j1FDTm195OgPA_yURu4quTJHV7voohrzvg8xQjRkMDuu22-lwLd3abr3xA/exec')
        setNombre('Dylan Jaramillo')
        setDireccion('Gestión de Tecnologías de la Información')
        break;
      case 'nathalyhipo123@gmail.com': //Alcaldia
        setLink('https://lookerstudio.google.com/embed/reporting/318df137-4dfd-47aa-9878-6ebe3b9cb7d7/page/p_9e3iik4wbd'); 
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbwiRP7ZtBlc_8ueAM2G5Eyu2nFSYq2LkSHIka68vGNyw9OKOujClwdTFRzrN580Bs3c/exec')
        setNombre('Nathaly Hipo')
        setDireccion('Alcaldía')
        break;
      case 'girona@gadmriobamba.gob.ec': //FINANCIERO
        setLink(''); /////////////////////sin dashboard
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252');
        setLink3('https://script.google.com/macros/s/AKfycbxNsnvYEtC3ouHDEOP1cETV9chr8stP6z71ShZsOpqMZJZ4tKckNEZXOCh7FNZ0CWmf/exec')
        setNombre('Carina Girón')
        setDireccion('Gestión Financiera')
        break;

      ////////////////////////////////////////////////////////////
      case 'sebasmena@gmail.com': //ADMINISTRATIVO
        setLink('https://lookerstudio.google.com/embed/reporting/e451316a-c7f1-42d4-8fcd-5b59951f137d/page/p_t0tc9iexbd');
        setNombre('Sebastian Mena')
        setDireccion('Gestión Administrativa')
        break;
      case 'tecnico-oopp@gadmr.com': //MOVILIDAD
        setLink('https://lookerstudio.google.com/embed/reporting/4554de4e-d93d-4838-bc0f-c92a9e4f53e2/page/p_u2lgj44wbd');
        setNombre('Sebastian Mena')
        setDireccion('Gestión de Movilidad, Tránsito y Transporte')
        break;
    }

    //console.log(linkLooker, nombre, direccion)
  }

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
        setAuth(true);

        getLinkLooker(session.user.email)

      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, nombre, direccion, linkPAC, linkLooker, linkDoc, mapa, login, reset, cambiar, getClientes, addClient, updateClient, deleteClient, uploadDocument }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
