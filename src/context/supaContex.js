//https://script.google.com/macros/s/AKfycbw1Vv5rNF_u2OttaefUikKG8RqsTBAshvyGylIKrPa6KfyYV8iAhcQ7cYSe39bhK_t_DQ/exec secretaria general del concejo
//https://script.google.com/macros/s/AKfycbyFeDPD0O_cDoMSjompa3dDtL-078Ayl2AFqU4tlPGJ3xorb1gkIsqW6uhGs-Eqac9Hxw/exec PATRIMONIO

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
        setLink('https://lookerstudio.google.com/embed/reporting/e451316a-c7f1-42d4-8fcd-5b59951f137d/page/p_z1sgbeexbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252");
        setLink3('https://script.google.com/macros/s/AKfycbyKnwIfyrfNiMpeigcK4IP2JDGyEbwY2she8CL6WLMLCqxhmVdSL9gKwCcdQx8526Zb/exec')
        setNombre('Ánderson Auqui')
        setDireccion('Gestión Administrativa')
        break;
      case 'nunezmi@gadmriobamba.gob.ec': //ADMINISTRATIVO
        setLink('https://lookerstudio.google.com/embed/reporting/e451316a-c7f1-42d4-8fcd-5b59951f137d/page/p_z1sgbeexbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252");
        setLink3('https://script.google.com/macros/s/AKfycbyKnwIfyrfNiMpeigcK4IP2JDGyEbwY2she8CL6WLMLCqxhmVdSL9gKwCcdQx8526Zb/exec')
        setNombre('Mauricio Nuñez')
        setDireccion('Gestión Administrativa')
        break; 
      case 'neiram@gadmriobamba.gob.ec': //ADMINISTRATIVO
        setLink('https://lookerstudio.google.com/embed/reporting/e451316a-c7f1-42d4-8fcd-5b59951f137d/page/p_z1sgbeexbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252");
        setLink3('https://script.google.com/macros/s/AKfycbyKnwIfyrfNiMpeigcK4IP2JDGyEbwY2she8CL6WLMLCqxhmVdSL9gKwCcdQx8526Zb/exec')
        setNombre('María José Neira')
        setDireccion('Gestión Administrativa')
        break; 
      case 'ramosll@gadmriobamba.gob.ec': //ADMINISTRATIVO
        setLink('https://lookerstudio.google.com/embed/reporting/e451316a-c7f1-42d4-8fcd-5b59951f137d/page/p_z1sgbeexbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252");
        setLink3('https://script.google.com/macros/s/AKfycbyKnwIfyrfNiMpeigcK4IP2JDGyEbwY2she8CL6WLMLCqxhmVdSL9gKwCcdQx8526Zb/exec')
        setNombre('Lorena Ramos')
        setDireccion('Gestión Administrativa')
        break; 
      case 'santillane@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw07HgEB_nFdvxqzKouQcVGMrY5vvt0_KbksCHsSdoA8l1scDfv4bhOMmS73lycZLnp/exec')
        setNombre('Erika Santillán')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'remachejd@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw07HgEB_nFdvxqzKouQcVGMrY5vvt0_KbksCHsSdoA8l1scDfv4bhOMmS73lycZLnp/exec')
        setNombre('Juan Diego Remache')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'roberto.vallejo@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw07HgEB_nFdvxqzKouQcVGMrY5vvt0_KbksCHsSdoA8l1scDfv4bhOMmS73lycZLnp/exec')
        setNombre('Roberto Vallejo')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'davalosc@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw07HgEB_nFdvxqzKouQcVGMrY5vvt0_KbksCHsSdoA8l1scDfv4bhOMmS73lycZLnp/exec')
        setNombre('Cesar Dávalos')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'ornar@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw07HgEB_nFdvxqzKouQcVGMrY5vvt0_KbksCHsSdoA8l1scDfv4bhOMmS73lycZLnp/exec')
        setNombre('Ramiro Orna')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'monteroe@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw07HgEB_nFdvxqzKouQcVGMrY5vvt0_KbksCHsSdoA8l1scDfv4bhOMmS73lycZLnp/exec')
        setNombre('Edgar Montero')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'alvears@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw07HgEB_nFdvxqzKouQcVGMrY5vvt0_KbksCHsSdoA8l1scDfv4bhOMmS73lycZLnp/exec')
        setNombre('Stephanie Alvear')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'chuquimarcaj@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw07HgEB_nFdvxqzKouQcVGMrY5vvt0_KbksCHsSdoA8l1scDfv4bhOMmS73lycZLnp/exec')
        setNombre('Jose Chuquimarca')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'vascof@gadmriobamba.gob.ec': //ORDENAMIENTO TERRITORIAL
        setLink('https://lookerstudio.google.com/embed/reporting/3cdd4c47-8054-44f1-951f-fe4955f97e8f/page/p_lfkxvi4xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw07HgEB_nFdvxqzKouQcVGMrY5vvt0_KbksCHsSdoA8l1scDfv4bhOMmS73lycZLnp/exec')
        setNombre('Fernanda Vasco')
        setDireccion('Departamento de Ordenamiento Territorial')
        break;
      case 'moncayog@gadmriobamba.gob.ec': //SECRETARIA GENERAL DEL CONCEJO
        setLink('https://lookerstudio.google.com/embed/reporting/13f437d2-3771-468b-ba56-4cbfc4d9ee50/page/p_pwms3dlaad');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw1Vv5rNF_u2OttaefUikKG8RqsTBAshvyGylIKrPa6KfyYV8iAhcQ7cYSe39bhK_t_DQ/exec')
        setNombre('Guido Moncayo')
        setDireccion('Secretaría General del Concejo')
        break;
      case 'martinezg@gadmriobamba.gob.ec': //SECRETARIA GENERAL DEL CONCEJO
        setLink('https://lookerstudio.google.com/embed/reporting/13f437d2-3771-468b-ba56-4cbfc4d9ee50/page/p_pwms3dlaad');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw1Vv5rNF_u2OttaefUikKG8RqsTBAshvyGylIKrPa6KfyYV8iAhcQ7cYSe39bhK_t_DQ/exec')
        setNombre('Geovanna Martinez')
        setDireccion('Secretaría General del Concejo')
        break;
      case 'nataly.arevalo@gadmriobamba.gob.ec': //SECRETARIA GENERAL DEL CONCEJO
        setLink('https://lookerstudio.google.com/embed/reporting/13f437d2-3771-468b-ba56-4cbfc4d9ee50/page/p_pwms3dlaad');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw1Vv5rNF_u2OttaefUikKG8RqsTBAshvyGylIKrPa6KfyYV8iAhcQ7cYSe39bhK_t_DQ/exec')
        setNombre('Nataly Arévalo')
        setDireccion('Secretaría General del Concejo')
        break;
      case 'dennys.urquizo@gadmriobamba.gob.ec': //SECRETARIA GENERAL DEL CONCEJO
        setLink('https://lookerstudio.google.com/embed/reporting/13f437d2-3771-468b-ba56-4cbfc4d9ee50/page/p_pwms3dlaad');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw1Vv5rNF_u2OttaefUikKG8RqsTBAshvyGylIKrPa6KfyYV8iAhcQ7cYSe39bhK_t_DQ/exec')
        setNombre('Dennys Urquizo')
        setDireccion('Secretaría General del Concejo')
        break;
      case 'guallic@gadmriobamba.gob.ec': //SECRETARIA GENERAL DEL CONCEJO
        setLink('https://lookerstudio.google.com/embed/reporting/13f437d2-3771-468b-ba56-4cbfc4d9ee50/page/p_pwms3dlaad');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw1Vv5rNF_u2OttaefUikKG8RqsTBAshvyGylIKrPa6KfyYV8iAhcQ7cYSe39bhK_t_DQ/exec')
        setNombre('Catherine Gualli')
        setDireccion('Secretaría General del Concejo')
        break;
      case 'diazf@gadmriobamba.gob.ec': //SECRETARIA GENERAL DEL CONCEJO
        setLink('https://lookerstudio.google.com/embed/reporting/13f437d2-3771-468b-ba56-4cbfc4d9ee50/page/p_pwms3dlaad');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw1Vv5rNF_u2OttaefUikKG8RqsTBAshvyGylIKrPa6KfyYV8iAhcQ7cYSe39bhK_t_DQ/exec')
        setNombre('Fernando Díaz')
        setDireccion('Secretaría General del Concejo')
        break;
      case 'alvarezd@gadmriobamba.gob.ec': //SECRETARIA GENERAL DEL CONCEJO
        setLink('https://lookerstudio.google.com/embed/reporting/13f437d2-3771-468b-ba56-4cbfc4d9ee50/page/p_pwms3dlaad');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw1Vv5rNF_u2OttaefUikKG8RqsTBAshvyGylIKrPa6KfyYV8iAhcQ7cYSe39bhK_t_DQ/exec')
        setNombre('Dolores Álvarez')
        setDireccion('Secretaría General del Concejo')
        break;
      case 'vallejor@gadmriobamba.gob.ec': //SECRETARIA GENERAL DEL CONCEJO
        setLink('https://lookerstudio.google.com/embed/reporting/13f437d2-3771-468b-ba56-4cbfc4d9ee50/page/p_pwms3dlaad');
        setLink2("https://docs.google.com/spreadsheets/d/1IIfDxULuk5TszwRxFwthbsDrr_8HlP5srcPai-xvUfQ/edit?usp=sharing")
        setLink3('https://script.google.com/macros/s/AKfycbw1Vv5rNF_u2OttaefUikKG8RqsTBAshvyGylIKrPa6KfyYV8iAhcQ7cYSe39bhK_t_DQ/exec')
        setNombre('Ramiro Vallejo')
        setDireccion('Secretaría General del Concejo')
        break;
      case 'huilcav@gadmriobamba.gob.ec': //REGISTRO DE LA PROPIEDAD
        setLink('https://lookerstudio.google.com/embed/reporting/a8c32965-6228-4eb2-9432-e219034cce23/page/p_2ts0qp1xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252")
        setLink3('https://script.google.com/macros/s/AKfycbzUCrAcoChq-4MxoKnACXMOr_7tcGf4Gvs8ZUE89ZE8S7mf4-P6kFnrT2kLzSEaw3RtJw/exec')
        setNombre('Germán Huilca')
        setDireccion('Gestión de Registro de la Propiedad') 
        break;
      case 'galarzae@gadmriobamba.gob.ec': //REGISTRO DE LA PROPIEDAD
        setLink('https://lookerstudio.google.com/embed/reporting/a8c32965-6228-4eb2-9432-e219034cce23/page/p_2ts0qp1xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252")
        setLink3('https://script.google.com/macros/s/AKfycbzUCrAcoChq-4MxoKnACXMOr_7tcGf4Gvs8ZUE89ZE8S7mf4-P6kFnrT2kLzSEaw3RtJw/exec')
        setNombre('Elodia Galarza')
        setDireccion('Gestión de Registro de la Propiedad')
        break;
      case 'vallejoag@gadmriobamba.gob.ec': //AMBIENTAL
        setLink('https://lookerstudio.google.com/embed/reporting/c897c2af-5ec5-400e-b675-a976c72b4949/page/p_t583nm8wbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbzLcF3kWhmSZflVe8Vc12NYya7Nz6RPE4idmv1UxHQxEib6KkoPI2gELObHtZ4CpfNr/exec')
        setNombre('Angel Vallejo')
        setDireccion('Gestión Ambiental, Salubridad e Higiene')
        break;
      case 'andres.viteri@gadmriobamba.gob.ec': //AMBIENTAL
        setLink('https://lookerstudio.google.com/embed/reporting/c897c2af-5ec5-400e-b675-a976c72b4949/page/p_t583nm8wbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbzLcF3kWhmSZflVe8Vc12NYya7Nz6RPE4idmv1UxHQxEib6KkoPI2gELObHtZ4CpfNr/exec')
        setNombre('Andrés Viteri')
        setDireccion('Gestión Ambiental, Salubridad e Higiene')
        break;
      case 'melenal@gadmriobamba.gob.ec': //AMBIENTAL
        setLink('https://lookerstudio.google.com/embed/reporting/c897c2af-5ec5-400e-b675-a976c72b4949/page/p_t583nm8wbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbzLcF3kWhmSZflVe8Vc12NYya7Nz6RPE4idmv1UxHQxEib6KkoPI2gELObHtZ4CpfNr/exec')
        setNombre('Luis Melena')
        setDireccion('Gestión Ambiental, Salubridad e Higiene')
        break;
      case 'jimenezs@gadmriobamba.gob.ec': //AMBIENTAL
        setLink('https://lookerstudio.google.com/embed/reporting/c897c2af-5ec5-400e-b675-a976c72b4949/page/p_t583nm8wbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbzLcF3kWhmSZflVe8Vc12NYya7Nz6RPE4idmv1UxHQxEib6KkoPI2gELObHtZ4CpfNr/exec')
        setNombre('Silvia Jimenez')
        setDireccion('Gestión Ambiental, Salubridad e Higiene')
        break;
      case 'chaucace@gadmriobamba.gob.ec': //AMBIENTAL
        setLink('https://lookerstudio.google.com/embed/reporting/c897c2af-5ec5-400e-b675-a976c72b4949/page/p_t583nm8wbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbzLcF3kWhmSZflVe8Vc12NYya7Nz6RPE4idmv1UxHQxEib6KkoPI2gELObHtZ4CpfNr/exec')
        setNombre('Estefanía Chauca')
        setDireccion('Gestión Ambiental, Salubridad e Higiene')
        break;
      case 'vasconeze@gadmriobamba.gob.ec': //Patrimonio Cultural
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbyFeDPD0O_cDoMSjompa3dDtL-078Ayl2AFqU4tlPGJ3xorb1gkIsqW6uhGs-Eqac9Hxw/exec')
        setNombre('Érika Vásconez')
        setDireccion('Gestión de Patrimonio Cultural')
        break;
      case 'vasconeze@gadmriobamba.gob.ec': //Patrimonio Cultural
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbyFeDPD0O_cDoMSjompa3dDtL-078Ayl2AFqU4tlPGJ3xorb1gkIsqW6uhGs-Eqac9Hxw/exec')
        setNombre('Érika Vásconez')
        setDireccion('Gestión de Patrimonio Cultural')
        break;
      case 'reald@gadmriobamba.gob.ec': //Patrimonio Cultural
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbyFeDPD0O_cDoMSjompa3dDtL-078Ayl2AFqU4tlPGJ3xorb1gkIsqW6uhGs-Eqac9Hxw/exec')
        setNombre('Danny Real')
        setDireccion('Gestión de Patrimonio Cultural')
        break;
      case 'mejiad@gadmriobamba.gob.ec': //Patrimonio Cultural
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbyFeDPD0O_cDoMSjompa3dDtL-078Ayl2AFqU4tlPGJ3xorb1gkIsqW6uhGs-Eqac9Hxw/exec')
        setNombre('Danilo Mejía')
        setDireccion('Gestión de Patrimonio Cultural')
        break;
      case 'pombozaa@gadmriobamba.gob.ec': //Patrimonio Cultural
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbyFeDPD0O_cDoMSjompa3dDtL-078Ayl2AFqU4tlPGJ3xorb1gkIsqW6uhGs-Eqac9Hxw/exec')
        setNombre('Andrés Pomboza')
        setDireccion('Gestión de Patrimonio Cultural')
        break;
      case 'lopezd@gadmriobamba.gob.ec': //Patrimonio Cultural
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbyFeDPD0O_cDoMSjompa3dDtL-078Ayl2AFqU4tlPGJ3xorb1gkIsqW6uhGs-Eqac9Hxw/exec')
        setNombre('Milton Lopez')
        setDireccion('Gestión de Patrimonio Cultural')
        break;
      case 'chavezf@gadmriobamba.gob.ec': //Patrimonio Cultural
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbyFeDPD0O_cDoMSjompa3dDtL-078Ayl2AFqU4tlPGJ3xorb1gkIsqW6uhGs-Eqac9Hxw/exec')
        setNombre('Fernando Chavez')
        setDireccion('Gestión de Patrimonio Cultural')
        break;
      case 'segovial@gadmriobamba.gob.ec': //Patrimonio Cultural
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbyFeDPD0O_cDoMSjompa3dDtL-078Ayl2AFqU4tlPGJ3xorb1gkIsqW6uhGs-Eqac9Hxw/exec')
        setNombre('Luis Segovia')
        setDireccion('Gestión de Patrimonio Cultural')
        break;
      case 'robayowr@gadmriobamba.gob.ec': //Patrimonio Cultural
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbyFeDPD0O_cDoMSjompa3dDtL-078Ayl2AFqU4tlPGJ3xorb1gkIsqW6uhGs-Eqac9Hxw/exec')
        setNombre('William Robayo')
        setDireccion('Gestión de Patrimonio Cultural')
        break;
      case 'andocillam@gadmriobamba.gob.ec': //CULTURA, DEPORTES Y RECREACION
        setLink('https://lookerstudio.google.com/embed/reporting/8e4fceda-a164-4639-84a0-2c8ad984f488/page/p_gxh7yabxbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbwE1666Z2zlBWv5mniF30VYzLzNFXx_z8UGmNkPI0fwx15yYPxoIzeQ1GXmUtnjgK3gMw/exec')
        setNombre('Marco Andocilla')
        setDireccion('Gestión de Cultura, Deportes y Recreación')
        break;
      case 'verad@gadmriobamba.gob.ec': //DESARROLLO SOCIAL Y HUMANO
        setLink('https://lookerstudio.google.com/embed/reporting/19d55ce7-1ae4-4280-ae14-2c93ec51a2a5/page/p_lt1zgy9wbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbx6IHNCV-VTAvNO0l6RG5QtJWgb4L_LlfCUWhxJ2W7b8vu7T4AFj1Rd7YmKsWFqu0_FZA/exec')
        setNombre('Doris Vera')
        setDireccion('Gestión de Desarrollo Social y Humano')
        break;
      case 'ayalaje@gadmriobamba.gob.ec': //DESARROLLO SOCIAL Y HUMANO
        setLink('https://lookerstudio.google.com/embed/reporting/19d55ce7-1ae4-4280-ae14-2c93ec51a2a5/page/p_lt1zgy9wbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbx6IHNCV-VTAvNO0l6RG5QtJWgb4L_LlfCUWhxJ2W7b8vu7T4AFj1Rd7YmKsWFqu0_FZA/exec')
        setNombre('Jissela Ayala')
        setDireccion('Gestión de Desarrollo Social y Humano')
        break;
      case 'mullol@gadmriobamba.gob.ec': //DESARROLLO SOCIAL Y HUMANO
        setLink('https://lookerstudio.google.com/embed/reporting/19d55ce7-1ae4-4280-ae14-2c93ec51a2a5/page/p_lt1zgy9wbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbx6IHNCV-VTAvNO0l6RG5QtJWgb4L_LlfCUWhxJ2W7b8vu7T4AFj1Rd7YmKsWFqu0_FZA/exec')
        setNombre('Luis Mullo')
        setDireccion('Gestión de Desarrollo Social y Humano')
        break;
      case 'munoza@gadmriobamba.gob.ec': //COMUNICACION
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbzFAshcrUHylXuxHq64mPrb_lG-HWgRjreWT5KMDsHO6OIPzqbFu1hIgWufirrEqmZ4/exec')
        setNombre('Ana Muñoz')
        setDireccion('Gestión de Comunicacion')
        break;
      case 'agilabs@gadmriobamba.gob.ec': //COMUNICACION
        setLink('https://lookerstudio.google.com/embed/reporting/57f6b116-b8df-4bac-b225-1bf10790dbc3/page/p_x25ck02xbd');
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbzFAshcrUHylXuxHq64mPrb_lG-HWgRjreWT5KMDsHO6OIPzqbFu1hIgWufirrEqmZ4/exec')
        setNombre('Bryan Agila')
        setDireccion('Gestión de Comunicacion')
        break;
      case 'echeveriar@gadmriobamba.gob.ec': //FINANCIERO
        setLink('https://lookerstudio.google.com/embed/reporting/bc2ff5b0-4e4c-43bc-9c12-303159b35f31/page/p_0o5zax41cd'); 
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252');
        setLink3('https://script.google.com/macros/s/AKfycbzHOlfi8uyl6XyVxw0K_c4h8LaprK1zb1Zv_1HvhmiMS-k5bpdVkMTVb2hn7DzaHNzv/exec')
        setNombre('Rocío Echeverría')
        setDireccion('Gestión Financiera')
        break;
      case 'paucarle@gadmriobamba.gob.ec': //OBRAS PUBLICAS 
        setLink('https://lookerstudio.google.com/embed/reporting/52cfd912-8375-4da8-812a-465ace9f8938/page/p_i7l6ne0vbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252")
        setLink3('https://script.google.com/macros/s/AKfycbyVDIgcrAKKm5ilWLE0DUrwEytH3Yltd5u-IK7wubG3yhjzkwbJwWJHYpwL0AzszAy3/exec')
        setNombre('Lucía Paucar')
        setMapa("https://www.arcgis.com/apps/dashboards/db8047c4d5fb42adb8902fea286a3a09")
        setDireccion('Gestión de Obras Públicas')
        break;
      case 'padillaj@gadmriobamba.gob.ec': //OBRAS PUBLICAS 
        setLink('https://lookerstudio.google.com/embed/reporting/52cfd912-8375-4da8-812a-465ace9f8938/page/p_i7l6ne0vbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252")
        setLink3('https://script.google.com/macros/s/AKfycbyVDIgcrAKKm5ilWLE0DUrwEytH3Yltd5u-IK7wubG3yhjzkwbJwWJHYpwL0AzszAy3/exec')
        setNombre('Jaime Padilla')
        setMapa("https://www.arcgis.com/apps/dashboards/db8047c4d5fb42adb8902fea286a3a09")
        setDireccion('Gestión de Obras Públicas')
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      case 'neiram@gadmriobamba.gob.ec': //SERVICIOS MUNICIPALES
        setLink('https://lookerstudio.google.com/embed/reporting/52db98c6-f191-4d84-96d4-6ded09d01efa/page/p_pi29rz5xbd');
        setLink2("https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252")
        setLink3('https://script.google.com/macros/s/AKfycbxoZnqzBlYi70moLioI_c5xTHQyz34z2KNC_rZDM2O9oieyVMaxwUO_SuBFrjnPRE73Kw/exec')
        setNombre('María Neira')
        setDireccion('Gestión de Servicios Municipales')
        break;
      
      case 'villaciso@gadmriobamba.gob.ec': //CONSEJO CANTONAL
        setLink('https://lookerstudio.google.com/embed/reporting/11ad4979-295a-4cf1-9b69-0f26740b7725/page/p_tqwfrvz6bd'); 
        setLink2('https://docs.google.com/spreadsheets/d/1th1pwRKEYJeeEW52oobjJdZXhQv-9wFUMZbc_FwNfiQ/edit#gid=432656252')
        setLink3('https://script.google.com/macros/s/AKfycbxDgmjVOHUEidAADgqrXO81s6IA95-euEoyc1jBT7xgPAi2YmFegPkzSEouuNfuTArQpQ/exec')
        setNombre('Olga Villacis')
        setDireccion('Gestión de Consejo Cantonal de Protección de Derechos')
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
      

      ////////////////////////////////////////////////////////////
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
