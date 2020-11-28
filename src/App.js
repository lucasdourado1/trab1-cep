import './App.css';
import React, { useState } from 'react';

function App() {
  const [enderecos, setEnderecos] = useState([]);
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [logradouro, setLogradouro] = useState('');

  async function findAddress(){
    setEnderecos([]);
    let url = `https://viacep.com.br/ws/`;

    if(cep !== ""){
      url += `${cep}/json/`;
    }else{
      url += `${uf}/${cidade}/${logradouro}/json/`;
    }
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        const uri = data;
        console.log(data.length);
        if(data.length < 1 || data.length === undefined){
          uri && setEnderecos([data]);
        }else{
          uri && setEnderecos(data);
        }
      })
      .catch(function (error) {
        alert('Houve um problema ao efetuar a requisição! Por favor, tente novamente.');
      });
    
    setCep("");
  }

  function ListarEnderecos(props){
    const enderecos = props.enderecos
    const lista = enderecos.map((endr) =>
      <tr key={endr.toString()}>
        <td>{endr.bairro}</td>
        <td>{endr.cep}</td>
        <td>{endr.localidade}</td>
        <td>{endr.logradouro}</td>
        <td>{endr.uf}</td>
      </tr>
    );
    return (
      <table>
        <thead>
          <tr>
            <th>Bairro</th>
            <th>CEP</th>
            <th>Localidade</th>
            <th>Logradouro</th>
            <th>UF</th>
          </tr>
        </thead>
        <tbody>
          {lista}
        </tbody>
      </table>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ache qualquer endereço do Brasil!</h1>
        <h2>Escolha uma das opções abaixo para encontrar a localização desejada.</h2>
        <div className="options">
          <div>
            <p>CEP <small>(apenas os números)</small>:</p>
            <input name="cep" type="number" onChange={e => setCep(e.target.value)}></input>
          </div>
          <div>
            <p>UF: </p><input name="uf" type="text" maxLength="2" onChange={e => setUf(e.target.value)}></input>
            <p>Cidade: </p><input name="cidade" type="text" onChange={e => setCidade(e.target.value)}></input>
            <p>Logradouro: </p><input name="logradouro" type="text" onChange={e => setLogradouro(e.target.value)}></input>
          </div>
        </div>
        <button type='button' onClick={findAddress}>Encontrar o endereço!</button>

        {
          enderecos.length > 0 ? <ListarEnderecos enderecos={enderecos} /> : ""
        }

        { enderecos.length > 0 &&
          <button type='button' onClick={() => setEnderecos([])} className="clearButton">
            Limpar Resultados
          </button>
        }
      </header>
    </div>
  );
}

export default App;
