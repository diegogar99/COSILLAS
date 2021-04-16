import React from 'react'
import add from '../../../imagenes/add.png'
import cajaFuerte from '../../../imagenes/cajaFuerte.png'
import Popup from '../../PopUp/Popup.js'
import 'bootstrap/dist/css/bootstrap.min.css'
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

  if (!values.nombreImg){
    errors.nombreImg = 'Introduzca nombre válido'
  }
  if (!values.expiracionImg || !/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9][0-9][0-9]/.test(values.expiracionImg) || values.creacionImg >= values.expiracionImg){
    errors.expiracionImg = 'Introduzca fecha válida'
  }
  return errors
}

class CuerpoImagenes extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
      showPopup:false,
      nombreImg:'',
      errors: {},
      creacionImg:fecha(),
      expiracionImg:'',
    }
    this.subirImagen=this.subirImagen.bind(this);
  }
  handleChange = ({target}) => {
    const{name,value} = target
    this.setState({[name]:value})
   
  }
  subirImagen(e){
    let img = e.target.files[0];
    console.log(img);
    
    if (img) {
      let data = new FormData();
      data.append('img', img);
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
  miListaC={
    listaC:["Categoria1","Categoria 2", "Categoria 3", "Categoria 4"]
   }
  render () {
    const { errors} = this.state
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
            text='Selecciona las imagenes:'
            cuerpo={
              <>
               <form className="pup" onSubmit={this.handleSubmit}>
                <span className="par">
                  <input type="file" name="image" multiple onChange={this.subirImagen}/>
                  <pre>      </pre>
                  <ArrayList tipo={true} valores={this.miListaC.listaC}/>
                 
                  </span>
              

                <label htmlFor="nombreImg"><pre>Nombre               </pre></label>
                  <input type="text" name="nombreImg"id="nombreImg" onChange={this.handleChange}/>
                  {errors.nombreImg && <p className="warning">{errors.nombreImg}</p>}

                <br/>
                <label htmlFor="creacionImg"><pre>Fecha de creación    </pre></label>
                  <input type="date" name="creacionImg"id="creacionImg" value={this.state.creacionImg} onChange={this.handleChange}/>
                  {errors.creacionImg && <p className="warning">{errors.creacionImg}</p>}

                <br/>
                <label htmlFor="expiracionImg"><pre>Fecha de expiración  </pre></label>
                  <input type="date" name="expiracionImg"id="expiracionImg" placeholder={"DD-MM-YYYY"} onChange={this.handleChange}/>
                  {errors.expiracionImg && <p className="warning">{errors.expiracionImg}</p>}

               
           
               
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

export default CuerpoImagenes

