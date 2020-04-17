import React, { Component } from 'react';
import Buscador from './components/Buscador'
import Resultado from './components/Resultado'

class App extends Component{
  state = {
      termino : '',
      imagenes: [],
      pagina: ''
  }
  
  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }
  paginaAnterior = () => {
    //lee el state de la pagina actual
    let pagina = this.state.pagina;
    //resta uno a la pagina actual
    if(pagina === 1) return null;
    pagina--;
    //agrega el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }
  paginaSiguiente = () => {
    //lee el state de la pagina actual
    let pagina = this.state.pagina;
    //suma uno a la pagina actual
    pagina++;
    //agrega el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }
  //Peticion fetch a la api de pixabay
  consultarApi = () => {
    const termino  = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=14153040-4f429875226383235ab1b9184&q=${termino}&per_page=30&page=${pagina}`;
    fetch(url)
    .then(response => response.json())
    .then(result => this.setState({imagenes: result.hits}))
  }
  datosBusqueda = (termino) => {
    this.setState({
      termino
    }, () => {
      this.consultarApi();
    })
  }
  render(){
    return (
      <div className="App container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador 
            datosBusqueda = {this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado 
            imagenes = {this.state.imagenes}
            paginaAnterior = {this.paginaAnterior}
            paginaSiguiente = {this.paginaSiguiente}
          />
        </div>
      </div>
    )
  }
}

export default App;
