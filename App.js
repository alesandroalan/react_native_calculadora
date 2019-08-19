import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

class Botao extends Component{
  constructor(props){
    super(props);
    this.styles = StyleSheet.create({
      botao:{
        flex:parseInt(props.c),
        backgroundColor:props.bg,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        borderWidth:0.3,
        borderColor:'#cccccc'
      },
      bt_texto:{
        fontSize:28,
        color:props.color,
      }
    });
  }
  render(){
    return(
      <TouchableOpacity style={this.styles.botao} onPress={this.props.onPress}>
        <Text style={this.styles.bt_texto}>{this.props.t}</Text>
      </TouchableOpacity>
    );
  }
}

export default class Calculadora extends Component{

  constructor(props){
    super(props);
    this.state = {resultado:0};
    this.calculou = false;
    this.calcularResultado = this.calcularResultado.bind(this);
    this.digitar = this.digitar.bind(this);
    this.clear = this.clear.bind(this);

  }

  clear(){
    let s = this.state;
    s.resultado = 0;
    this.setState(s);
    this.calculou = false;
  }

  calcularResultado(){
    let s = this.state;
    s.resultado = eval(s.resultado);
    this.setState(s);
    this.calculou = true;
  }

  digitar(digito){
    let s = this.state;
    if(this.calculou && digito != "." && digito != "-"  && digito != "+"  && digito != "*"  && digito != "="  && digito != "/")
      s.resultado = 0;
    else if(this.calculou && (digito == "-" || digito == "."  || digito == "+"  || digito == "*"  || digito == "="  || digito == "/"))
      this.calculou = false;
    if(s.resultado == 0 && (digito == "-" || digito == "+"  || digito == "*"  || digito == "="  || digito == "/")){
      return;
    }

    if(s.resultado.toString() == "0" ){
      if(digito == "."){
        s.resultado = s.resultado.toString() + digito;
      } else{
        s.resultado = digito;
      }
      this.calculou = false;
    }else{
      s.resultado = s.resultado.toString() + digito;
    }
    this.setState(s);
  }

  render(){
    return(
      <View style={styles.body}>
        <View style={styles.resultado_area}>
            <Text style={styles.resultado_texto}>{this.state.resultado}</Text>
        </View>
        <View style={styles.area_button}>
          <Botao c="3" t="C" bg="white" color="red" onPress={this.clear}/>
          <Botao c="1" t="/" bg="white" color="#03a9f4" onPress={()=>{ this.digitar("/")}}/>
        </View>
        <View style={styles.area_button}>
          <Botao c="1" t="7" bg="white" color="darkgray" onPress={()=>{ this.digitar("7")}}/>
          <Botao c="1" t="8" bg="white" color="darkgray" onPress={()=>{ this.digitar("8")}}/>
          <Botao c="1" t="9" bg="white" color="darkgray" onPress={()=>{ this.digitar("9")}}/>
          <Botao c="1" t="*" bg="white" color="#03a9f4" onPress={()=>{ this.digitar("*")}}/>
        </View>
        <View style={styles.area_button}>
          <Botao c="1" t="4" bg="white" color="darkgray" onPress={()=>{ this.digitar("4")}}/>
          <Botao c="1" t="5" bg="white" color="darkgray" onPress={()=>{ this.digitar("5")}}/>
          <Botao c="1" t="6" bg="white" color="darkgray" onPress={()=>{ this.digitar("6")}}/>
          <Botao c="1" t="-" bg="white" color="#03a9f4" onPress={()=>{ this.digitar("-")}}/>
        </View>
        <View style={styles.area_button}>
          <Botao c="1" t="1" bg="white" color="darkgray" onPress={()=>{ this.digitar("1")}} />
          <Botao c="1" t="2"bg="white" color="darkgray" onPress={()=>{ this.digitar("2")}}/>
          <Botao c="1" t="3" bg="white" color="darkgray" onPress={()=>{ this.digitar("3")}}/>
          <Botao c="1" t="+" bg="white" color="#03a9f4" onPress={()=>{ this.digitar("+")}}/>
        </View>
        <View style={styles.area_button}>
          <Botao c="2" t="0" bg="white" color="darkgray" onPress={()=>{ this.digitar("0")}}/>
          <Botao c="1" t="." bg="white" color="darkgray" onPress={()=>{ this.digitar(".")}}/>
          <Botao c="1" t="=" bg="#03a9f4" color="white" onPress={this.calcularResultado}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body:{
    flex:1,
  },
  resultado_area: {
    flex:2,
    width:null,
    alignItems:'flex-end',
    justifyContent:'flex-end',
    backgroundColor: '#e9ebeb',
  },
  resultado_texto:{
    fontSize:40
  },
  area_button:{
    flex:1,
    flexDirection:'row'
  }
});