import React, { Component } from "react";
import Header from "./Header";
import Formulario from "./Formulario";
import Resultado from "./Resultado";
import { obtenerDiferenciaAnio, calcularMarca, obtenerPlan } from "../helper";
import Resumen from "./Resumen";

class App extends Component {
  state = {
    resultado: "",
    datos: {}
  };

  cotizarSeguro = datos => {
    const { marca, plan, year } = datos;
    //Agregar una base de 2000,
    let resultado = 2000;
    //Obtener la diferencia de a;os y
    const diferencia = obtenerDiferenciaAnio(year);
    // por cada a;o restar el 3% al valor del seguro
    resultado -= (diferencia * 3 * resultado) / 100;
    console.log(resultado);
    //Americano 15% asiatico y europeo 30% de incremento al valor actual
    resultado = calcularMarca(marca) * resultado;
    //el plan del auto, el basico incrementa el valor 20% y cobertura completa 50%
    let incrementoPlan = obtenerPlan(plan);
    //dependiendo del plan
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
    const datosAuto = {
      marca: marca,
      plan: plan,
      year: year
    };

    this.setState({
      resultado: resultado,
      datos: datosAuto
    });
  };

  render() {
    return (
      <div className="contenedor">
        <Header titulo="Cotizador de Seguro de Auto" />
        <div className="contenedor-formulario">

          <Formulario cotizarSeguro={this.cotizarSeguro} />
          <Resumen datos={this.state.datos}/>
          <Resultado resultado={this.state.resultado} />

        </div>
      </div>
    );
  }
}

export default App;
