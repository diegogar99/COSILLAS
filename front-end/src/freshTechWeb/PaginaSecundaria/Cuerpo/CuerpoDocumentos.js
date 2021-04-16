import React, {useState} from 'react'
import add from '../../../imagenes/add.png'
import cajaFuerte from '../../../imagenes/cajaFuerte.png'
import Popup from '../../PopUp/Popup.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import ArrayList from '../../Desplegable/ArrayList.js'


function fecha(){
  var actual= new Date();
  console.log(actual);
  var dia = actual.getDate();
  var anyo = actual.getFullYear();
  var mes = actual.getMonth() + 1;
  return `${dia}-${mes}-${anyo}`;
}

const validate = values =>{
  const errors = {}

  if (!values.nombreDoc){
    errors.nombreDoc = 'Introduzca nombre válido'
  }
  if (!values.expiracionDoc || !/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9][0-9][0-9]/.test(values.expiracionDoc) || values.creacionDoc >= values.expiracionDoc){
    errors.expiracionDoc = 'Introduzca fecha válida'
  }
  
  return errors

}
class CuerpoDocumentos extends React.Component {

  constructor(props){
    super(props)
    this.state = {
     
      showPopup:false,
      nombreDoc:'',
      errors: {},
      creacionDoc:fecha(),
      expiracionDoc:'',
    }
    this.subirArchivos=this.subirArchivos.bind(this);
  }
  miListaC={
    listaC:["Categoria1","Categoria 2", "Categoria 3", "Categoria 4"]
   }
   
  handleChange = ({target}) => {
    const{name,value} = target
    this.setState({[name]:value})
   
  }
  subirArchivos(e){
    let file = e.target.files[0];
    console.log(file);
    
    if (file) {
      let data = new FormData();
      data.append('file', file);
      // axios.post('/files', data)...
    }
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  handleSubmit =e => {
    e.preventDefault()
    const {errors, ...sinErrors} = this.state
    const result = validate(sinErrors)
    this.setState({errors:result})
  
    if(!Object.keys(result).length){ //Si tiene propiedades, hay error
      //Envio formulario
      console.log('Formulario válido')
    }else{

      console.log('Formulario inválido')
    }
  }

  render () {
    const {errors} = this.state
    return (
        <>
       
        <div className="cajaFuerte">
          <img className="caja" src={cajaFuerte} alt="cajaFuerte" />
        </div>
        <div className="textoImagen">
          <p>No hay ningún contenido</p>
          <p>Haga click en el icono + de la derecha</p>
        </div>
       
        <button className="addButton" onClick={this.togglePopup.bind(this)}><img className="add" src={add} alt="add" /></button>
        {this.state.showPopup ? 
        
          <Popup
            text='Selecciona los ficheros:'
            cuerpo={
              <>
       
              <form className="pup" onSubmit={this.handleSubmit}>
                <span className="par">
                  <input type="file" name="files" multiple onChange={this.subirArchivos}/>
                  <pre>      </pre>
                  <ArrayList tipo={true} valores={this.miListaC.listaC}/>
                </span>
                <label htmlFor="nombreDoc"><pre>Nombre               </pre></label>
                  <input type="text" name="nombreDoc"id="nombreDoc" onChange={this.handleChange}/>
                  {errors.nombreDoc && <p className="warning">{errors.nombreDoc}</p>}

                <br/>
                <label htmlFor="creacionDoc"><pre>Fecha de creación    </pre></label>
                  <input type="date" name="creacionDoc"id="creacionDoc" value={this.state.creacionDoc} onChange={this.handleChange}/>
                

               <br/>
                <label htmlFor="expiracionDoc"><pre>Fecha de expiración  </pre></label>
                  <input type="date" name="expiracionDoc"id="expiracionDoc" placeholder={"DD-MM-YYYY"} onChange={this.handleChange}/>
                  {errors.expiracionDoc && <p className="warning">{errors.expiracionDoc}</p>}

                <br/>
                <input type='submit' className="Send" value='Subir'/>
                <input type='button' className="Close" value='Cerrar' onClick={this.togglePopup.bind(this)}/>
              </form>
              
              </>
            }
            sendData={<button type="Submit" className="Send" onClick={() => this.postData()}>Send</button>}
           
            eliminada={false}

          />
          
          : null
        }
       
      </>
    )
  }
}

export default CuerpoDocumentos