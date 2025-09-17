import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
// import Referencia from "./Referencia"; // descomente quando criar o arquivo

//  Listas de locais
const SALAS_C = [
  { x: 500, y: 230, text: "Sala 101-C" },
  { x: 410, y: 230, text: "Sala 102-C" },
  { x: 330, y: 230, text: "Sala 103-C" },
  { x: 250, y: 230, text: "Sala 104-C" },
  { x: 170, y: 230, text: "Sala 105-C" },
];

const SALAS_D = [
  { x: 940, y: 270, text: "Sala 101-D", width: 60, height: 70 },
  { x: 940, y: 390, text: "Sala 102-D", width: 60, height: 70 },
  { x: 940, y: 470, text: "Sala 103-D", width: 60, height: 70 },
  { x: 940, y: 550, text: "Sala 104-D", width: 60, height: 70 },
  { x: 890, y: 640, text: "Sala 105-D", width: 100, height: 60 },
  { x: 740, y: 470, text: "Sala 106-D", width: 90, height: 50 },
  { x: 740, y: 700, text: "Sala 107-D", width: 90, height: 40 },
  { x: 585, y: 570, text: "Sala 108-D", width: 100, height: 50 },
  { x: 460, y: 610, text: "Sala 109-D", width: 100, height: 50 },
];

const SALAS_E = [
  { x: 1070, y: 320, text: "Sala 101-E", width: 80, height: 40 },
  { x: 1170, y: 325, text: "Sala 102-E", width: 150, height: 40 },
  { x: 1170, y: 410, text: "Sala 103-E" },
  { x: 1280, y: 395, text: "Sala 104-E", width: 50, height: 80 },
  { x: 1200, y: 510, text: "Sala 105-E", width: 30, rotate: 90, scale: 1.2 },
  { x: 1290, y: 530, text: "Sala 106-E", width: 40, height: 60 },
  { x: 1200, y: 560, text: "Sala 107-E", width: 30, rotate: 90, scale: 1.2 },
  { x: 1280, y: 600, text: "Sala 108-E", width: 40 },
  { x: 1200, y: 650, text: "Sala 109-E", width: 70, height: 40 },
  { x: 1120, y: 650, text: "Sala 110-E", width: 70, height: 40 },
];

const ESCADAS = [
  { x: 600, y: 300, text: "Escada 1", width: 80, height: 90 },
  { x: 1190, y: 490, text: "Escada 2", width: 60, height: 30 },
  { x: 800, y: 600, text: "Escada 3", width: 80, height: 80 },
  { x: 740, y: 80, text: "rampa", width: 200, height: 80 },
  { x: 1010, y: 405, text: "terreo", width: 130, height: 200 },
];

const PONTOS_INTERESSE = [
  { x: 920, y: 150, text: "Biblioteca" },
  { x: 1270, y: 520, text: "Banheiro Feminino" },
  { x: 1270, y: 500, text: "Banheiro Masculino" },
];

//  Junta todas as listas em uma só
const TODOS_OS_LOCAIS = [
  ...SALAS_C,
  ...SALAS_D,
  ...SALAS_E,
  ...ESCADAS,
  ...PONTOS_INTERESSE,
];

export default function MapControls() {
  const [selectedMap, setSelectedMap] = useState("1");
  const [scale, setScale] = useState(1);
  const [search, setSearch] = useState("");
  const [showReferencia, setShowReferencia] = useState(false);

  const handleZoomIn = () => setScale(prev => prev + 0.2);
  const handleZoomOut = () => setScale(prev => (prev > 0.4 ? prev - 0.2 : prev));

  // 🔹 Função de busca
  const handleSearch = () => {
    if (!search.trim()) return;

    const resultado = TODOS_OS_LOCAIS.find((local) =>
      local.text.toLowerCase().includes(search.toLowerCase())
    );

    if (resultado) {
      console.log("Local encontrado:", resultado);
      alert(`Local encontrado: ${resultado.text}`); // ✅ Mostra em alerta
      // 👉 aqui você pode centralizar no mapa com resultado.x e resultado.y
    } else {
      console.log("Nenhum local encontrado!");
      alert("Nenhum local encontrado");
    }
  };

  const handleBandeira = () => {
    console.log("Escolher local para marcar com o pin");
    // lógica para marcar pin no mapa
  };

  const handleLupa = () => setShowReferencia(true);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />

      {/* Barra de pesquisa */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Local"
          value={search}
          onChangeText={setSearch}
        />
        
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Controles de Zoom e novos botões */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleZoomIn} style={styles.controlBtn}>
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomOut} style={styles.controlBtn}>
          <Text style={styles.controlText}>-</Text>
        </TouchableOpacity>

        {/* Botão Bandeira */}
        <TouchableOpacity onPress={handleBandeira} style={styles.controlBtn}>
          <Image source={require("../assets/images/bandeira.png")} style={styles.icon} />
        </TouchableOpacity>

        {/* Botão Lupa */}
        <TouchableOpacity onPress={handleLupa} style={styles.controlBtn}>
          <Image source={require("../assets/images/lupa.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Menu de mapas */}
      <View style={styles.menu}>
        {["T", "1", "2", "3", "4"].map(item => (
          <TouchableOpacity key={item} onPress={() => setSelectedMap(item)} style={styles.menuBtn}>
            <Text style={styles.menuText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal Referência */}
      {/* 
      <Modal visible={showReferencia} transparent animationType="slide">
        <Referencia onClose={() => setShowReferencia(false)} />
      </Modal>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    position: "absolute",
    top: 10,
    width: "100%", 
    alignItems: "center",
    zIndex: 999,
  },
  logo: { width: 250, height: 70, marginBottom: 5 },
  searchBar: { flexDirection: "row", alignItems: "center", width: "40%", marginBottom: 5 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", paddingHorizontal: 8, height: 30, borderRadius: 5, fontSize: 14, top: 100, right: 250 },
  searchButton: { marginLeft: 5, backgroundColor: "#a1089aff", padding: 6, borderRadius: 5 },
  controls: { flexDirection: "row", marginVertical: 4 },
  controlBtn: { marginHorizontal: 5, backgroundColor: "#98199cff", borderRadius: 5, padding: 6, top: -10, right: 180, alignItems: "center", justifyContent: "center" },
  controlText: { color: "#fff", fontSize: 16 },
  icon: { width: 20, height: 20 },
  menu: { flexDirection: "row", marginVertical: 5 },
  menuBtn: { marginHorizontal: 3, padding: 6, backgroundColor: "#b81fccff", borderRadius: 5, top: -50, left: 185 },
  menuText: { color: "#fff", fontSize: 14 },
});


