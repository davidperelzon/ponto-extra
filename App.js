import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function App() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [codigo, setCodigo] = useState("");

  const [erroNome, setErroNome] = useState("");
  const [erroPreco, setErroPreco] = useState("");
  const [erroQuantidade, setErroQuantidade] = useState("");
  const [erroCodigo, setErroCodigo] = useState("");

  function validar() {
    let valido = true;

    setErroNome("");
    setErroPreco("");
    setErroQuantidade("");
    setErroCodigo("");

    if (!nome || nome.length < 3) {
      setErroNome("O nome deve ter pelo menos 3 caracteres.");
      valido = false;
    }

    const p = parseFloat(preco);
    if (!preco || isNaN(p) || p <= 0) {
      setErroPreco("O preço deve ser maior que zero.");
      valido = false;
    }

    const q = parseInt(quantidade);
    if (!quantidade || isNaN(q) || q < 0) {
      setErroQuantidade("A quantidade não pode ser negativa.");
      valido = false;
    }

    const regex = /^[A-Za-z]{3}[0-9]{4}$/;
    if (!codigo || !regex.test(codigo)) {
      setErroCodigo("Formato inválido. Use ABC1234.");
      valido = false;
    }

    return valido;
  }

  function salvar() {
    if (!validar()) return;

    Alert.alert("Sucesso", "Produto cadastrado com sucesso!");

    setNome("");
    setPreco("");
    setQuantidade("");
    setCodigo("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Novo Produto</Text>
        <Text style={styles.subtitulo}>
          Preencha os dados do inventário
        </Text>

        {/* NOME */}
        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          placeholder="Ex: Teclado Mecânico"
          value={nome}
          onChangeText={setNome}
          style={erroNome ? styles.inputErro : styles.input}
        />
        {erroNome && <Text style={styles.erro}>{erroNome}</Text>}

        {/* LINHA */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Preço (R$)</Text>
            <TextInput
              placeholder="0.00"
              keyboardType="numeric"
              value={preco}
              onChangeText={setPreco}
              style={erroPreco ? styles.inputErro : styles.input}
            />
            {erroPreco && <Text style={styles.erro}>{erroPreco}</Text>}
          </View>

          <View style={{ width: 10 }} />

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Estoque</Text>
            <TextInput
              placeholder="0"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
              style={erroQuantidade ? styles.inputErro : styles.input}
            />
            {erroQuantidade && (
              <Text style={styles.erro}>{erroQuantidade}</Text>
            )}
          </View>
        </View>

        {/* CODIGO */}
        <Text style={styles.label}>Código Identificador</Text>
        <TextInput
          placeholder="ABC1234"
          value={codigo}
          onChangeText={setCodigo}
          style={erroCodigo ? styles.inputErro : styles.input}
        />
        {erroCodigo && <Text style={styles.erro}>{erroCodigo}</Text>}

        {/* BOTÃO */}
        <TouchableOpacity style={styles.botao} onPress={salvar}>
          <Text style={styles.botaoTexto}>Gravar Produto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e7eb", // fundo cinza igual imagem
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 20,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitulo: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
    color: "#374151",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
  },

  inputErro: {
    borderWidth: 1,
    borderColor: "#ef4444",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
  },

  erro: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    marginTop: 5,
  },

  botao: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
